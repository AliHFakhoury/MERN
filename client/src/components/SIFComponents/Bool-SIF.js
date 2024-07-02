import React, { useState, useEffect } from 'react';
import './BoolSIF.scss';
import { Switch, InputWrap } from '../../components';

const BoolSIF = ({ onChange, fieldValues, componentData }) => {
    const [switchState, setSwitchState] = useState(false);

    const trueState = fieldValues.argument[0];
    const falseState = fieldValues.argument[1];

    const handleSwitchChange = () => {
        const fieldObject = {
            fieldName: fieldValues.field_name,
            value: !switchState
        }
        
        onChange(fieldObject);
        setSwitchState(!switchState);
    }

    useEffect(()=> {
        if(componentData){
            console.log(componentData)
            setSwitchState(componentData.value)
        }else{
            setSwitchState(false)
        }
    }, [componentData])
  

    return (
        <>
            <span className='form-section-heading'>{fieldValues.field_name}</span>
            <InputWrap labelText=''>
                <Switch lhs={fieldValues.lhsText} rhs={fieldValues.rhsText} argument={switchState ? trueState : falseState} checked={switchState} handleChange={handleSwitchChange}/>
            </InputWrap>
        </>
    );
};

export default BoolSIF;