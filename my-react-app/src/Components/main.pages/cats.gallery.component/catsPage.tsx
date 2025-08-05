import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './catsPage.css'
import getCats, { type Cat } from '../../../serviceApi/getCats.service'
import Pagination from '../../pagination.component/pagination'
import Download from '../../downLoading.component/download'
import LikeButton from '../../likeButton.component/likeButton'

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
    }, [])

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
                { isLoading ? <Download /> : (
                    <div className='cats-page-gallery'>
                        {cats.map((cat) => (
                            <div className='cats-page-gallery-item' key={cat.id}>
                                <img src={cat.url} alt='cat' />
                                <LikeButton isActive={cat.isFavorite} onClickFunction={() => handleFavoriteClick(cat)} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isFavoritesPage ? null : <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    )
}

export default CatsPage