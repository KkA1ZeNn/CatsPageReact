import React from 'react'
import './pagination.css'

interface PaginationProps {
  currentPage: number
  setCurrentPage: (page: number) => void
}

function pagination(props: PaginationProps) {
  const { currentPage, setCurrentPage } = props

  return (
    <div className='pagination-container'>
      <button className={`pagination-button ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
      <button className={`pagination-button ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
      <button className={`pagination-button ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
      <button className={`pagination-button ${currentPage === 4 ? 'active' : ''}`} onClick={() => setCurrentPage(4)}>4</button>
      <button className={`pagination-button ${currentPage === 5 ? 'active' : ''}`} onClick={() => setCurrentPage(5)}>5</button>
    </div>
  )
}

export default pagination