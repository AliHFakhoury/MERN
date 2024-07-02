import React, { useState, useEffect } from 'react';
import { Switch, Selector, RadioButton, Spacer, Button, ButtonWrapper, InputWrap, InputText, InputNumber } from '../../components';
import { Wikis, Launch } from '@carbon/icons-react';
import './LinkSIF.scss';

const LinkSIF = ({ onChange, field_name, componentData }) => {
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
                    <InputText placeholder="www.orogentech.ca" paddingLeft='calc(0.5em + 1em + 0.625em)' handleChange={handleStringInputChange} value={formData}/>
                    <div className='input-icon-wrap'>
                        <Wikis className='input-icon'/>
                    </div>
                </InputWrap>
                {/* <div className='link-wrapper'>
                    <a href='URL' target='_blank' className='link-title'>
                    OG Title
                    </a>
                    <img src='Favicon' alt='OG Title' className='link-favicon'/>
                    <Launch className='link-external'/>
                </div> */}


            </>
    );
};

export default LinkSIF;