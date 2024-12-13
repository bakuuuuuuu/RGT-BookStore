import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title" onClick={handleTitleClick}>
          RGT BookStore
        </h1>
      </div>
    </header>
  );
};

export default Header;