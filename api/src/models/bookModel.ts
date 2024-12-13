import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Book {
  id: number;
  title: string;
  author: string | null;
  price: number | null;
  description: string | null;
  publication_date: string | null;
  image_url: string | null;
  category: '소설' | '아동' | '요리' | '여행' | '건강' | '과학';
}

// 책 목록 조회
export const getBooks = async () => {
  const [rows] = await db.execute('SELECT * FROM books');
  return rows;
};

// 특정 책 조회
export const getBookById = async (id: number): Promise<RowDataPacket | null> => {
  const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0] || null;
};

// 책 등록
export const addBook = async (book: Omit<Book, 'id'>) => {
  const { title, author, price, description, publication_date, image_url, category } = book;
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO books (title, author, price, description, publication_date, image_url, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, author, price, description, publication_date, image_url, category]
  );
  return result.affectedRows > 0;
};

// 책 정보 수정
export const updateBook = async (id: number, book: Omit<Book, 'id'>) => {
  const { title, author, price, description, publication_date, image_url, category } = book;
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE books SET title = ?, author = ?, price = ?, description = ?, publication_date = ?, image_url = ?, category = ? WHERE id = ?',
    [title, author, price, description, publication_date, image_url, category, id]
  );
  return result.affectedRows > 0;
};

// 특정 책 삭제
export const deleteBook = async (id: number) => {
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM books WHERE id = ?', [id]);
  return result.affectedRows > 0;
};