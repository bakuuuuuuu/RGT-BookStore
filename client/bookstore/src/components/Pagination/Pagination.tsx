import React from 'react';
import Button from '../Button/Button';
import { PaginationProps } from '../../types';
import './pagination.css';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? 'btn-active' : ''}
          variant={i === currentPage ? 'primary' : 'secondary'}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <Button onClick={handlePrevious} disabled={currentPage === 1} variant="secondary">
        이전
      </Button>
      {renderPageNumbers()}
      <Button onClick={handleNext} disabled={currentPage === totalPages} variant="secondary">
        다음
      </Button>
    </div>
  );
};

export default Pagination;