// src/components/Card.tsx

import React, { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string; 
  children?: ReactNode; 
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, children }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        {/* <h3>{TITLE }</h3>
        <p>{HALP}</p> */}
        {children}
      </div>
    </div>
  );
};

export default Card;
