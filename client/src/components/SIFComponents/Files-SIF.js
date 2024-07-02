import React, { useState, useEffect } from 'react';
import './FilesSIF.scss';
import { Spacer, Button, ButtonWrapper, InputText, InputWrap, Switch, InputNumber } from '../../components';
import { DocumentAdd } from "@carbon/icons-react";

const AddedFile = (({ file }) => (
    <div className='file-wrap'>
        {/* <div className='file-icon'/> */}
        <div className='file-info-wrap'>
            <div className='file-name-wrap'>
                <span className='file-name'>{file.name}</span>
                <span className='file-size'>{(file.size/(1024*1024)).toFixed(3)} MB</span>
            </div>
            {/* <progress className='progress-upload' value="32" max="100">32</progress>
            <div className='file-complete-wrap'>
                <span className='file-complete'>Done</span>
                <span className='file-remove'>Remove File</span>
            </div> */}
        </div>
    </div>
  ));


const FilesSIF = ({ onChange, fieldValues, initialState }) => {
    const [formData, setFormData] = useState(initialState || []);

    const handleFileSelect = (event) => {
        const files = event.target.files
        const filesArray = [...files]

        const fieldObject = {
            fieldName: fieldValues.field_name,
            value: filesArray
        }

        setFormData(filesArray);

        onChange(fieldObject);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    // ADD THIS TO THE INPUT / WRAP DIV
    // ADD CLASS 'drag' TO 'file-upload-wrap' WHEN DRAGGING A FILE INTO THE BROWSER

    return (
            <>
                <span className='form-section-heading'>{fieldValues.field_name}</span>
                <Spacer size='_055'/>
                <div className='file-upload-wrap '>
                    <input type='file' multiple onChange={handleFileSelect}/>
                    <span> Drag & drop or click to <span className='hov-line'>browse your files</span></span>
                    <DocumentAdd className='icon'/>
                </div>

                {formData.map((file, index) => {
                    {/* console.log(file) */}

                    return (
                        <div key={index}>
                            <div className='file-list-wrap'>
                                <AddedFile file={file}/>
                            </div>
                        </div>
                    )
                } )}
            </>
    );
};

export default FilesSIF;