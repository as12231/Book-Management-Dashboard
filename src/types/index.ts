export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: 'Available' | 'Issued';
}

export type BookFormData = Omit<Book, '_id'>;

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}