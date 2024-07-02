import React from 'react';
import { InformationSquareFilled } from '@carbon/icons-react';

const FormRow = ({ type, name, value, handleChange, labelText, labelLinkText }) => {
    return (
        <div className='input-wrapper'>
            <div className='input-label-wrapper'>
                <div>
                    <label htmlFor={name} className='input-label'>
                        {labelText || name}
                    </label>
                    <InformationSquareFilled/>
                </div>
                
                <a className='label-link'>
                    {labelLinkText}
                </a>
            </div>
            <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                className='input'
            />
            <div className='input-helptext'>
            </div>
        </div>
    );
};

export default FormRow;