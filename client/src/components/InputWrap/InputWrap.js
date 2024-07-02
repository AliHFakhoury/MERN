import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import Alert from '../Alert/Alert';
import { InformationSquareFilled } from '@carbon/icons-react';
import { useAppContext } from '../../context/appContext';
import './InputWrap.scss';

const InputWrap = ({children, name, labelText, labelLinkText, labelLink, labelLinkTarget, showRequired, helpText, info}) => {
    const { isLoading, showAlert, alertText } = useAppContext();

    return (
        <>
        <div className='input-wrapper'>
            <div className='input-label-wrapper'>
                <div className='input-label-wrapper-inner'>
                    <label htmlFor={name} className='input-label'>
                        {labelText || name}
                        { showRequired && <span className={'required'}>*</span>} 
                    </label>
                    { info && <ToolTip triggerComponent={<InformationSquareFilled className={'input-label-info'} />} tooltipText={info}/>}
                </div>
                <a className='label-link' href={labelLink} target={labelLinkTarget}>
                    {labelLinkText}
                </a>
            </div>
            <div className='input-wrapper-inner'>
                {children}
            </div>
            {helpText && <div className='input-help-text'> {helpText} </div> }
        </div>
        {/* Swicth the alertTextFromTest prop with the app context value */}
        {/* {showAlert && inputHasAlert && <Alert /> } */}
        </>
    );
};

export default InputWrap;