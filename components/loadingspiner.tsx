import React from 'react';

interface LoadingSpinnerProps {
  size?: string;  // Optional size prop to customize the spinner size
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'w-16 h-16' }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`${size} border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
