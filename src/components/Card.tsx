import React, { ReactNode } from 'react';


interface CardProps {
  title: string;
  description: string;
  imageUrl?: string; 
  children?: ReactNode; 
  color? : string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, children, color }) => {
  return (
    <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg">
      <div className = {color}>
      {imageUrl && (
        <div className="w-40 h-30  overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <h1 className="text-black-700 text-base">{description}</h1>
        <p>{children}</p>
      </div>
      </div>
    </div>
  );
};

export default Card;
