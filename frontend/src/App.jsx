
import ConversationBar from './components/ConversationBar'
import DefaultBanner from './components/DefaultBanner'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <main className='flex'>
      <Sidebar/>
      <ConversationBar/>
      <DefaultBanner/>
    </main>
  )
}

export default App