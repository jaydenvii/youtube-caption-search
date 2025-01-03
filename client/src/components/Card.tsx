import React, { ReactNode } from "react";

interface CardProps {
  title: ReactNode;
  description: string;
  imageUrl?: string;
  children?: ReactNode;
  color?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  children,
  color,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {imageUrl && <img src={imageUrl} className="w-full h-40 object-cover" />}
      <div className={`px-6 py-4 ${color}`}>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-lg text-gray-700">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
