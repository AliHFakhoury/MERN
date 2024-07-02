import React from 'react';
import './RadioButton.scss';

const RadioButton = ({id, group, labelText, value, checked, onChange}) => {
    return (
        <label className="radio-wrap">{labelText}
            <input type="radio" id={id} name={group} value={value} checked={checked} onClick={onChange} onChange={(e) => {console.log("Changed")}}/>
            <span className="radio-checkmark"></span>
        </label>
    );
};

export default RadioButton;