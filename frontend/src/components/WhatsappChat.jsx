import { IoMdSend, IoMdMic } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import useStore from "../store/store";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { BsCheck2 } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
import { formatTime } from "../lib/utils";

const WhatsAppChat = () => {
  const [text, setText] = useState();
  const { socket } = useSocket();
  const { currentConversation, updateMessage } = useStore();
  const { messages, display_phone_number } = currentConversation;
  const me = import.meta.env.VITE_PUBLIC_PHONE;
  //Finds the lastest message where sender is not me and get the created time of that to show last seen
  const lastSeen = (() => {
    const lastMsg = messages.findLast((msg) => msg.sender !== me);
    return lastMsg ? formatTime(lastMsg.updatedAt) : null;
  })();

  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const handleNewMessage = () => {
    const newMessage = {
      sender: me,
      type: "text",
      text,
      conversationId: currentConversation._id,
    };
    socket.emit("sendMessage", newMessage);
    updateMessage(
      {
        sender: me,
        type: "text",
        text,
        status:"sent",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        _id: Math.random() * 10000,
      },
      currentConversation._id,
    );

    setText("");
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-[#0b181c] shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#1f2c33] text-white rounded-t-lg">
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="Profile"
          className="size-9 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{display_phone_number}</h2>
          <p className="text-sm">{lastSeen}</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 ">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`relative flex mb-10 ${
              msg.sender === me ? "justify-end" : "justify-start"
            }`}
          >
            <div
              class={` absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent ${
                msg.sender === me
                  ? "right-0 border-l-[10px] border-l-blue-500"
                  : " left-0 border-r-[10px] border-r-gray-300"
              }`}
            ></div>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                msg.sender === "me"
                  ? "bg-[#001d21] text-white rounded-br-none"
                  : "bg-[#1f2c33] text-gray-300 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-200 block text-right">
                {formatTime(msg.createdAt)}
                {msg.sender == me &&
                  (msg.status == "sent" ? (
                    <BsCheck2 className="inline-block ml-1" size={16} />
                  ) : (
                    <BsCheck2All
                      className={`inline-block ml-1 ${
                        msg.status == "read" && "text-blue-500"
                      }`}
                      size={16}
                    />
                  ))}
              </span>
            </div>
          </div>
        ))}
        {/* Dummy div for scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 m-3  rounded-full relative">
        <MdEmojiEmotions
          className=" absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          size={24}
        />
        <input
          type="text"
          value={text}
          placeholder="Type a message"
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 pl-10 rounded-full outline-none bg-[#1f2c33]  focus:border-green-500 text-gray-300 placeholder:text-gray-300"
        />

        {text ? (
          <button
            onClick={handleNewMessage}
            className="flex justify-center items-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            <IoMdSend size={20} />
          </button>
        ) : (
          <IoMdMic
            className="absolute text-gray-400 top-1/2 -translate-y-1/2 right-2"
            size={23}
          />
        )}
      </div>
    </div>
  );
};

export default WhatsAppChat;
