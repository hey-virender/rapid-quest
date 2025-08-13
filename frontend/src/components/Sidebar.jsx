
import React from 'react';
import { IoChatboxEllipsesOutline, IoChatboxEllipses } from "react-icons/io5";
import { PiCircleDashedLight, PiCircleDashedBold } from "react-icons/pi";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";

const buttons = [
  { index: 0, icons: [<IoChatboxEllipses />, <IoChatboxEllipsesOutline />], label: "chats" },
  { index: 1, icons: [<PiCircleDashedBold />, <PiCircleDashedLight />], label: "status" },
  { index: 2, icons: [<BsPeopleFill />, <BsPeople />], label: "calls" }
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <nav className="bg-[#202c33] flex flex-col justify-between w-20 h-screen py-4 px-3 border-r border-[#2a2f32]">
      <div className="flex flex-col items-center text-white text-2xl gap-5">
        {buttons.map((btn) => (
          <button
            key={btn.index}
            className={`flex items-center justify-center size-12 rounded-full transition-colors 
              ${activeIndex === btn.index ? 'bg-[#2a3942] text-green-400' : 'text-gray-300 hover:bg-[#2a3942]'}`}
            onClick={() => setActiveIndex(btn.index)}
          >
            {activeIndex === btn.index ? btn.icons[0] : btn.icons[1]}
          </button>
        ))}
        <img
          className="size-8"
          src="https://static.whatsapp.net/rsrc.php/v4/ye/r/W2MDyeo0zkf.png"
          draggable="false"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          className={`text-3xl size-12 flex items-center justify-center rounded-full 
            ${activeIndex === 3 ? 'bg-[#2a3942] text-green-400' : 'text-gray-300 hover:bg-[#2a3942]'}`}
          onClick={() => setActiveIndex(3)}
        >
          {activeIndex === 3 ? <IoSettingsSharp /> : <IoSettingsOutline />}
        </button>
        <img
          className="rounded-full size-10 object-cover"
          alt="avatar"
          draggable="false"
          src="https://media-del1-2.cdn.whatsapp.net/v/t61.24694-24/485495785_3977999872519702_3267949959528831773_n.jpg?stp=dst-jpg_s96x96_tt6&amp;ccb=11-4&amp;oh=01_Q5Aa2QFo4BiuKcpo-nWMqJQgbf7UEPbJ8UKHFrfy6wG_E96BUw&amp;oe=68A6B93F&amp;_nc_sid=5e03e0&amp;_nc_cat=104"
        />
      </div>
    </nav>
  );
};

export default Sidebar;
