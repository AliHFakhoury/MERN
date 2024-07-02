import React, { useState, useEffect } from 'react';
import './SampleTypeForm.scss';
import { Spacer, Button, ButtonWrapper, InputWrap, InputText } from '../../../../components';

const SampleTypeForm = ({ initialState, onSave, onCancel, onSNChange, isAdding }) => {
    const [formData, setFormData] = useState(initialState || { "sampleTypeName": "", "description": "" })

    useEffect(()=> {
        if(initialState){
            setFormData(initialState)
        }
    }, [initialState])

    const handleSave = () => {
        if(isAdding){
            if(Object.keys(formData).length){
                if(formData["sampleTypeName"] != "" || formData["description"] != "" ){
                    console.log("something exists")
                    onSave(formData)
                }else{
                    console.log("nothing")
                }
            }else{
                alert("Add something mate")
            }
        }else{
            if(formData["sampleTypeName"] != ""){
                console.log("something exists")
                onSave(formData)
            }else{
                console.log("nothing")
            }
        }

    }

    const handleCancel = () => {
        console.log(formData)
        console.log(initialState)
        
        if(!isAdding){
            const isFormEdited = Object.values(formData).some((value, index) => {
                return value !== Object.values(initialState)[index];
            });
            
        
            if(isFormEdited){
                console.log("Form prompted to cancel")
                if(window.confirm("Are you sure you want to cancel?")){
                    console.log("Form Canceled.")
                    setFormData(initialState)
                    onCancel(initialState)
                }else{
                    console.log("Form Not Canceled.")
                }
            }else{
                console.log("In Cancel")
                onCancel(initialState)
            }
        }else{
            if(window.confirm("Are you sure you want to cancel?")){
                onCancel(initialState)
            }else{
                console.log("Form Not Canceled.")
            }
        }

    }

    // To update the list header
    const handleSNChange = (event) => {
        const { value } = event.target;
        onSNChange(value)
    }

    const handleStringInputChange = (indexInState, event) => {
        const { value } = event.target;
        
        const updatedFormData = {
            ...formData,
            [indexInState]: value
        };
        
        setFormData(updatedFormData); 
    }

    return (
        <div className='form-wrap'>
            <span className='form-section-heading'>Sample Type Name</span>

            <InputWrap labelText='Sample Type Name'>
                <InputText value= {formData.sampleTypeName || ''} handleChange= {(e) => {handleStringInputChange('sampleTypeName', e); handleSNChange(e)}}/>
            </InputWrap>

            <InputWrap labelText='Description'>
                <InputText value= {formData.description || ''} handleChange= {(e) => {handleStringInputChange('description', e);}}/>
            </InputWrap>

            <Spacer size='_055'/>
            <ButtonWrapper align='right'>
                <Button text='Save' buttonStyle='secondary small' onChange={(e) => handleSave()}/>
                <Button text='Cancel' buttonStyle='unstyled small' onChange={(e) => handleCancel()}/>
            </ButtonWrapper>
        </div>
    );
};

export default SampleTypeForm;