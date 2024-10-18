import React from 'react';
import Alert from './Alert/Alert.js';
import { InformationSquareFilled } from '@carbon/icons-react';
import Tooltip from './ToolTip/ToolTip.js';
import InputText from './InputText/TextInput';

const InputContainer = ({ type, name, value, handleChange, labelText, labelLinkText, helpText, required, showRequired, info, labelLink, inputHasAlert }) => {
    const showAlert = false;

    return (
        <div className='input-wrapper'>
            
            <div className='input-label-wrapper'> 
                <div className='input-label-wrapper-inner'>
                    <label htmlFor={name} className='input-label'>
                        {labelText || name}
                        
                        { showRequired && <span className={'required'}>*</span>} 

                    </label>
                    { info && <Tooltip triggerComponent={<InformationSquareFilled className={'input-label-info'} />} tooltipText={info}/>}
                </div>
                <a className='label-link' href={labelLink} target="_blank">
                    {labelLinkText}
                </a>
            </div>
            <div className='input-wrapper-inner'>
                <InputText
                    type={type}
                    value={value}
                    name={name}
                    handleChange={handleChange}
                    className='input'
                    required = {required}
                />
            </div>
            <div className='input-help-text'>
            {helpText}
            </div>
            
            {/* Swicth the alertTextFromTest prop with the app context value */}
            {showAlert && inputHasAlert && <Alert /> }
        </div>
    );
};

export default InputContainer;