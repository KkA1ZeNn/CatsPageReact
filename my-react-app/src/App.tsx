import './App.css'
import TabsControll from './Components/tabs.controll.component/tabsControll'
import CatsPage from './Components/main.pages/cats.gallery.component/catsPage'
import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('allCats')
  
  return (
    <div className='app-container'>
      <TabsControll activeTab={activeTab} setActiveTab={setActiveTab} />
      <CatsPage />
    </div>
  )
}

export default App
