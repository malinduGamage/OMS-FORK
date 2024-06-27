import React from "react";
import ReactSlider from "react-slider"; // Correct import
import "./AgeSlider.css"; // Import the CSS for slider styling

const AgeSlider = ({ ageRange, setAgeRange }) => { // Receive ageRange and setAgeRange as props
  const min = 3;
  const max = 18;

  return (
    <div>
      <div>
        <div className="text-xl py-3">Age Range: {ageRange[0]} - {ageRange[1]}</div>
      </div>
      
      <ReactSlider
        value={ageRange} // Use ageRange from props
        min={min}
        max={max}
        onChange={setAgeRange} // Use setAgeRange to update the state
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
      />
    </div>
  );
};

export default AgeSlider;
