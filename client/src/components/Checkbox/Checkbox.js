import React from 'react';
import './Checkbox.scss';

const Checkbox = ({labelText, checked, handleChange}) => {
    return (
        <label className="checkbox-wrap">{labelText}
            <input type="checkbox" checked={checked} onChange={handleChange}/>
            <span className="checkbox-checkmark"></span>
        </label>
    );
};

export default Checkbox;