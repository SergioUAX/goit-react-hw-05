import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages=1, currentPage=1, nextPage, previousPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={previousPage}
        disabled={currentPage === 1} 
      >
        Previous
      </button>
      <p>Page {currentPage} of {totalPages}</p>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;