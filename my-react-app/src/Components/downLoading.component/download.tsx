import React from 'react'
import './download.css'
import loading from '../../assets/downloading.svg'

function Download() {
  return (
    <div className='download-container'><img src={loading} alt="loading" /></div>
  )
}

export default Download