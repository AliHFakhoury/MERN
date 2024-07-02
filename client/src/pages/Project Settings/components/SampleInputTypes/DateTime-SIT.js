import React, { useState, useEffect } from 'react';
import './DateTimeSIT.scss';
import { InputWrap, InputText, ButtonWrapper, Button, Switch } from '../../../../components';

const DateTimeSIT = ({ initialState, onSave, sampleTypeIndex, fieldIndex, onCancel, onFNChange, isAdding }) => {
    const [formData, setFormData] = useState(initialState || {});

    useEffect(() => {
        if( initialState != null){
            setFormData(initialState)
        }
    }, [initialState])

    const handleStringInputChange = (indexInState, event) => {
        const { value } = event.target;

        const updatedFormData = {
            ...formData,
            [indexInState]: value
        };

        setFormData(updatedFormData);

    }

    const handleSave = () => {
        onSave(formData, sampleTypeIndex, fieldIndex)
    }
    
    const handleCancel = () => {
        if(!isAdding){
            const isFormEdited = Object.values(formData).some((value, index) => {
                return value !== Object.values(initialState)[index];
            });
            
            if(isFormEdited){
                console.log("Form prompted to cancel")
                if(window.confirm("Are you sure you want to cancel?")){
                    console.log("Form Canceled.")
                    setFormData(initialState)
                    onCancel(sampleTypeIndex, fieldIndex)
                }else{
                    console.log("Form Not Canceled.")
                }
            }else{
                console.log("Canceled from Notes SIT where form is not edited")

                onCancel(sampleTypeIndex, fieldIndex)
            }
        }else{
            if(window.confirm("Are you sure you want to cancel?")){
                console.log("Canceled from the Notes SIT")
                onCancel(sampleTypeIndex)
            }else{
                console.log("Form Not Canceled.")
            }
        }

        //checks the difference between the current inputed data and the initial state
        //Opens a "Are you sure you want to cancel mate?" option if any changes were made, and if they click yes then the form closes.
    }

    // To update the list title
    const handleFieldNameChange = (event) => {
        const { value } = event.target;

        onFNChange(value, sampleTypeIndex, fieldIndex)
    }
    return (
                <>
                    <InputWrap labelText='Field Name'>
                    <InputText value= {formData.field_name || ''} handleChange= {(e) => {handleStringInputChange('field_name', e); handleFieldNameChange(e)}} required/>
                    </InputWrap>
                    <InputWrap labelText='Help Text'>
                        <InputText value= {formData.help_text || ''} handleChange= {(e) => {handleStringInputChange('help_text', e)}}/>
                    </InputWrap>
                
                    <ButtonWrapper align='right'>
                        <Button text='Save' buttonStyle='secondary small' onChange={(e) => handleSave()}/>
                        <Button text='Cancel' buttonStyle='unstyled small' onChange={(e) => handleCancel()}/>
                    </ButtonWrapper>
                </>
    );
};

export default DateTimeSIT;