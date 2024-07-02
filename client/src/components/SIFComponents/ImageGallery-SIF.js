import React, { useState, useEffect } from 'react';
import './ImageGallerySIF.scss';
import { Switch, Selector, RadioButton, Spacer, Button, ButtonWrapper, InputWrap, InputText, InputNumber } from '../../components';
import { ImageCopy } from '@carbon/icons-react';

const ImageGallerySIF = ({ onChange, fieldValues, initialState }) => {
    const [formData, setFormData] = useState(initialState || {});

    const handleFileSelect = (event) => {
        const files = event.target.files
        const filesArray =  Array.from(files)

        const fieldObject = {
            fieldName: fieldValues.field_name,
            value: filesArray
        }

        setFormData(imageUrls);
        onChange(fieldObject);
    }

    return (
        <>
            <span className='form-section-heading'>{fieldValues.field_name}</span>
            <Spacer size='_055'/>
            <div className='image-upload-wrap'>
                <input type='file' multiple accept='image/*, video/*' onChange={handleFileSelect}/> 
                <span> Drag & drop or click to <span className='hov-line'>browse your media</span></span>
                <ImageCopy className='icon'/>
            </div>
            
        </>
    );
};

export default ImageGallerySIF;