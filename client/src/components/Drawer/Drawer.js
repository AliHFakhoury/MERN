import React, { Children } from "react";
import "./Drawer.scss";
import { Close } from '@carbon/icons-react';


const Drawer = ({ children }) => {
    
    // Add trigger to any element
    // Play 'drawer-state' animation forward / reverse on open/close
    // Add close animation to any element with close-object-custom id and hide close-object-default if custom is set 

    return (
        <div className='drawer'>
            <div>s</div>
            {children}
            <span id="close-object-default" className='close'><Close className='icon'/></span>
        </div>
    );
};

export default Drawer;