import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../../components/BookCard/BookCard';
import { Book } from '../../types';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../components/Button/Button';
import AddBookModal from '../AddBookModal/AddBookModal';
import { showSuccessAlert, showErrorAlert } from '../../utils/alert';
import './bookListPage.css';

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<'title' | 'author'>('title');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    price: 0,
    description: '',
    publication_date: '',
    image_url: '',
    category: '소설',
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
      const data = response.data;

      const filteredBooks = data.filter((book: Book) => {
        if (searchFilter === 'title') {
          return book.title?.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return book.author?.toLowerCase().includes(searchQuery.toLowerCase());
      });

      const booksPerPage = 10;
      const totalBooks = filteredBooks.length;
      const totalPages = Math.ceil(totalBooks / booksPerPage);

      setBooks(filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage));
      setTotalPages(totalBooks > 0 ? totalPages : 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('책 목록을 불러오는 데 실패했습니다.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, searchQuery, searchFilter]);

  const handleSearch = (query: string, filter: 'title' | 'author') => {
    setSearchQuery(query);
    setSearchFilter(filter);
    setCurrentPage(1);
  };

  const handleAddBook = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, newBook);
      fetchBooks();

      setNewBook({
        id: 0,
        title: '',
        author: '',
        price: 0,
        description: '',
        publication_date: '',
        image_url: '',
        category: '소설',
      });

      setShowModal(false);
      showSuccessAlert('등록 완료', '책이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('책 등록 실패:', error);
      setError('책을 등록하는 데 실패했습니다.');
      showErrorAlert('등록 실패', '책을 등록하는 중 문제가 발생했습니다.');
    }
  };

  const handleCancelModal = () => {
    setNewBook({
      id: 0,
      title: '',
      author: '',
      price: 0,
      description: '',
      publication_date: '',
      image_url: '',
      category: '소설',
    });
    setShowModal(false);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-list">
      <h1>책목록</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="books">
        {books.length === 0 ? (
          <div className="no-books-message">일치하는 책이 없습니다.</div>
        ) : (
          books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        )}
      </div>

      <div className="add-book-button">
        <Button onClick={() => setShowModal(true)} variant="primary">
          책 등록
        </Button>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {showModal && (
        <AddBookModal
          newBook={newBook}
          setNewBook={setNewBook}
          onAddBook={handleAddBook}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
};

export default BookListPage;