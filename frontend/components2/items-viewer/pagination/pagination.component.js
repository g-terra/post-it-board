import React from 'react';
import styles from './pagiantion.module.css'

const Pagination = ({ fetchPage, totalPages, currentPage }) => {
    const handlePrevClick = () => {
        if (currentPage > 1) {
            fetchPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            fetchPage(currentPage + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            <button className={styles.previousButton} onClick={handlePrevClick} disabled={currentPage === 1}>
                Previous
            </button>
            <span className={styles.paging }>{currentPage}/{totalPages}</span>
            <button className={styles.nextButton} onClick={handleNextClick} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
