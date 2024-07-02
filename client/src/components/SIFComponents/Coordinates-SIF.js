import React, { useState, useEffect } from 'react';
import './CoordinatesSIF.scss';
import './SIF-styles.scss';
import { Selector, Switch, Spacer, Button, ButtonWrapper, InputText, InputWrap, InputNumber } from '../../components';

const CoordinatesSIF = ({ onChange, fieldValues, componentData }) => {
    const [formData, setFormData] = useState({});

    useEffect(()=> {
        if(componentData){
            console.log(componentData)
            setFormData(componentData.value)
        }else{
            setFormData({})
        }

    }, [componentData])

    const onInputEdit = (e, field) => {
        const value = e.target.value

        const regex = /^-?(\d+(\.?\d*)?)?$/
        console.log(regex.test(value))
        
        if(regex.test(value)){
            const updatedFormData = {...formData, [field]: value, coordinate_type: fieldValues.coordinate_type}

            setFormData(updatedFormData)
    
            const fieldObject = {
                fieldName: fieldValues.field_name,
                value: updatedFormData,
            }
    
            onChange(fieldObject); 
        }else{
            console.log("Wrong input")
        }

        
    }

    //Let value equal users input
    function latHeading(value) {
        if (value < 0) {
          return "S";
        } else {
          return "N";
        }
      }
    function longHeading(value) {
        if (value < 0) {
          return "W";
        } else {
          return "E";
        }
      }


    const coordFormat = fieldValues.coordinate_type;

    let coordContent = {}

    if(coordFormat === 'DMS'){
        coordContent = (
            <> 
            <label className='label-larger'>Latitude</label>
            <Spacer size='_04'/>
            <div className='sif-grid col-3'>
                <InputWrap labelText='Degrees'>
                    <InputText placeholder='49°' value={formData['lat_degrees'] || ""} handleChange={(e)=>{onInputEdit(e, 'lat_degrees')}}/>
                </InputWrap>
                <InputWrap labelText='Minutes'>
                    <InputText placeholder="53'" value={formData['lat_minutes'] || ""} handleChange={(e)=>{onInputEdit(e, 'lat_minutes')}}/>
                </InputWrap>
                <InputWrap labelText='Seconds'>
                    <InputText placeholder="18.9636''" paddingRight='calc(0.5em + 1em + 0.625em)' value={formData['lat_seconds'] || ""} handleChange={(e)=>{onInputEdit(e, 'lat_seconds')}}/>
                
                    {/* lat and long heading here should take its value from the degrees input. But be displayed in the seconds inputwrap */}

                    <div className='coord-pos'>
                        <span className='pos-wrap'>
                            {latHeading(50)}
                        </span>
                    </div>
                </InputWrap>
            </div>
            <Spacer size='_04'/>
            <label className='label-larger'>Longitude</label>
            <Spacer size='_04'/>
            <div className='sif-grid col-3'>
                <InputWrap labelText='Degrees'>
                    <InputText placeholder='55°' value={formData['lon_degrees'] || ""} handleChange={(e)=>{onInputEdit(e, 'lon_degrees')}}/>
                </InputWrap>
                <InputWrap labelText='Minutes'>
                    <InputText placeholder="37'" value={formData['lon_minutes'] || ""} handleChange={(e)=>{onInputEdit(e, 'lon_minutes')}}/>
                </InputWrap>
                <InputWrap labelText='Seconds'>
                    <InputText placeholder="15.8412''" paddingRight='calc(0.5em + 1em + 0.625em)' value={formData['lon_seconds'] || ""} handleChange={(e)=>{onInputEdit(e, 'lon_seconds')}}/>
                    <div className='coord-pos'>
                        <span className='pos-wrap'>
                            {longHeading(50)}
                        </span>
                    </div>
                </InputWrap>
            </div>
        </>
       );
    }else{
        // Decimal Degrees
        coordContent = (
            <> 
                {/* If lat is < 0 display S. If > or = 0 display N. */}
                <div className='sif-grid'>
                    <InputWrap labelText='Latitude'>
                        <InputText placeholder='49.888601' paddingRight='calc(0.5em + 1em + 0.625em)' value={formData['latitude'] || ""} handleChange={(e)=>{onInputEdit(e, 'latitude')}}/>
                        <div className='coord-pos'>
                            <span className='pos-wrap'>
                                {latHeading(-50)}
                            </span>
                        </div>
                    </InputWrap>
                {/* If long is < 0 display W. If > or = 0 display E. */}
                    <InputWrap labelText='Longitude'>
                        <InputText placeholder='-55.621067' paddingRight='calc(0.5em + 1em + 0.625em)' value={formData['longitude'] || ""} handleChange={(e)=>{onInputEdit(e, 'longitude')}}/>
                        <div className='coord-pos'>
                            <span className='pos-wrap'>
                                {longHeading(50)}
                            </span>
                        </div>
                    </InputWrap>
                </div>
            </>
       );
    }

    return (
        <>
            <span className='form-section-heading'>{fieldValues.field_name}</span>
            <Spacer size='_055'/>
            {coordContent}
        </>
    );
};

export default CoordinatesSIF;