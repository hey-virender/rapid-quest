import { Send } from "lucide-react";
import { MdEmojiEmotions } from "react-icons/md";
import useStore from "../store/store";
import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

const WhatsAppChat = () => {
  const [text,setText] = useState()
  const {socket} = useSocket()
  const {currentConversation,updateMessage} = useStore()
  const {messages,display_phone_number} = currentConversation
  const me = import.meta.env.VITE_PUBLIC_PHONE
  //Finds the lastest message where sender is not me and get the created time of that to show last seen
  const lastSeen = (() => {
    const lastMsg = messages.findLast(msg => msg.sender !== me);
    return lastMsg ? new Date(lastMsg.updatedAt).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
}) : null;
  })();
  console.log(lastSeen)

  const handleNewMessage = ()=>{
    const newMessage ={
      sender:me,
      type:"text",
      text,
      conversationId:currentConversation._id
      
    }
    socket.emit("sendMessage",newMessage)
    updateMessage({sender:me,type:"text",text,createdAt: Date.now(),updatedAt: Date.now(),_id: Math.random()*10000},currentConversation._id)

    setText("")
    

  }

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
            className={`flex mb-3 ${
              msg.sender === me ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                msg.sender === "me"
                  ? "bg-[#001d21] text-white rounded-br-none"
                  : "bg-[#1f2c33] text-gray-300 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-200 block text-right">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 m-3  rounded-full relative">
        <MdEmojiEmotions className=" absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={24} />
        <input
          type="text"
          value={text}
          placeholder="Type a message"
          onChange={(e)=>setText(e.target.value)}
          className="flex-1 px-4 py-2 pl-10 rounded-full outline-none bg-[#1f2c33]  focus:border-green-500 text-gray-300 placeholder:text-gray-300"
        />
        <button onClick={handleNewMessage} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChat;
