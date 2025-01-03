import React, { ReactNode } from "react";

interface CardProps {
  title: ReactNode;
  description: string;
  keyword: string;
  thumbnailUrl?: string;
  color: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  keyword,
  thumbnailUrl,
  color,
  children,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {thumbnailUrl && (
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {" "}
          <img
            src={thumbnailUrl}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`px-6 py-4 ${color}`}>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-lg text-gray-700">
          {keyword
            ? description
                .split(new RegExp(`(${keyword})`, "gi"))
                .map((part, i) =>
                  part.toLowerCase() === keyword.toLowerCase() ? (
                    <span key={i} className="bg-yellow-200 font-bold">
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )
            : description}
        </p>
      </div>
      {children}
    </div>
  );
};

export default Card;
