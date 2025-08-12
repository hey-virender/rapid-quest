import React from 'react'
import { IoChatboxEllipses } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiCircleDashedLight } from "react-icons/pi";
import { PiCircleDashedBold } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

const buttons = [
  {
    index:0,
    icons:[<IoChatboxEllipses />, <IoChatboxEllipsesOutline />],
    label:"chats"
  },
  {
    index:1,
    icons:[<PiCircleDashedBold />, <PiCircleDashedLight />],
    label:"status"
  },
  {
    index:2,
    icons:[<BsPeopleFill />, <BsPeople />],
    label:"calls"
  }
  ,
  {
    index:3,
    icons:[<IoSettingsSharp />, <IoSettingsOutline />],
    label:"settings"
  }
]


const Sidebar = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
  }
  return (
    <nav className='bg-[#202c33] flex flex-col justify-between w-20 h-screen py-8 px-4'>
      <div className="flex flex-col items-center text-white text-2xl gap-6">
        {buttons.filter((button) => button.index !== 3).map((button) => (
          <button
            key={button.index}
            className={`flex flex-col items-center ${activeIndex === button.index ? 'rounded-full bg-gray-600 text-gray-400 p-2' : 'text-gray-300'}`}
            onClick={() => handleClick(button.index)}
          >
            {activeIndex === button.index ? button.icons[0] : button.icons[1]}
           
          </button>
        ))}
        <div><img className='size-8' draggable="false" src="https://static.whatsapp.net/rsrc.php/v4/ye/r/W2MDyeo0zkf.png" /></div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div>
          <button
            key={buttons[3].index}
            className={` text-3xl ${activeIndex === buttons[3].index ? 'rounded-full bg-gray-600 text-gray-400 p-2' : 'text-gray-300'}`}
            onClick={() => handleClick(buttons[3].index)}
          >
            {activeIndex === buttons[3].index ? buttons[3].icons[0] : buttons[3].icons[1]}
          </button>
        </div>
        <div><img className="rounded-full size-10" alt="avatar" draggable="false"  src="https://media-del1-2.cdn.whatsapp.net/v/t61.24694-24/485495785_3977999872519702_3267949959528831773_n.jpg?stp=dst-jpg_s96x96_tt6&amp;ccb=11-4&amp;oh=01_Q5Aa2QFo4BiuKcpo-nWMqJQgbf7UEPbJ8UKHFrfy6wG_E96BUw&amp;oe=68A6B93F&amp;_nc_sid=5e03e0&amp;_nc_cat=104" /></div>
      </div>
    </nav>
  )
}

export default Sidebar