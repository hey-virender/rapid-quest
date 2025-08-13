import ProcessedMessages from "../models/ProcessedMessage.js";

export const getAllChats = async (req, res) => {
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
            createdAt: "$createdAt",
            updatedAt:"$updatedAt"
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
      // add a field for the other participant's number
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

  res.status(200).json(chats);
};
