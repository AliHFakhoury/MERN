import React from 'react';
import { useAppContext } from '../../context/appContext';
import { Edit, Checkmark } from '@carbon/icons-react';
import './UserLabel.scss';

const UserLabel = ({labelText, colour}) => {

    const style = {
        
    };
    //Look into editing this (should it be an input? Or would a text work fine? Thanks). Toggle Carbon Icons based on editing T/F
    return <div className={'user-label '.concat(colour)}>
    
                {labelText}
                <Edit className='edit-button' />
                <Checkmark className='edit-button' />
           </div>
}


export default UserLabel;