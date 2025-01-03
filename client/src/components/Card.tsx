import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  children?: ReactNode;
  color?: string;
  link?: string;
  link_title?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  children,
  color,
  link,
  link_title,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover" // Set a specific height and use object-cover
        />
      )}
      {/* {imageUrl && (
        <div className="w-full h-40">
          <iframe
            src={imageUrl}
            title={title || "YouTube Video"}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )} */}
      <div className={`px-6 py-4 ${color}`}>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        {children}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {link_title}
        </a>
      </div>
    </div>
  );
};

export default Card;
