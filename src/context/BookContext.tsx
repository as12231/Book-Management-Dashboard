import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Book, BookFormData, ToastMessage } from '../types';
import * as api from '../utils/api';

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  toasts: ToastMessage[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  searchTerm: string;
  genreFilter: string;
  statusFilter: string;
  fetchBooks: () => Promise<void>;
  addBook: (book: BookFormData) => Promise<void>;
  updateBook: (id: string, book: BookFormData) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setGenreFilter: (genre: string) => void;
  setStatusFilter: (status: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
  removeToast: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [genreFilter, setGenreFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const itemsPerPage = 10;

  const filteredBooks = books.filter(book => {
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = genreFilter === '' || book.genre === genreFilter;
    const matchesStatus = statusFilter === '' || book.status === statusFilter;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
      addToast('error', 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback(async (bookData: BookFormData) => {
    setLoading(true);
    try {
      const newBook = await api.createBook(bookData);
      if (newBook) {
        setBooks(prev => [...prev, newBook]);
        addToast('success', 'Book added successfully');
      }
    } catch (err) {
      addToast('error', 'Failed to add book');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBook = useCallback(async (id: string, bookData: BookFormData) => {
    setLoading(true);
    try {
      const updatedBook = await api.updateBook(id, bookData);
      if (updatedBook) {
        setBooks(prev => prev.map(book => book._id === id ? { ...updatedBook, _id: id } : book));
        addToast('success', 'Book updated successfully');
      }
    } catch (err) {
      addToast('error', 'Failed to update book');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeBook = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const success = await api.deleteBook(id);
      if (success) {
        setBooks(prev => prev.filter(book => book._id !== id));
        addToast('success', 'Book deleted successfully');
      }
    } catch (err) {
      addToast('error', 'Failed to delete book');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const value = {
    books: filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    loading,
    error,
    toasts,
    currentPage,
    itemsPerPage,
    totalPages,
    searchTerm,
    genreFilter,
    statusFilter,
    fetchBooks,
    addBook,
    updateBook,
    removeBook,
    setCurrentPage,
    setSearchTerm,
    setGenreFilter,
    setStatusFilter,
    addToast,
    removeToast
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};