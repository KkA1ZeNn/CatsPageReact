import React from 'react'
import './catsPage.css'

interface CatsPageProps {
    activeTab: string
}

function catsPage(props: CatsPageProps) {
    const { activeTab } = props

    return (
        <div className='cats-page-container'>
            <div className='cats-page-gallery'>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
                <div className='cats-page-gallery-item'>
                    <img src='https://placehold.co/225x225' alt='cat' />
                </div>
            </div>
        </div>
  )
}

export default catsPage