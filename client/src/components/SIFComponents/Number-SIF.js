import React, { useState, useEffect } from 'react';
import './NumberSIF.scss';
import './SIF-styles.scss';
import { FormRow, Checkbox, Selector, RadioButton, Spacer, Button, ButtonWrapper, InputWrap, InputText, InputNumber, Switch } from '../../components';

const NumberSIF = ({ onChange, field_name, componentData  }) => {
    const [formData, setFormData] = useState({});

    const symbolOptions = ["", "*","%","A","B"];
    const unitOptions = ["", "km","m","cm", "mm", "in", "ft", "yd"] //check how to have titles in that select

    useEffect(()=> {
        if(componentData){
            console.log(componentData)
            setFormData(componentData.value)
        }else{
            setFormData({})
        }

    }, [componentData])

    const handleStringInputChange = (event) => {
        const { value } = event.target;
        setFormData(value);
        
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
                <InputNumber handleChange={handleStringInputChange} value={formData}/>
            </InputWrap>
        </>
    );
};

export default NumberSIF;