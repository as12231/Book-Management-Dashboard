import { ReactNode } from 'react';
import Toast from './Toast';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
      <Toast />
    </div>
  );
};

export default Layout;