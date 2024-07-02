import React from 'react';
import { useAppContext } from '../../context/appContext';
import { WarningAltFilled } from '@carbon/icons-react';
import { CheckmarkFilled } from '@carbon/icons-react';
import { ErrorFilled } from '@carbon/icons-react';
import { WarningSquareFilled } from '@carbon/icons-react';
import { Misuse } from '@carbon/icons-react';
import { StopSignFilled } from '@carbon/icons-react';
import { FaceSatisfied } from '@carbon/icons-react';
import './Alert.scss';

const Alert = ({icon}) => {
    const componentsIconList = {
        WarningAltFilled,
        CheckmarkFilled,
        ErrorFilled,
        WarningSquareFilled,
        Misuse,
        StopSignFilled,
        FaceSatisfied,
    }

    const CarbonIcon = componentsIconList[icon];

    const { alertType, alertText } = useAppContext();
    
    // return <div className={'alert-banner'}>{alertText}</div>
    return <div className={'alert-banner '.concat(alertType)}>
                <CarbonIcon className='alert-banner-icon' />
                <div className='colour-bar'></div>
                {alertText}
            </div>
}

export default Alert;