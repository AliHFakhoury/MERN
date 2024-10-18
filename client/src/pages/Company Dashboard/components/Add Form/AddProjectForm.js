import React, { useState, useEffect } from 'react';
import { FormRow, Checkbox, RadioButton, Switch, ButtonWrapper, Button, Spacer, InputWrap, InputText, InputNumber, Modal } from '../../../../components';
import './AddProjectForm.scss';

import { useDispatch, useSelector } from 'react-redux'
import { toggle_adding_project } from '../../../../context/actions'

const AddProjectForm = ({ onSave }) => {
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();
    const addingProject = useSelector((state) => state.projectReducer.addingProject)
  

    const handleStringInputChange = (indexInState, event) => {
        const { value } = event.target;

        const updatedFormData = {
            ...formData,
            [indexInState]: value
        };

        setFormData(updatedFormData);

    }
     
    const handleSave = () => {
        if(Object.keys(formData).length){
            if(formData["project_name"] != "" && formData["project_type"] != "" ){
                onSave(formData)
            }else{
                console.log("nothing")
            }
        }else{
            alert("Add something mate")
        }
    
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

        if(window.confirm("Are you sure you want to cancel?")){
            console.log("Canceled from the Add Project Form")
            dispatch(toggle_adding_project(false))
        }else{
            console.log("Form Not Canceled.")
        }

    }
    
    return (
        <>
            <Modal modalTitle='New Project' onCloseButton = {handleCancel}>
                <div className='form-wrap'>
                    <InputWrap labelText='Project Name'>
                        <InputText value= {formData.project_name || ''} handleChange= {(e) => {handleStringInputChange('project_name', e);}} required/>
                    </InputWrap>
                
                    {/* <Spacer size='_055'/> */}
                    
                    {/* <label className='input-label'>Project Type</label>
                    <Spacer size='_055'/>
                    <div className='sit-grid'>
                        <RadioButton group={'projectType'} labelText='Exploration' value= {'exploration'} onChange = {(e) => {handleRadioChange('project_type', e) }} checked={formData.project_type === 'exploration'} />
                        <RadioButton group={'projectType'} labelText='Production' value= {'production'} onChange = {(e) => {handleRadioChange('project_type', e) }} checked={formData.project_type === 'production'}/>
                    </div> */}

                    <Spacer size='_055'/>
                    
                    {/* <label className='input-label'>Project Plan</label>
                    <Spacer size='_055'/>
                    <div className='sit-grid'>
                        <RadioButton group={'projectPlan'} labelText='Starter' value= {'starter'} onChange = {(e) => {handleRadioChange('project_type', e) }} checked={formData.project_type === 'exploration'} />
                        <RadioButton group={'projectPlan'} labelText='Basalt' value= {'basalt'} onChange = {(e) => {handleRadioChange('project_type', e) }} checked={formData.project_type === 'exploration'} />
                        <RadioButton group={'projectPlan'} labelText='Granite' value= {'granite'} onChange = {(e) => {handleRadioChange('project_type', e) }} checked={formData.project_type === 'production'}/>
                        <RadioButton group={'projectPlan'} labelText='Obsidian' value= {'obsidian'} onChange = {(e) => {handleRadioChange('project_type', e) }} checked={formData.project_type === 'production'}/>
                    </div> */}


                    <Spacer size='_055'/>
                    <ButtonWrapper align='right'>
                        <Button text='Cancel' buttonStyle='unstyled small' onChange={(e) => handleCancel()}/>
                        <Button text='Create Project' buttonStyle='primary small' onChange={(e) => handleSave()}/>
                    </ButtonWrapper>
                </div>
            </Modal>
        </>
    );
};

export default AddProjectForm;