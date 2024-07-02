import React from 'react';

// import Alert from './Alert/Alert.js';

const Input = ({ type, name, value, handleChange, required }) => {

    return (
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    className='input'
                    required={required}
                />
    );
};

export default Input;