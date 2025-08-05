import React from 'react'
import './likeButton.css'
import like from '../../assets/favorite_border.svg'
import likeActive from '../../assets/favorite.svg'

function LikeButton({ isActive, onClickFunction }: { isActive: boolean, onClickFunction: () => void }) {
  return (
    <div className='like-button-container' onClick={onClickFunction}>
        <img src={isActive ? likeActive : like} alt="like" />
    </div>
  )
}

export default LikeButton
