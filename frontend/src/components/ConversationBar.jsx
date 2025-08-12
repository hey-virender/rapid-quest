import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";


const conversations = [
  {
_id:"6899ba2a7607fe8d09813d8c",
conversationId:"918329446654-919937320320",
createdAt:"2025-08-11T09:40:22.598+00:00",
lastMessage:{
  _id:"6899ba86f6c27f2762122f84",
  text:"Hello",
  sender:"user1",
  createdAt:"2025-08-11T09:40:22.598+00:00"
},
participants:["user1","user2"],
unreadCount:2,
updatedAt:"2025-08-11T09:40:22.824+00:00"
  },{
_id:"6899ba2a7607fe8d09813d8d",
conversationId:"918329446654-929967673820",
createdAt:"2025-08-11T09:40:23.036+00:00",
lastMessage:{
  _id:"6899ba87f6c27f2762122f96",
  text:"Hi",
  sender:"user2",
  createdAt:"2025-08-11T09:40:23.036+00:00"
},
participants:["user1","user2"],
unreadCount:1,
updatedAt:"2025-08-11T09:40:23.338+00:00"
  }
]
const chatFilters = [
  {
    label:"All",
    link:"#"
  }
  ,
  {
    label:"Unread",
    link:"#"
  }
]

const ConversationBar = () => {
  return (
    <section className="bg-[#111b21] min-w-xs max-w-sm">
      <div className='relative text-gray-400 bg-gray-600 m-2 px-2 rounded-full'>
        <input type="search" placeholder="Search" className='placeholder:text-gray-500 placeholder:text-xs focus:outline-none focus:border-none p-1' />
        <FaMagnifyingGlass className='absolute right-4 top-1/2 -translate-y-1/2'/>
      </div>

    <div className='flex text-gray-300 text-xs gap-2 my-3 px-4'>
      {chatFilters.map((btn,index)=>(
        <button key={index} className="bg-gray-600 px-2 rounded-lg">
          {btn.label}

        </button>
      ))}

    </div>
     <div className="flex flex-col gap-3 p-4">
       {conversations.map((conversation) => (
        <div className='relative flex items-center gap-5 py-1'>
          <div>
            <img className='size-14 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
          </div>
          <div className='text-white'>
            <h1 className='text-xl font-semibold'>{conversation.participants[0]}</h1>
            <p className={`${conversation.unreadCount > 0 && "font-bold"}`}>{conversation.lastMessage.text}</p>
          </div>
          {conversation.unreadCount > 0 && (
            <div className='absolute -right-2 bottom-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white'>
              {conversation.unreadCount}
            </div>
          )}
        </div>
      ))}
     </div>

    </section>
  )
}

export default ConversationBar
