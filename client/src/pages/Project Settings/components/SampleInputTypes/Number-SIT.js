import React, { useState, useEffect } from 'react';
import './NumberSIT.scss';
import './SIT-styles.scss';
import { FormRow, Checkbox, Selector, RadioButton, Spacer, Button, ButtonWrapper, InputWrap, InputText, InputNumber, Switch } from '../../../../components';

const NumberSIT = ({ initialState, onSave, sampleTypeIndex, fieldIndex, onCancel, onFNChange, isAdding }) => {
    const [formData, setFormData] = useState(initialState || {});
    const symbolOptions = ["*","%","A","B"];
    const unitOptions = {
        "Distance":["km","m","cm", "mm", "in", "ft", "yd"],
        "Weight":["kg","g","mg", "lb", "t"],
        "Temperature":["k","f","c"]
    }

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

    const handleRadioChange = (indexInState, e) => {
        let updatedFormData = {};

        if(formData[indexInState] === e.target.value){
            updatedFormData = {...formData};
            delete updatedFormData[indexInState];
            
            console.log(updatedFormData);
        }else{
            updatedFormData = {
                ...formData,
                [indexInState]: e.target.value
            };        
        }

        setFormData(updatedFormData);
    }

    const handleSelectorChange = (selector, e) => {
        const updatedFormData = {
            ...formData,
            [selector]: e.target.value
        };

        setFormData(updatedFormData)
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
            <div className='sit-grid'>
                <InputWrap labelText='Minimum Value'>
                    <InputNumber value={formData.min_value || ''} handleChange={(e) => {handleStringInputChange('min_value', e)}}/>
                </InputWrap>
                <InputWrap labelText='Maximum Value'>
                    <InputNumber value={formData.max_value || ''} handleChange={(e) => {handleStringInputChange('max_value', e)}}/>
                </InputWrap>
                
                <div className='span-2'>
                    <Checkbox labelText='Allow Negative Numbers' checked= {formData.negative || false} handleChange= {(e) => {handleCheckbox('negative')}}/>
                    <Spacer size='_04'/> 
                </div>

                <RadioButton group={'format'+fieldIndex} labelText='Integer' value= {'Integer'} onChange = {(e) => {handleRadioChange('format', e) }} checked={formData.format === 'Integer'} />
                <RadioButton group={'format'+fieldIndex} labelText='Decimal' value= {'Decimal'} onChange = {(e) => {handleRadioChange('format', e) }} checked={formData.format === 'Decimal'}/>
                <div className='span-2'>
                    <RadioButton group={'format'+fieldIndex} labelText='Any' value= {'Any'} onChange = {(e) => {handleRadioChange('format', e) }} checked={formData.format === 'Any'}/>
                    <Spacer size='_04'/> 
                </div>

                <InputWrap labelText='Symbol Prefix'>
                    <Selector options={symbolOptions} initialValue={formData.symbol || ""} onChange={(e) => {handleSelectorChange("symbol", e)}}/>
                </InputWrap>
                <InputWrap labelText='Unit Suffix'>
                    <Selector options={unitOptions} initialValue={formData.unit || ""} onChange={(e) => {handleSelectorChange("unit", e)}} grouped={true}/>
                </InputWrap>
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

export default NumberSIT;