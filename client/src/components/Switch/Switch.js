import React from 'react';
import './Switch.scss';

const Switch = ({checked, handleChange, lhs, rhs, argument}) => {
    return (
        <div className='switch-wrapper'>
            <span className='input-label'>{lhs} {argument} {rhs}</span>
            <label className="switch">
                <input  type="checkbox" checked={checked} onChange={handleChange}/>
                <span className="switch-handle"></span>
            </label>
        </div>
    );
};

export default Switch;