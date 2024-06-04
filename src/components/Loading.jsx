// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingDots((prev) => {
        switch (prev) {
          case '':
            return '.';
          case '.':
            return '..';
          case '..':
            return '...';
          default:
            return '';
        }
      });
    }, 250);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 overflow-hidden">
      <span className="text-2xl font-semibold text-gray-900">Loading{loadingDots}</span>
    </div>
  );
};

export default Loading;