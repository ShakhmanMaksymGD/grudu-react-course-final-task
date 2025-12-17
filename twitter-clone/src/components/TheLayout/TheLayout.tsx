import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from '../Header';
import './TheLayout.css';

type LayoutProps = {
  children: ReactNode;
}

const TheLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      {isAuthenticated && <Header />}
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
};

export default TheLayout;