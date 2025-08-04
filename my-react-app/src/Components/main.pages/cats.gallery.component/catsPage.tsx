import React from 'react'
import './catsPage.css'
import type { Cat } from '../../../serviceApi/getCats.service'

interface CatsPageProps {
    cats: Cat[]
}

function catsPage(props: CatsPageProps) {
    const { cats } = props

    return (
        <div className='cats-page-container'>
            <div className='cats-page-gallery'>
                {cats.map((cat) => (
                    <div className='cats-page-gallery-item' key={cat.id}>
                        <img src={cat.url} alt='cat' />
                    </div>
                ))}
            </div>
        </div>
  )
}

export default catsPage