import React from 'react';

const Tab = ({ children, isActive, onClick}) => {
    return (
        <button className={isActive ? 'active' : ''} onClick={onClick}>
            {children}
        </button>
    )
   
}

export default Tab;