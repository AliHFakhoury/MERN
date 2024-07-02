import React from 'react';
import "./InputText.scss";

const InputText = ({ type, name, value, handleChange, placeholder, required, paddingRight, paddingLeft }) => {

    return (
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    className='input'
                    placeholder={placeholder}
                    required={required}
                    style={{paddingRight: paddingRight, paddingLeft: paddingLeft,}}
                />
    );
};

export default InputText;