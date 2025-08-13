import mongoose from "mongoose";

// Message schema — one document = one message
const ProcessedMessageSchema = new mongoose.Schema(
  {
    // Array of participants (sorted to ensure unique conversation IDs)
    participants: {
      type: [String], // wa_id of both sender and receiver
      required: true,
      index: true,
    },

    // WhatsApp message ID
    message_id: { type: String, required: true, index: true, unique: true },

    // Sender wa_id
    sender: { type: String, required: true, index: true },

    // Message type: text, image, video, document, etc.
    type: { type: String, required: true },

    // Text body (if type = "text")
    text: { type: String },

    // Image data (if type = "image")
    image: {
      link: String,
      caption: String,
    },

    // Video data (if type = "video")
    video: {
      link: String,
      caption: String,
    },

    // Document data (if type = "document")
    document: {
      link: String,
      filename: String,
    },

    // Status: sent, delivered, read
    status: { type: String, default: "sent", index: true },

    // Conversation ID (deterministic: participants sorted & joined)
    conversation_id: { type: String, index: true },

    // Timestamp from WhatsApp
    timestamp: { type: Date, required: true, index: true },

    // Optional metadata from webhook
    metadata: {
      display_phone_number: String,
      phone_number_id: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook to auto-generate conversation_id
ProcessedMessageSchema.pre("save", function (next) {
  if (!this.conversation_id && this.participants?.length) {
    this.conversation_id = [...this.participants].sort().join("_");
  }
  next();
});

export default mongoose.model("ProcessedMessage", ProcessedMessageSchema);
