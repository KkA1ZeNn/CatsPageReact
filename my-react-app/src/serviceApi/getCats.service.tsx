import axios from 'axios'

export interface Cat {
    id: string
    url: string
    width: number
    height: number
    isFavorite: boolean
}

const getCats = async (page: number) => {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`)
        const catsWithFavorites = response.data.map((cat: Cat) => ({
            ...cat,
            isFavorite: false
        }))
        return catsWithFavorites as Cat[]
    } catch (error) {
        console.error('Error fetching cats:', error)
        return []
    }
}

export default getCats