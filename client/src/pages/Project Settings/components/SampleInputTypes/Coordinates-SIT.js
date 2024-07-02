import React, { useState, useEffect } from 'react';
import './CoordinatesSIT.scss';
import './SIT-styles.scss';
import { FormRow, Selector, Switch, Spacer, Button, ButtonWrapper, InputText, InputWrap } from '../../../../components';

const CoordinatesSIT = ({ initialState, onSave, sampleTypeIndex, fieldIndex, onCancel, onFNChange, isAdding }) => {
    const [formData, setFormData] = useState(initialState || {});
    const coordinate_type = {
        "DMS": "Degrees, minutes, seconds (DMS)", 
        "DD" : "Decimal degrees (DD)"
    };

    const coord_precision = {
        "1": "1.0 (1)",
        "2": "1.00 (2)",
        "3": "1.000 (3)",
        "4": "1.0000 (4)",
        "6": "1.000000 (6)",
        "8": "1.00000000 (8)", 
        "10": "1.0000000000 (10)",
        "12": "1.000000000000 (12)"
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
                <InputWrap labelText='Coordinates Format'>
                    <Selector options={coordinate_type} objectOptions={true} initialValue={formData.coordinate_type || ""} onChange={(e) => {handleSelectorChange("coordinate_type", e)}} />
                </InputWrap>
                <InputWrap labelText='Precision'>
                    <Selector options={coord_precision} objectOptions={true} initialValue={formData.coord_precision || ""} onChange={(e) => {handleSelectorChange("coord_precision", e)}} />
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

export default CoordinatesSIT;