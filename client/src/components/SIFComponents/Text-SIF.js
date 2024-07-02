import React, { useState, useEffect } from 'react';
import { FormRow, Checkbox, RadioButton, Switch, ButtonWrapper, Button, Spacer, InputWrap, InputText, InputNumber } from '../../components';
import './TextSIF.scss';
import './SIF-styles.scss';

//from database, or empty if this is a 'create text' functionality. 

const TextSIF = ({ onChange, field_name, componentData }) => {
    const [formData, setFormData] = useState("");

    useEffect(()=> {
        if(componentData){
            console.log(componentData)
            setFormData(componentData.value)
        }else{
            setFormData("")
        }

    }, [componentData])

    const handleStringInputChange = (event) => {
        const { value } = event.target;
        // setFormData(value);
        
        const fieldObject = {
            fieldName: field_name,
            value: value
        }

        onChange(fieldObject);
    }

    return (
        <>
            <span className='form-section-heading'>{field_name}</span>
            <Spacer size='_055'/>
            <InputWrap labelText=''>
                <InputText handleChange={handleStringInputChange} value={formData} />
            </InputWrap>
        </>
    );
};

export default TextSIF;