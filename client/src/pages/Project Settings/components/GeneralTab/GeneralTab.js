import React, { useEffect, useState } from 'react';
import Input from '../../../../components/InputText/TextInput';
import { useAppContext } from '../../../../context/appContext';
import { Button, InputWrap, Selector } from '../../../../components';
import axios from 'axios';

const GeneralTab = () => {
    const { updateProjectInState, project } = useAppContext(); 
    
    const [ formData, setFormData ] = useState({})

    const project_types = [
        "Exploration",
        "Production"
    ]

    useEffect( () => {
        if(Object.keys(project).length > 0 && project !== undefined){
            setFormData({
                project_name: project.project_name,
                project_type: project.project_type
            })
        }
    }, [project])


    const handleNameOnChange = (event) => {
        const { value } = event.target;
        
        const updatedFormData = { ...formData, project_name: value}

        setFormData(updatedFormData)
    }

    const handleSelectorChange = (event) => {
        const { value } = event.target
        
        const updatedFormData = { ...formData, project_type: value}

        setFormData(updatedFormData)
    }

    const handleSaveButton = async () => {
        console.log(formData)

        const response = await axios.put(`http://localhost:5000/controller/project/updateProject/${project._id}`, formData);    
        updateProjectInState(formData)
    }


    if(Object.keys(formData).length > 0 && formData !== undefined){
        const initialSelectorValue = formData.project_type.charAt(0).toUpperCase() + formData.project_type.slice(1)

        return (
            <>
                <h2>General Settings</h2>
                <InputWrap>
                    <Input type={"text"} value={ formData.project_name } handleChange={(e) => handleNameOnChange(e)}/>
                </InputWrap>
                
                {/* <InputWrap labelText='Project Type'>
                    <select id="options" value={initialSelectorValue} onChange={(e) => handleSelectorChange(e)} className="custom-select">
                        {project_types.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </InputWrap> */}

                <Button text={"Save"} buttonStyle={"primary"} onChange={handleSaveButton}/>
            </>
        )
    }else{
        return (
            <>
                LOADING
            </>
        )
    }

    
}

export default GeneralTab