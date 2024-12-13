import React, { useState, useEffect } from 'react';
import { Book } from '../../types';
import Button from '../../components/Button/Button';
import { showSuccessAlert, showErrorAlert } from '../../utils/alert';
import axios from 'axios';
import { formatPrice } from '../../utils/formatPrice';
import '../../styles/bookModal.css';

interface EditBookModalProps {
    bookId: string;
    onCancel: () => void;
    onSave: (updatedBook: Book) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ bookId, onCancel, onSave }) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/${bookId}`);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                showErrorAlert('에러', '책 정보를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        if (book) {
            setBook((prev) => (prev ? { ...prev, price: numericValue ? parseInt(numericValue) : null } : null));
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (book) {
            setBook((prev) => (prev ? { ...prev, publication_date: value || null } : null));
        }
    };

    const handleSave = async () => {
        if (book) {
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/books/${bookId}`, book);
                showSuccessAlert('수정 완료', '책 정보가 성공적으로 수정되었습니다.');
                onSave(book);
            } catch (err) {
                showErrorAlert('수정 실패', '책 정보를 수정하는 중 문제가 발생했습니다.');
            }
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>책 수정</h2>
                {book && (
                    <form>
                        <div className="form-group">
                            <label>책 제목</label>
                            <input
                                type="text"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>저자</label>
                            <input
                                type="text"
                                name="author"
                                value={book.author || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>가격</label>
                            <input
                                type="text"
                                name="price"
                                value={book.price !== null ? formatPrice(book.price) : ''}
                                onChange={handlePriceChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>출판일</label>
                            <input
                                type="date"
                                name="publication_date"
                                value={book.publication_date ? book.publication_date.split('T')[0] : ''}
                                onChange={handleDateChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>카테고리</label>
                            <select
                                name="category"
                                value={book.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="소설">소설</option>
                                <option value="아동">아동</option>
                                <option value="요리">요리</option>
                                <option value="여행">여행</option>
                                <option value="건강">건강</option>
                                <option value="과학">과학</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>설명</label>
                            <textarea
                                name="description"
                                value={book.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>이미지 URL</label>
                            <input
                                type="text"
                                name="image_url"
                                value={book.image_url || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-actions">
                            <Button onClick={onCancel} variant="secondary">취소</Button>
                            <Button onClick={handleSave} variant="primary">수정</Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditBookModal;