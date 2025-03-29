import React from "react";

export default function Empty({ name }) {
  return (
    <div>
      <h1 className='md:text-3xl" bg-opacity-50 bg-gradient-to-b from-amber-400 to-amber-700 bg-clip-text text-center text-2xl font-bold text-transparent'>
        No {name} found at the movement <span className="text-white">🤔</span>
      </h1>
    </div>
  );
}
