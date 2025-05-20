# Book Management Dashboard

A modern, responsive React application for managing a book collection with features like real-time search, filtering, and CRUD operations.

![Book Management Dashboard](https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 📚 Complete CRUD operations for books
- 🔍 Real-time search by title or author
- 🏷️ Filter books by genre and status
- 📱 Fully responsive design
- 📄 Pagination support
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and efficient with Vite
- 🔔 Toast notifications for user feedback

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)
- Context API (for state management)

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
├── context/           # Context providers
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and API calls
└── main.tsx          # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The application uses a CRUD API endpoint for managing books. Each book has the following properties:

```typescript
interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: 'Available' | 'Issued';
}
```

## Features in Detail

### Book Management
- View all books in a paginated table
- Add new books with form validation
- Edit existing books
- Delete books with confirmation
- Real-time search and filtering

### User Interface
- Clean and modern design
- Responsive layout for all screen sizes
- Loading states and animations
- Toast notifications for user feedback
- Modal forms for adding/editing books

### Data Management
- Context API for state management
- Optimistic updates for better UX
- Error handling with user feedback
- Debounced search for better performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/)
