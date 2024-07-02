import React, { useState, useEffect } from 'react';
import './CommentsNotesSIF.scss';
import { InputWrap, InputText, ButtonWrapper, Button, Spacer } from '../../components';

const CommentsNotesSIF = ({ onChange, field_name, componentData }) => {
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
                    <textarea className='comment-input' onChange={handleStringInputChange} value={formData}></textarea>
                </InputWrap>
            </>
    );
};

export default CommentsNotesSIF;