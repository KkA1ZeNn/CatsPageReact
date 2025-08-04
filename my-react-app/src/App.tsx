import './App.css'
import TabsControll from './Components/tabs.controll.component/tabsControll'
import CatsPage from './Components/main.pages/cats.gallery.component/catsPage'
import { useState, useEffect } from 'react'
import getCats, { type Cat } from './serviceApi/getCats.service'

function App() {
  const [activeTab, setActiveTab] = useState('allCats')
  const [cats, setCats] = useState<Cat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCats().then((cats) => {
      setCats(cats)
      setIsLoading(false)
    })
  }, [])
  
  return (
    <div className='app-container'>
      <TabsControll activeTab={activeTab} setActiveTab={setActiveTab} />
      {isLoading ? <div>Loading...</div> : <CatsPage cats={cats} />}
    </div>
  )
}

export default App
