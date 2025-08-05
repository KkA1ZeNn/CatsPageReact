import { ApiCache } from './queryCacheApi'
export interface Cat {
    id: string
    url: string
    width: number
    height: number
    isFavorite: boolean
}

interface ApiCat {
    id: string
    url: string
    width: number
    height: number
}

const apiCache = new ApiCache()

const getCats = async (page: number) => {
    try {
        const data = await apiCache.get<ApiCat[]>('https://api.thecatapi.com/v1/images/search', {
            limit: 10,
            page
        })
        return data.map((cat: ApiCat) => ({ ...cat, isFavorite: false }))
    } catch (error) {
        console.error('Error fetching cats:', error)
        return []
    }
}

export default getCats