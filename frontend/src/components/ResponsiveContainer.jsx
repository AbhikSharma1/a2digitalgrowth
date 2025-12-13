import React from 'react';

const ResponsiveContainer = ({ children, className = "", maxWidth = "7xl" }) => {
  const baseClasses = `w-full overflow-x-hidden mx-auto px-4 sm:px-6`;
  const maxWidthClass = `max-w-${maxWidth}`;
  
  return (
    <div className={`${baseClasses} ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;