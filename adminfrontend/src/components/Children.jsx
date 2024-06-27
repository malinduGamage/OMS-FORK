import React, { useState } from "react";
import { childrenDetails } from "../constants";
import Child from "./Child";
import Search from "./Search";
import AgeSlider from "./AgeSlider";

const Children = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [ageRange, setAgeRange] = useState([3, 18]); 

  
  const filteredChildren = childrenDetails.filter((child) => {
    const matchesSearch = child.name
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
    const withinAgeRange = child.age >= ageRange[0] && child.age <= ageRange[1];
    return matchesSearch && withinAgeRange;
  });

  return (
    <div>
      <div className=" grid md:grid-cols-2  gap-3 mx-8 my-6">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AgeSlider ageRange={ageRange} setAgeRange={setAgeRange} />{" "}
      
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-10">
        {filteredChildren.map((child) => (
          <Child
            key={child.name} 
            name={child.name}
            age={child.age}
            imageUrl={child.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Children;
