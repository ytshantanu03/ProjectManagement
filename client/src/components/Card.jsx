import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${className}`}>
      {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
