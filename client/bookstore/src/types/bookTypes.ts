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