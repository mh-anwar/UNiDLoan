import React from 'react';
import './loader.css';

// https://codesandbox.io/s/react-bouncing-dots-loaders-v13s4?from-embed=&file=/src/BouncingDotsLoader.js
function BouncingDotsLoader()
{
  return (
    <>
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;