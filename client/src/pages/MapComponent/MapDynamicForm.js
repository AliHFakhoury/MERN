import React, { useEffect, useState } from 'react';
import { BoolSIF, CommentsNotesSIF, CoordinatesSIF, FilesSIF, ImageGallerySIF, LinkSIF, NumberSIF, OptionsSIF, ReferenceSIF, TextSIF, DateTimeSIF } from '../../components/SIFComponents/SIFindex.js'
import { Button } from '../../components/index.js';

/*


    ***** NO SAME NAMES FOR FIELDS IN SAMPLE TYPE K THANKS 3 RASE BRO
    * Remove all spaces from sample type field names
    * Drag & Drop functionality
    * Apply required functionality
*/

const MapDynamicForm = ({fields, onFormUpdate }) => {
    const [ formData, setFormData ] = useState({})
    
    useEffect(()=>{
        setFormData({})
    }, [fields]);
    
    const componentList = {
        'text': TextSIF,
        'number': NumberSIF,
        'option': BoolSIF,
        'notes': CommentsNotesSIF,
        'coordinates': CoordinatesSIF,
        'date': DateTimeSIF,
        'files': FilesSIF,
        'gallery': ImageGallerySIF, 
        'link': LinkSIF,
        // 'options': OptionsSIF,     V1
        // 'reference': ReferenceSIF, V1
    }

    const onInputChange = (valueObject, type) => {
        if(valueObject.value == ""){
            const updatedFormDataEmpty = {...formData}
           
            delete updatedFormDataEmpty[valueObject.fieldName]
            setFormData(updatedFormDataEmpty)
            onFormUpdate(updatedFormDataEmpty)
        }else{
            const objectToAdd = {
                value: valueObject.value,
                type: type
            }
            
            const updatedFormData = {...formData, [valueObject.fieldName]: objectToAdd}
    
            setFormData(updatedFormData)
            onFormUpdate(updatedFormData)
        } 
    }

    

    return (
        <>
            {fields.map((field, index) => {
                let Component = componentList[field.type]
                {/* console.log(field) */}
                return (
                    <div key={index}>
                        <Component onChange={(e)=>onInputChange(e, field.type)} fieldValues={field.values} field_name={field.values.field_name} componentData = {formData[field.values.field_name]} /> 
                    </div>
                )
            } )}
        </>
    )
}

export default MapDynamicForm