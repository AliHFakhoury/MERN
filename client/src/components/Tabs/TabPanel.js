import React from 'react';

const TabPanel = ({children, isActive}) => {
    return <div className={isActive ? 'active' : ''}>{children}</div>;

}

export default TabPanel;