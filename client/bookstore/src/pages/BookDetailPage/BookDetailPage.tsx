import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { formatPublicationDate } from '../../utils/formatDate';
import { showWarningAlert, showSuccessAlert } from '../../utils/alert';
import EditBookModal from '../EditBookModal/EditBookModal';
import './bookDetailPage.css';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError('책 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = await showWarningAlert(
      '책 삭제',
      '정말로 이 책을 삭제하시겠습니까?'
    );

    if (isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
        showSuccessAlert('성공', '책이 삭제되었습니다.');
        navigate('/');
      } catch (err) {
        alert('책 삭제에 실패했습니다.');
      }
    }
  };

  const handleSave = (updatedBook: Book) => {
    setBook(updatedBook);
    setShowEditModal(false);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  if (!book) return <div>책 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        {book.image_url && <img className="book-image" src={book.image_url} alt={book.title} />}
        <div className="book-info">
          <h1>{book.title}</h1>
          <p><strong>저자 :</strong> {book.author}</p>
          <p><strong>장르 :</strong> {book.category}</p>
          <p><strong>가격 :</strong> {formatPrice(book.price ?? 0)}원</p>
          <p><strong>수량 :</strong> {book.quantity}</p>
          <p><strong>출판일 :</strong> {formatPublicationDate(book.publication_date)}</p>
          <p>{book.description}</p>

          <div className="book-buttons">
            <button className="btn btn-primary" onClick={() => setShowEditModal(true)}>수정</button>
            <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
          </div>
        </div>
      </div>
      {showEditModal && id && (
        <EditBookModal bookId={id} onCancel={() => setShowEditModal(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default BookDetailPage;