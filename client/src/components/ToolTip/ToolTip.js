import React from 'react';
import './ToolTip.scss';

const ToolTip = ({triggerComponent, tooltipText}) => {

    return <div className={'has-tool-tip'}>
                {triggerComponent}

                <span className={'tool-tip'}>
                    {tooltipText}
                </span>
            </div>
}

export default ToolTip;