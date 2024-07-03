import React, { useState, useEffect } from "react";
import { childrenDetails } from "../constants";
import Child from "./Child";
import Search from "./Search";
import AgeSlider from "./AgeSlider";
import ChildTable from "./ChildTable";
import ChildForm from "./ChildForm";

const Children = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState([0, 18]);
  const [formVisibility, setFormVisibility] = useState(false);

  const handleClick = () => {
    setFormVisibility(!formVisibility);
  };

  return (
    <div>
      <div className=" grid md:grid-cols-2 mx-10 my-6">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button onClick={handleClick} class=" items-end bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded">
          Add Child
        </button>
        {/*<AgeSlider ageRange={ageRange} setAgeRange={setAgeRange} />{" "}*/}

      </div>
      <div className="mx-10">
        <ChildTable children={childrenDetails} />
      </div>
      {formVisibility ? <ChildForm setFormVisibility={setFormVisibility} /> : null}
    </div>
  );
};

export default Children;
