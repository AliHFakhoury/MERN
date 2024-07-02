import React, { useState, useEffect } from 'react';
import './DateTimeSIF.scss';
import { InputWrap, InputText, ButtonWrapper, Button, Switch, Spacer, InputNumber} from '../../components';
import { Calendar } from "@carbon/icons-react";
import { DatePicker, DatePickerInput, DatePickerSkeleton } from 'carbon-components-react';

const DateTimeSIF = ({ onChange, field_name, componentData }) => {
    const [formData, setFormData] = useState("");

    useEffect(()=> {
        if(componentData){
            console.log(componentData)
            setFormData(componentData.value)
        }else{
            setFormData("")
        }

    }, [componentData])

    const handleDateChange = (date) => {
        const formattedDate = date[0].toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        
        const fieldObject = {
            fieldName: field_name,
            value: formattedDate
        }

        setFormData(date)
        onChange(fieldObject)
    }

    return (
        <>
            <span className='form-section-heading'>{field_name}</span>
            
            <InputWrap labelText=''>

                {/* <InputText placeholder={fieldValues.dateFormat} handleChange={handleStringInputChange} value={formData} paddingLeft='calc(0.5em + 1em + 0.625em)'/> */}
                <div>
                    <DatePicker datePickerType="single" onChange={handleDateChange} value={formData}>
                        {/* <DatePickerInput placeholder="mm/dd/yyyy" labelText="Date Picker label" id="date-picker-single" size="md" /> */}
                        <DatePickerInput
                            id="date-picker-input"
                            placeholder="mm/dd/yyyy"
                            labelText="Select a Date"
                            readOnly
                        /> 
                    </DatePicker>
                </div>
                {/* <div className='input-icon-wrap'>
                    <Calendar className='input-icon'/>
                </div> */}
            </InputWrap>
        </>
    );
};

export default DateTimeSIF;