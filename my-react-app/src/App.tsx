import './App.css'
import TabsControll from './Components/tabs.controll.component/tabsControll'
import AllCatsPage from './Components/main.pages/all.cats.page.component/allCatsPage'
import FavCatsPage from './Components/main.pages/favourite.cats.page.component/favCatsPage'
import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('allCats')
  
  return (
    <div className='app-container'>
      <TabsControll activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'allCats' && <AllCatsPage />}
      {activeTab === 'favoriteCats' && <FavCatsPage />}
    </div>
  )
}

export default App
