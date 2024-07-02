import React from "react";
import "./Button.scss";
import { Add } from '@carbon/icons-react';
import { ScanAlt, Settings } from '@carbon/icons-react';

//ProjectSideNav Icons
import { Workspace, Folders, Nominal, Task, Earth } from '@carbon/icons-react';

const Button = ({ text, buttonStyle, icon, iconAlign, title, minSize, onChange}) => {
    const disabledBool = false; //prop probably

    const componentsIconList = { //will that affect performance, is there any other way around it?
        Add,
        ScanAlt,
        Workspace,
        Folders,
        Nominal,
        Task,
        Settings,
        Earth
        

    }
    const CarbonIcon = componentsIconList[icon];

    let buttonContent = {}

    if(icon){
         buttonContent = (
            <>
                {icon && <CarbonIcon className="button-icon" />}{text && <span>{text}</span>}
            </>
        );

    if(iconAlign === 'right'){
        buttonContent = (
            <>
                {text && <span>{text}</span>}{icon && <CarbonIcon className="button-icon" />}
            </>
        );
    }

    }else{
        buttonContent = (
            <>
            {text && <span>{text}</span>}
            </>
        );
    }
    
    return (
        <button type='button'
                className={`button ${buttonStyle}`}
                title={title}
                disabled={disabledBool}
                onClick={onChange}
                style={{minHeight: minSize, minWidth: minSize}}
                >

                {buttonContent}
        </button>
    );
};

export default Button;