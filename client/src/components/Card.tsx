import React, { ReactNode } from 'react';


interface CardProps {
  title: string;
  description: string;
  imageUrl?: string; 
  children?: ReactNode; 
  color? : string;
  link? : string
  link_title? : string
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, children, color, link, link_title}) => {
  return (
<div className="max-w-sm rounded overflow-hidden shadow-lg">
  {imageUrl && (
    <img 
      src={imageUrl} 
      alt={title} 
      className="w-full"
    />
  )}
  <div className={`px-6 py-4 ${color}`}>
    <div className="font-bold text-xl mb-2">{title}</div>
    <p className="text-gray-700 text-base">{description}</p>
    {children}
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
      {link_title}
    </a>
  </div>
</div>

  );
};

export default Card;
