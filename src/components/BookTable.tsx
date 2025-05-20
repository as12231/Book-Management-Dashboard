import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import { Book } from '../types';
import BookForm from './BookForm';
import DeleteConfirmation from './DeleteConfirmation';
import { Edit, Trash2, BookOpen } from 'lucide-react';

const BookTable = () => {
  const { books, loading, updateBook, removeBook } = useBooks();
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  
  const handleEditClick = (book: Book) => {
    setBookToEdit(book);
  };
  
  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
  };
  
  const handleUpdateBook = (formData: Omit<Book, '_id'>) => {
    if (bookToEdit && bookToEdit._id) {
      updateBook(bookToEdit._id, formData);
      setBookToEdit(null);
    }
  };
  
  const handleDeleteBook = () => {
    if (bookToDelete && bookToDelete._id) {
      removeBook(bookToDelete._id);
      setBookToDelete(null);
    }
  };
  
  if (loading && books.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-r-blue-600 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading books...</p>
        </div>
      </div>
    );
  }
  
  if (books.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-center p-6">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a book to get started or try a different search.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="overflow-x-auto relative rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3 px-4">Title</th>
              <th scope="col" className="py-3 px-4">Author</th>
              <th scope="col" className="py-3 px-4">Genre</th>
              <th scope="col" className="py-3 px-4">Published Year</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{book.title}</td>
                <td className="py-3 px-4">{book.author}</td>
                <td className="py-3 px-4">{book.genre}</td>
                <td className="py-3 px-4">{book.publishedYear}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    book.status === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(book)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {bookToEdit && (
        <BookForm
          book={bookToEdit}
          onSubmit={handleUpdateBook}
          onCancel={() => setBookToEdit(null)}
        />
      )}
      
      {bookToDelete && (
        <DeleteConfirmation
          book={bookToDelete}
          onConfirm={handleDeleteBook}
          onCancel={() => setBookToDelete(null)}
        />
      )}
    </>
  );
};

export default BookTable;