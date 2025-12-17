import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Typography from '../ui/Typography';
import { Avatar } from '../ui/Avatar';
import './Header.css';

const Header: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="header">
      <div className="header__container">
        <img src="/twitter_icon.svg" alt="Logo" className="header__logo-icon" />
        <div className="header__logo">
          <Typography el="h3" className="header__title">Another Twitter Clone</Typography>
        </div>
        
        <div className="header__user">
          <Typography el="h3" className="header__username">{user.name}</Typography>
          <Avatar name={user.name} />
        </div>
      </div>
    </header>
  );
};

export default Header;