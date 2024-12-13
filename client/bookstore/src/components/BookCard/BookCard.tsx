import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import './bookCard.css';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="book-card-image">
        {book.image_url ? <img src={book.image_url} alt={book.title} /> : <div className="no-image">No Image</div>}
      </div>
      <div className="book-card-info">
        <h3>{book.title}</h3>
        {book.author && <p>저자 : {book.author}</p>}
        {book.price && <p>가격 : {formatPrice(book.price)}원</p>}
        {book.category && <p>장르 : {book.category}</p>}
        {book.description && <p>{book.description}</p>}
        <p>수량 : {book.quantity ?? 0}</p>
      </div>
    </div>
  );
};

export default BookCard;