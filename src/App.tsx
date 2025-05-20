import React from 'react';
import { BookProvider } from './context/BookContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BookProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </BookProvider>
  );
}

export default App;