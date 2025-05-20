import { Book, BookFormData } from '../types';

// In a real app, this would be an environment variable
const API_BASE_URL = 'https://crudcrud.com/api/ca5d70ffc6a74a198054afdef463afce';

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const createBook = async (bookData: BookFormData): Promise<Book | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    
    if (!response.ok) throw new Error('Failed to create book');
    return response.json();
  } catch (error) {
    console.error('Error creating book:', error);
    return null;
  }
};

export const updateBook = async (id: string, bookData: BookFormData): Promise<Book | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    
    if (!response.ok) throw new Error('Failed to update book');
    return response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    return null;
  }
};

export const deleteBook = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete book');
    return true;
  } catch (error) {
    console.error('Error deleting book:', error);
    return false;
  }
};