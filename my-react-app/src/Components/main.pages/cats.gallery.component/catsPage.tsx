import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './catsPage.css'
import getCats, { type Cat } from '../../../serviceApi/getCats.service'
import Pagination from '../../pagination.component/pagination'

function CatsPage() {
    const [cats, setCats] = useState<Cat[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation()
    
    // Определяем тип страницы по маршруту
    const isFavoritesPage = location.pathname === '/favorites'

    // Сбрасываем страницу при смене маршрута
    useEffect(() => {
        setCurrentPage(1)
    }, [location.pathname])

    useEffect(() => {
        console.log('useEffect_')
        setIsLoading(true)
        
        if (isFavoritesPage) {
            // Здесь будет загрузка избранных котов
            setTimeout(() => {
                setCats([]) 
                setIsLoading(false)
            }, 600)
        } else {
            // Загружаем всех котов
            setTimeout(() => {
                getCats(currentPage - 1).then((cats) => {
                    setCats(cats)
                    setIsLoading(false)
                })
            }, 600)
        }
    }, [currentPage, isFavoritesPage])

    return (
        <div className='cats-page-container'>
            <div className='cats-page-gallery-container'>
                { isLoading ? <div className='cats-page-loading'>Loading...</div> : (
                    <div className='cats-page-gallery'>
                        {cats.map((cat) => (
                            <div className='cats-page-gallery-item' key={cat.id}>
                                <img src={cat.url} alt='cat' />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isLoading ? null : <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    )
}

export default CatsPage