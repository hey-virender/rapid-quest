import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import ProcessedMessage from "../models/processed_message.js";
import connectDB from "../config/connectDB.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getConversationId(userNumber, businessNumber) {
  return [userNumber, businessNumber].sort().join("-");
}

async function processPayload(payload) {
  try {
    if (!payload?.metaData?.entry) return;

    for (const entry of payload.metaData.entry) {
      for (const change of entry.changes) {
        const value = change.value;

        // Handle incoming/outgoing messages
        if (value?.messages) {
          for (const msg of value.messages) {
            const senderNumber = msg.from;
            const businessNumber = value.metadata.display_phone_number;
            const direction = senderNumber === businessNumber ? "outbound" : "inbound";
            const isOutbound = direction === "outbound";

            const participants = [
              senderNumber,
              isOutbound ? value.contacts[0].wa_id : businessNumber,
            ];
              console.log("text data",msg.text?.body);
            const doc = {
              participants,
              message_id: msg.id,
              sender: senderNumber,
              type: msg.type,
              text: msg.text?.body,
              image: msg.image ? { link: msg.image.link, caption: msg.image.caption } : undefined,
              status: "sent",
              conversation_id: getConversationId(
                senderNumber,
                isOutbound ? value.contacts[0].wa_id : businessNumber
              ),
              timestamp: new Date(parseInt(msg.timestamp) * 1000),
              metadata: {
                businessPhoneId: value.metadata.phone_number_id,
                display_phone_number: value.metadata.display_phone_number,
              },
            };

            // Insert only if message not already processed
            const exists = await ProcessedMessage.findOne({ message_id: msg.id });
            if (!exists) {
              await ProcessedMessage.create(doc);
              console.log(`Created new ProcessedMessage: ${msg.id}`);
            }
          }
        }

        // Handle status updates
        if (value?.statuses) {
          for (const st of value.statuses) {
            const updated = await ProcessedMessage.findOneAndUpdate(
              { message_id: st.id || st.meta_msg_id },
              {
                status: st.status,
                updatedAt: new Date(),
              },
              { new: true }
            );

            if (updated) {
              console.log(
                `Updated ProcessedMessage status: ${st.id || st.meta_msg_id} to ${st.status}`
              );
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing payload:", error);
  }
}

(async () => {
  try {
    await connectDB();
    const payloadPath = path.join(__dirname, "../constants/payloads");
    const files = fs.readdirSync(payloadPath).filter((file) => file.endsWith(".json"));

    for (const file of files) {
      const json = JSON.parse(fs.readFileSync(path.join(payloadPath, file), "utf-8"));
      await processPayload(json);
    }

    console.log("All payloads processed successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error processing payloads:", error);
  }
})();
