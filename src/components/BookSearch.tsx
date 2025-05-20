import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { Search } from 'lucide-react';

const BookSearch = () => {
  const { setSearchTerm } = useBooks();
  const [localSearch, setLocalSearch] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
        <Search size={18} />
      </div>
      <input
        type="text"
        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5"
        placeholder="Search by title or author..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};

export default BookSearch;