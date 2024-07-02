import React, { useState, useEffect } from 'react';
import './BoolSIT.scss';
import { BoolSelector, Switch, Spacer, Button, ButtonWrapper, InputWrap, InputText } from '../../../../components';

const BoolSIT = ({ initialState, onSave, sampleTypeIndex, fieldIndex, onCancel, onFNChange, isAdding }) => {
    const [formData, setFormData] = useState(initialState || {});
    //Possibly create a new array that has the text values, ORRRRR have that be an object and the key is the text is / is not but the value is ["is", "is not"] FUCKING GENIUS MATE THANKS

    const thisThatOptions = {
        "is / is not": ["is", "is not"],
        "has / doesn't have": ["has", "doesn't have"],
        "contains / doesn't contain": ["contains", "doesn't contain"],
        "includes / doesn't include": ["includes", "doesn't include"]
    };
    
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

    const handleSelectorChange = (indexInState, event) => {
        const { value } = event.target;
        
        const valueToArray = value.split(",");

        console.log(valueToArray);

        const updatedFormData = {
            ...formData,
            [indexInState]: valueToArray
        };
        
        setFormData(updatedFormData);
    }

    const handleCheckbox = (indexInState) => {
        const updatedFormData = {
            ...formData,
            [indexInState]: !formData[indexInState]
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
                onCancel(sampleTypeIndex, fieldIndex)
            }
        }else{
            if(window.confirm("Are you sure you want to cancel?")){
                onCancel(sampleTypeIndex)
            }else{
                console.log("Form Not Canceled.")
            }
        }

    }

    // To update the list header
    const handleFieldNameChange = (event) => {
        const { value } = event.target;

        onFNChange(value, sampleTypeIndex, fieldIndex)
    }

    return (
        <div className='form-wrap'>
            <span className='form-section-heading'>Basic Fields</span>

            <InputWrap labelText='Field Name'>
                <InputText value= {formData.field_name || ''} handleChange= {(e) => {handleStringInputChange('field_name', e); handleFieldNameChange(e)}} required/>
            </InputWrap>
            <InputWrap labelText='Help Text'>
                <InputText value= {formData.help_text || ''} handleChange= {(e) => {handleStringInputChange('help_text', e)}}/>
            </InputWrap>
            
            <Spacer size='_055'/>
            <InputWrap labelText='This' info='This stands for the object in question. EX: Core'>
                <InputText value= {formData.lhsText || ''} handleChange= {(e) => {handleStringInputChange('lhsText', e)}}/>
            </InputWrap>
            <InputWrap labelText='Argument' info='The meaning of the statement. EX: Core contains / does not contain'>
                <BoolSelector options={thisThatOptions} initialValue={formData.argument || ""} onChange={(e) => handleSelectorChange("argument", e)} />
            </InputWrap>
            <InputWrap labelText='That' info='That stands for the question being asked. EX: Core contains / does not contain visable gold'>
                <InputText value= {formData.rhsText || ''} handleChange= {(e) => {handleStringInputChange('rhsText', e)}}/>
            </InputWrap>

            <Spacer size='_055'/>
            <ButtonWrapper align='right'>
                <Button text='Save' buttonStyle='secondary small' onChange={(e) => handleSave()}/>
                <Button text='Cancel' buttonStyle='unstyled small' onChange={(e) => handleCancel()}/>
            </ButtonWrapper>
        </div>
    );
};

export default BoolSIT;