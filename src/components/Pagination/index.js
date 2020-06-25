import React from "react";
import './index.scss';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) =>{
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
    pageNumber.push(i);
  }
  return(
    <div className="pagination-container">
      {pageNumber.map(number => (
        <div className={`pagination-item ${currentPage === number ? 'active' : ''}`} key={number} onClick={()=>paginate(number)}>
          <p>{number}</p>
        </div>
      ))}
    </div>
  )
}


export default Pagination