import React, { useState, useEffect } from 'react';
import { FormRow, Checkbox, RadioButton, Switch, ButtonWrapper, Button, Spacer, InputWrap, InputText, InputNumber } from '../../../../components';
import './TextSIT.scss';
import './SIT-styles.scss';

//from database, or empty if this is a 'create text' functionality. 


const TextSIT = ({ initialState, onSave, sampleTypeIndex, fieldIndex, onCancel, onFNChange, isAdding }) => {
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

    let updatedFormData = {};
    
    const handleRadioChange = (indexInState, e) => {
        if(formData[indexInState] === e.target.value){
            updatedFormData = {...formData};
            delete updatedFormData[indexInState];
        }else{
            updatedFormData = {
                ...formData,
                [indexInState]: e.target.value
            };
        }
        
        console.log(updatedFormData);
        
        
        setFormData(updatedFormData);
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
                console.log("Canceled from Text SIT where form is not edited")

                onCancel(sampleTypeIndex, fieldIndex)
            }
        }else{
            if(window.confirm("Are you sure you want to cancel?")){
                console.log("Canceled from the Text SIT")
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
        
        <div className='form-wrap'>
            <span className='form-section-heading'>Basic Fields</span>
            <InputWrap labelText='Field Name'>
                <InputText value= {formData.field_name || ''} handleChange= {(e) => {handleStringInputChange('field_name', e); handleFieldNameChange(e)}} required/>
            </InputWrap>
            <InputWrap labelText='Help Text'>
                <InputText value= {formData.help_text || ''} handleChange= {(e) => {handleStringInputChange('help_text', e)}}/>
            </InputWrap>

            <Spacer size='_055'/>
            <div className='sit-grid'>
            <InputWrap labelText='Minimum Length'>
                <InputNumber value={formData.min_length || ''} handleChange={(e) => {handleStringInputChange('min_length', e)}}/>
            </InputWrap>
            <InputWrap labelText='Maximum Length'>
                <InputNumber value={formData.max_length || ''} handleChange={(e) => {handleStringInputChange('max_length', e)}}/>
            </InputWrap>
            
            <RadioButton group={sampleTypeIndex+'-'+fieldIndex+'-'+'case'} labelText='Upper Case' value= {'upper'} onChange = {(e) => {handleRadioChange('case', e) }} checked={formData.case === 'upper'} />
            <RadioButton group={sampleTypeIndex+'-'+fieldIndex+'-'+'case'} labelText='Lower Case' value= {'lower'} onChange = {(e) => {handleRadioChange('case', e) }} checked={formData.case === 'lower'}/>
            <div className='span-2'>
                <RadioButton group={sampleTypeIndex+'-'+fieldIndex+'-'+'case'} labelText='Title Case' value= {'title'} onChange = {(e) => {handleRadioChange('case', e) }} checked={formData.case === 'title'}/>
            </div>
            </div>

            <Spacer size='_055'/>
            <Switch lhs={"This field"} rhs={"required"} argument={formData.required ? "is" : "is not"} checked= {formData.required || false} handleChange= {(e) => {handleCheckbox('required')}}/>
            
            <Spacer size='_055'/>
            <ButtonWrapper align='right'>
                <Button text='Save' buttonStyle='secondary small' onChange={(e) => handleSave()}/>
                <Button text='Cancel' buttonStyle='unstyled small' onChange={(e) => handleCancel()}/>
            </ButtonWrapper>
        </div>
    );
};

export default TextSIT;