import React from 'react'
import './catsPage.css'

interface CatsPageProps {
    activeTab: string
}

function catsPage(props: CatsPageProps) {
    const { activeTab } = props

    return (
        <div className='cats-page-container'>
            <div className='cats-page-header'>
                {activeTab === 'allCats' && <div className='cats-page-header-title'>Все котики</div>}
                {activeTab === 'favoriteCats' && <div className='cats-page-header-title'>Любимые котики</div>}
            </div>
        </div>
  )
}

export default catsPage