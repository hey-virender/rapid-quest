
const DefaultBanner = () => {
  return (
    <div className="bg-[#222e35] flex flex-col items-center justify-center w-full h-screen border-l border-[#2a2f32]">
      <img src="/whatsapp.png" alt="whatsapp" className="size-40 mb-4" />
      <h1 className="text-white text-3xl font-light">WhatsApp Web</h1>
      <p className="text-gray-400 text-sm mt-2 text-center max-w-md">
        Send and receive messages without keeping your phone online.  
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>
    </div>
  );
};

export default DefaultBanner;
