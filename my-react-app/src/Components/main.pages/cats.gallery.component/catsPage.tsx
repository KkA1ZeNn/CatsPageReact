import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './catsPage.css'
import getCats, { type Cat } from '../../../serviceApi/getCats.service'
import Pagination from '../../pagination.component/pagination'

function CatsPage() {
    const [cats, setCats] = useState<Cat[]>([])
    const [favoritesCats, setFavoritesCats] = useState<Cat[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation()
    const isFavoritesPage = location.pathname === '/favorites'
    const favoritesCatsRef = useRef<Cat[]>([])
    
    useEffect(() => {
        favoritesCatsRef.current = favoritesCats
    }, [favoritesCats])

    const saveFavoritesToLocalStorage = (favorites: Cat[]) => {
        try {
            localStorage.setItem('favoriteCats', JSON.stringify(favorites))
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error)
        }
    }

    const loadFavoritesFromLocalStorage = (): Cat[] => {
        try {
            const saved = localStorage.getItem('favoriteCats')
            return saved ? JSON.parse(saved) : []
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error)
            return []
        }
    }

    useEffect(() => {
        const savedFavorites = loadFavoritesFromLocalStorage()
        setFavoritesCats(savedFavorites)
    }, []) // Только загружаем из localStorage, отображением занимается другой useEffect 

    useEffect(() => {
        setCurrentPage(1)
    }, [location.pathname])

    const handleFavoriteClick = (cat: Cat) => {
        let updatedFavorites: Cat[]
        
        if (!cat.isFavorite) {
            const updatedCat = { ...cat, isFavorite: true }
            updatedFavorites = [...favoritesCats, updatedCat]
            setFavoritesCats(updatedFavorites)        
            setCats(cats.map(c => c.id === cat.id ? updatedCat : c))
        } else {
            updatedFavorites = favoritesCats.filter((c) => c.id !== cat.id)
            setFavoritesCats(updatedFavorites)
            setCats(cats.map(c => c.id === cat.id ? { ...c, isFavorite: false } : c))
        }
        
        saveFavoritesToLocalStorage(updatedFavorites)
    }

    useEffect(() => {
        if (!isFavoritesPage) {
            setIsLoading(true)
            setTimeout(() => {
                getCats(currentPage - 1).then((newCats) => {
                    const favoriteIds = favoritesCatsRef.current.map(fav => fav.id)
                    const syncedCats = newCats.map(cat => ({
                        ...cat,
                        isFavorite: favoriteIds.includes(cat.id)
                    }))
                    setCats(syncedCats)
                    setIsLoading(false)
                })
            }, 600)
        }
    }, [currentPage, isFavoritesPage]) 

    useEffect(() => {
        if (isFavoritesPage) {
            setCats(favoritesCats)
        }
    }, [isFavoritesPage, favoritesCats])

    return (
        <div className='cats-page-container'>
            <div className='cats-page-gallery-container'>
                { isLoading ? <div className='cats-page-loading'>Loading...</div> : (
                    <div className='cats-page-gallery'>
                        {cats.map((cat) => (
                            <div className={`cats-page-gallery-item ${cat.isFavorite ? 'cats-page-gallery-item-favorite' : ''}`} key={cat.id} onClick={() => handleFavoriteClick(cat)}>
                                <img src={cat.url} alt='cat' />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isLoading || isFavoritesPage ? null : <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    )
}

export default CatsPage