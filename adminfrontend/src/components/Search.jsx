import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (

    <div>
        
        <div className="flex-center  overflow-hidden  px-4 py-2 bg-gray-50 ml-20 h-[50px]">

        
<i className="fa-solid fa-magnifying-glass"></i>
<input
  type="text"
  placeholder="Search by name.."
  value={searchTerm}
  onChange={handleInputChange} 
  className="border-0 outline-none p focus:border-0 focus-visible:ring-0 focus:ring-transparent bg-gray-50"
/>
</div>
    </div>
    
  );
};

export default Search;
