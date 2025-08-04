import React from 'react'
import './tabsControll.css'

interface TabsControllProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

function tabsControll(props: TabsControllProps) {
    const { activeTab, setActiveTab } = props

    return (
        <div className='tabs-wrapper'>
            <div className='tabs-container'>
                <div className={`tab-item ${activeTab === 'allCats' ? 'active' : ''}`} onClick={() => setActiveTab('allCats')}>Все котики</div>
                <div className={`tab-item ${activeTab === 'favoriteCats' ? 'active' : ''}`} onClick={() => setActiveTab('favoriteCats')}>Любимые котики</div>
            </div>
            
        </div>
    )
}

export default tabsControll