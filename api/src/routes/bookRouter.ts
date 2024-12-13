import { Router, Request, Response } from 'express';
import * as bookModel from '../models/bookModel';

const bookRouter = Router();

// 책 목록 조회
bookRouter.get('/', async (req: Request, res: Response) => {
  try {
    const books = await bookModel.getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: '책 목록 조회 실패', error });
  }
});

// 특정 책 조회
bookRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookModel.getBookById(Number(id));
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: '책을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '책 정보 조회 중 오류 발생', error });
  }
});

// 책 등록
bookRouter.post('/', async (req: Request, res: Response) => {
  const { title, author, price, description, publication_date, image_url, category, quantity } = req.body;
  try {
    const added = await bookModel.addBook({ title, author, price, description, publication_date, image_url, category, quantity });
    if (added) {
      res.status(201).json({ message: '책이 성공적으로 등록되었습니다.' });
    } else {
      res.status(400).json({ message: '책 등록 실패' });
    }
  } catch (error) {
    res.status(500).json({ message: '책 등록 중 오류 발생', error });
  }
});

// 책 정보 수정
bookRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, price, description, publication_date, image_url, category, quantity } = req.body;

  try {
    const updated = await bookModel.updateBook(Number(id), { title, author, price, description, publication_date, image_url, category, quantity });
    if (updated) {
      res.status(200).json({ message: '책 정보가 성공적으로 수정되었습니다.' });
    } else {
      res.status(404).json({ message: '책을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '책 정보 수정 중 오류 발생', error });
  }
});

// 특정 책 삭제
bookRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await bookModel.deleteBook(Number(id));
    if (deleted) {
      res.status(200).json({ message: '책이 성공적으로 삭제되었습니다.' });
    } else {
      res.status(404).json({ message: '책을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '책 삭제 실패', error });
  }
});

export default bookRouter;