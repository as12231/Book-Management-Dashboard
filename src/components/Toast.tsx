import { useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useBooks();
  
  // Ensure toast messages are removed after a certain time
  useEffect(() => {
    const timers = toasts.map(toast => {
      return setTimeout(() => removeToast(toast.id), 5000);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts, removeToast]);
  
  if (toasts.length === 0) return null;
  
  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'info':
      default:
        return <AlertCircle className="h-5 w-5 text-blue-400" />;
    }
  };
  
  const getToastColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`max-w-xs ${getToastColor(toast.type)} border rounded-md shadow-sm p-4 transform transition-all duration-300 animate-slide-in flex items-start`}
        >
          <div className="flex-shrink-0 mr-3">
            {getToastIcon(toast.type)}
          </div>
          <div className="flex-1 mr-2">
            <p className="text-sm">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 ml-auto"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;