import React, { useState } from "react";
import "./Selector.scss";

const Selector = ({options, initialValue, onChange, grouped, objectOptions}) => {
  const [selectorOptions, setSelectorOptions] = useState(options);
  return (
    // Put class to custom-select on this div for the above code to work
      <>
        <select id="options" value={initialValue} onChange={onChange} className="custom-select">
          <option value="" >None</option>
          {
            objectOptions ? (
              <>
                {Object.keys(options).map( (key, index) => (
                    <option key={index} value={key}>{options[key]}</option>
                ))}
              </>
            ) : (
              <>
              { grouped ? (
                <>
                  {Object.keys(options).map( (key) => (
                    <optgroup key={key} label={key}>
                      {options[key].map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </optgroup>
                  ))}
                </>
              ) : (
                <>
                  {selectorOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </>
              )}

              </>
            )
          }
          
          
          
        </select>
         
      </>
  );
}

export default Selector;
