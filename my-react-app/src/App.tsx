import './App.css'
import TabsControl from './Components/tabs.controll.component/tabsControll'
import CatsPage from './Components/main.pages/cats.gallery.component/catsPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <TabsControl />
        <Routes>
          <Route path="/allcats" element={<CatsPage />} />
          <Route path="/favorites" element={<CatsPage />} />
          <Route path="/" element={<Navigate to="/allcats" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
