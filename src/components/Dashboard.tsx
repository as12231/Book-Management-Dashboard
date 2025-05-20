import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import BookTable from './BookTable';
import BookSearch from './BookSearch';
import BookFilter from './BookFilter';
import Pagination from './Pagination';
import BookForm from './BookForm';
import { BookFormData } from '../types';
import { Plus, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { fetchBooks, addBook } = useBooks();
  const [showAddForm, setShowAddForm] = useState(false);
  
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleAddBook = (formData: BookFormData) => {
    addBook(formData);
    setShowAddForm(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Book Management Dashboard</h1>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
            Add New Book
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full md:w-1/3">
                <BookSearch />
              </div>
              <div className="w-full md:w-2/3">
                <BookFilter />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <BookTable />
            <Pagination />
          </div>
        </div>
      </div>
      
      {showAddForm && (
        <BookForm
          onSubmit={handleAddBook}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;