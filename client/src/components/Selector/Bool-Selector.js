import React, { useState } from "react";
import "./Selector.scss";

const BoolSelector = ({options, initialValue, onChange }) => {
  const [selectorOptions, setSelectorOptions] = useState(options);


  return (
      <>
        <select id="options" value={initialValue} onChange={onChange} className="input">
          <option value="" >None</option>
          {Object.keys(options).map( (key) => (
            <>
              {/* {console.log(options[key])} */}
              <option key={key} value={options[key]}>{key}</option>
            </>
          ))}
        </select>
         
      </>
  );
}

export default BoolSelector;
