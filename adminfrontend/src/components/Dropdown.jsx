import React from 'react';

const Dropdown = ({ valueList, onSelect }) => {
  const handleSelect = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className=' h-[50px] mr-20'>
      <select className='h-[50px] w-full bg-gray-50 border-0 px-10 focus:ring-transparent ' id="options" name="options" onChange={handleSelect}>
        <option  value="">All districts</option>
        {valueList.map((item, index) => (
          <option  key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
