import React from 'react';
// import Alert from './Alert/Alert.js';
// import { InformationSquareFilled } from '@carbon/icons-react';
// import Tooltip from './ToolTip/ToolTip.js';
import "./InputNumber.scss";

const InputNumber = ({ name, value, handleChange, required, min, max, placeholder,  paddingLeft, paddingRight }) => {
    const handleKeyDown = (event) => {
        const numericKeys = /^[0-9\b]+$/; // Regular expression to match numeric characters and the backspace key
        if (!numericKeys.test(event.key)) {
          event.preventDefault(); // Prevent non-numeric characters from being entered
        }
    };

    return (
                <input
                    type='number'
                    id={name}
                    name={name}
                    value={value}
                    min={0}
                    max={max}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='input'
                    required={required}
                    placeholder={placeholder}
                    style={{paddingRight: paddingRight, paddingLeft: paddingLeft,}}
                />
    );
};

export default InputNumber;