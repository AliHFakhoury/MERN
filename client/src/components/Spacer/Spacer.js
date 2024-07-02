import React from 'react';
import './Spacer.scss';

const Spacer = ({size}) => {
    return (
        <div className={'box-spacer '.concat(size)}></div>
    );
};

export default Spacer;