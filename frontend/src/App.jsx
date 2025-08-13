
import DefaultBanner from './components/DefaultBanner'
import ConversationBar from './components/ConversationBar'
import Sidebar from './components/Sidebar'
import WhatsAppChat from './components/WhatsappChat'
import useAxios from './hooks/useAxios'
import { useEffect } from 'react'
import useStore from './store/store'


const App = () => {
  const axios = useAxios();
  const {setConversations,currentConversation} = useStore()
  
  useEffect(() => {
    let isMounted = true;
    const fetchChats = async () => {
      const data = await axios.request({ url: `/chats/${import.meta.env.VITE_PUBLIC_PHONE}` });
      console.log(data);
      setConversations(data);
    };
    fetchChats();
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <main className='flex'>
      <Sidebar/>
      <ConversationBar/>
      {currentConversation ? <WhatsAppChat/>:<DefaultBanner/>}
    </main>
  )
}

export default App