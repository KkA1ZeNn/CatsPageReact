import { useState, useEffect } from 'react'
import './catsPage.css'
import getCats, { type Cat } from '../../../serviceApi/getCats.service'
import Pagination from '../../pagination.component/pagination'

function CatsPage() {
    const [cats, setCats] = useState<Cat[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        getCats(0).then((cats) => {
            // Искусственная задержка для тестирования
            setTimeout(() => {
                setCats(cats)
                setIsLoading(false)
            }, 1500)
        })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getCats(currentPage - 1).then((cats) => {
            setCats(cats)
            setIsLoading(false)
        })
    }, [currentPage])

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