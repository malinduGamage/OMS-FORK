// Child.js
import React from 'react';

const Child = (props) => {
  return (
    <a href="#" className="block  pb-5 rounded-md shadow-sm hover:shadow-md">
      <img
        alt=""
        src={props.imageUrl}
        className="h-64 w-full rounded-t-md object-cover sm:h-80 lg:h-96 "
      />
  
      <h3 className="mt-4 px-5 text-lg font-bold text-gray-900 sm:text-xl">{props.name}</h3>
  
      <p className="mt-2 px-5 max-w-sm text-gray-700 font-bold">
        age: {props.age}
      </p>
    </a>
  );
};

export default Child;
