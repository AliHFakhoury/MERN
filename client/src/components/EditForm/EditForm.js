import React, { useState } from "react";
import { TextInput, InputNumber } from "../"


const EditForm = ({sampleTypeIndex, formFields, onSave}) => {
    const [formData, setFormData] = useState(formFields);

    const loadInputComponent = (type, value) => {
        //Only thing to add to the checkbox component will be the handle on click function to toggle the checked value

        if( type == "checkbox"){
            // <Checkbox checked={value} fieldName={wtvr} group = {wtvr}
            return <input type="checkbox" checked={value}/>
        }
    }

    const handleChange = (fieldIndex, event) => {
        const { value } = event.target;
        
        const updatedObject = {
            ...formData,
            [fieldIndex]: {
                ...formData[fieldIndex],
                value: value
            }
        };

        setFormData(updatedObject);
    };

    const handleSave = () => {
        onSave(formData, sampleTypeIndex);
    }

    const handleReset = () => {
        console.log(formFields)

        setFormData( () => {      
            return {...formFields}
        })
    }

    return (
        <form>
            <div key={sampleTypeIndex}>

            {formFields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                    <label>{field.name}</label>
                    <br></br>
                    
                    {loadInputComponent(field.type, true)}

                    {/* <input name={formData[fieldIndex].name} type={formData[fieldIndex].type} value={formData[fieldIndex].value} onChange={(e) => { handleChange(fieldIndex, e) }}></input> */}
                </div>
            ))}

            </div>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={handleReset}>Reset Edit Form</button>
      </form>
    )
}

export default EditForm;