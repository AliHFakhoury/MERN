import React from "react";
import {MisuseOutline} from '@carbon/icons-react';
import {Spacer} from "../../components";
import "./Error.scss";

const Error = ({errorType}) => {
    //Error number from app context
    return (
        <div className="error-wrapper">
            <div className="container">
            <MisuseOutline className="error-icon"/>
            <Spacer size={'_06'}/>
            <div className="error-type">{errorType}</div>
            <Spacer size={'_04'}/>
            <p>This page doesn't exist. If you believe this is our error, please <a className="inline-link" href="https://www.orogentech.ca/contact">let us know</a>.</p>
            </div>
        </div>
    );
};

export default Error;