
import { FaMagnifyingGlass } from "react-icons/fa6";
import useStore from "../store/store";



const ConversationBar = () => {
  const {conversations,setCurrentConversation} = useStore()
  const handleConversationClick = (conversationId) => {
    setCurrentConversation(conversationId)
    
  };
  return (
    <section className="bg-[#111b21] min-w-[320px] max-w-sm border-r border-[#2a2f32] flex flex-col">
      {/* Search */}
      <div className="relative m-3">
        <input
          type="search"
          placeholder="Search or start new chat"
          className="w-full bg-[#202c33] text-sm text-white pl-10 pr-4 py-2 rounded-full placeholder:text-gray-400 focus:outline-none"
        />
        <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((c) => (
          <button key={c._id} className="w-full max-w-full" onClick={()=>handleConversationClick(c._id)}>
          <div
            
            className="flex items-center gap-4 px-4 py-3 hover:bg-[#2a3942] cursor-pointer relative w-full"
          >
            <img
              className="size-12 rounded-full object-cover"
              src="https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              alt=""
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-white font-medium truncate">{c.display_phone_number}</h1>
                <span className="text-xs text-gray-400 shrink-0 ml-2">{new Date(c.latestMessageTime).toLocaleTimeString()}</span>
              </div>
              <p className={`truncate text-sm w-full text-left pr-7 ${c.unreadCount > 0 ? 'text-white font-medium' : 'text-gray-400 '}`}>
                {c.lastMessage.text}
              </p>
            </div>
            {c.unreadCount > 0 && (
              <span className="absolute right-4 top-1/2  bg-green-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {c.unreadCount}
              </span>
            )}
          </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ConversationBar;
