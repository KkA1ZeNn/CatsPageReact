import { useNavigate, useLocation } from 'react-router-dom'
import './tabsControll.css'

function TabsControl() {
    const navigate = useNavigate()
    const location = useLocation()

    // Определяем активную вкладку по текущему пути
    const isAllCatsActive = location.pathname === '/allcats'
    const isFavoritesActive = location.pathname === '/favorites'

    return (
        <div className='tabs-wrapper'>
            <div className='tabs-container'>
                <div 
                    className={`tab-item ${isAllCatsActive ? 'active' : ''}`} 
                    onClick={() => navigate('/allcats')}
                >
                    Все котики
                </div>
                <div 
                    className={`tab-item ${isFavoritesActive ? 'active' : ''}`} 
                    onClick={() => navigate('/favorites')}
                >
                    Любимые котики
                </div>
            </div>
            
        </div>
    )
}

export default TabsControl