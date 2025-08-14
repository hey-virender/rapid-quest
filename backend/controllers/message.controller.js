import ProcessedMessages from "../models/ProcessedMessage.js";

export const getAllChats = async (req, res) => {
  try {
    const { user } = req.params;

    const chats = await ProcessedMessages.aggregate([
      {
        $match: {
          participants: user
        }
      },
      {
        $sort: { createdAt: 1 }
      },
      {
        $group: {
          _id: "$conversation_id",
          participants: { $first: "$participants" },
          lastMessage: {
            $last: {
              text: "$text",
              sender: "$sender",
              createdAt: "$createdAt"
            }
          },
          messages: {
            $push: {
              _id: "$_id",
              text: "$text",
              sender: "$sender",
              type: "$type",
              status: "$status",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt"
            }
          },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$sender", user] },
                    { $in: ["$status", ["sent", "delivered"]] }
                  ]
                },
                1,
                0
              ]
            }
          },
          latestMessageTime: { $last: "$createdAt" }
        }
      },
      {
        $addFields: {
          display_phone_number: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$participants",
                  cond: { $ne: ["$$this", user] }
                }
              },
              0
            ]
          }
        }
      },
      {
        $sort: { latestMessageTime: -1 }
      }
    ]);

    // Collect all unread message IDs (from other users) for status update
    const unreadMessageIds = chats.flatMap(chat =>
      chat.messages
        .filter(msg => msg.sender !== user && ["sent", "delivered"].includes(msg.status))
        .map(msg => msg._id)
    );

    // Bulk update statuses in one go
    if (unreadMessageIds.length > 0) {
      await ProcessedMessages.updateMany(
        { _id: { $in: unreadMessageIds } },
        { $set: { status: "read" } }
      );
    }

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
