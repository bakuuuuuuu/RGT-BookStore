import React from 'react';
import { Book } from '../../types';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../utils/formatPrice';
import '../../styles/bookModal.css';

interface BookModalProps {
    newBook: Book;
    setNewBook: React.Dispatch<React.SetStateAction<Book>>;
    onAddBook: () => void;
    onCancel: () => void;
}

const AddBookModal: React.FC<BookModalProps> = ({ newBook, setNewBook, onAddBook, onCancel }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        setNewBook((prev) => ({
            ...prev,
            price: numericValue ? parseInt(numericValue) : null,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>책 등록</h2>
                <form>
                    <div className="form-group">
                        <label>책 제목</label>
                        <input
                            type="text"
                            name="title"
                            value={newBook.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>저자</label>
                        <input
                            type="text"
                            name="author"
                            value={newBook.author || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>가격</label>
                        <input
                            type="text"
                            name="price"
                            value={newBook.price !== undefined && newBook.price !== null ? formatPrice(newBook.price) : ''}
                            onChange={handlePriceChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>출판일</label>
                        <input
                            type="date"
                            name="publication_date"
                            value={newBook.publication_date || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>카테고리</label>
                        <select
                            name="category"
                            value={newBook.category}
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
                            value={newBook.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>이미지 URL</label>
                        <input
                            type="text"
                            name="image_url"
                            value={newBook.image_url || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <Button onClick={onCancel} variant="secondary">취소</Button>
                        <Button onClick={onAddBook} variant="primary">등록</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;