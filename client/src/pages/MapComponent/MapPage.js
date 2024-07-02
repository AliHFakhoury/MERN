import React, { useEffect, useState } from 'react'
import MapComponent from './MapComponent'
import { Select, SelectItem } from '@carbon/react'
import { useAppContext } from '../../context/appContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MapDynamicForm from './MapDynamicForm'

const MapPage = () => {
    const [ coordinates, setCoordinates ] = useState([
        [-52.712830, 47.560539],
        [-52.712860, 47.480539],
        [-52.912890, 47.480539],
    ]);

    const { projectIdParams } = useParams();
    const { updateProject, project } = useAppContext();
    const [ sampleTypes, setSampleTypes ] = useState([]);
    const [ selectedSampleType, setSelectedSampleType] = useState({fields: []});
    const [ formData, setFormData ] = useState({})


    useEffect(() => {        
        console.log("projectIdParams");
        if(projectIdParams !== undefined){

            updateProject(projectIdParams)
        }
    }, []);
    
    useEffect( () => {
        if(project !== undefined && Object.keys(project).length > 0){
            fetchSampleTypes()
        }
    }, [project])

    const sampleTypeSelected = (e) => {
        const STIndex = e.target.value;
        setSelectedSampleType(sampleTypes[STIndex]);
        console.log(sampleTypes[STIndex]);
    }
    
    const fetchSampleTypes = async () => {
        const sampleTypeIds = project.sample_type_ids
        await axios.post(`http://localhost:5000/controller/sampleType/getAllSamplesWithLatest`, sampleTypeIds).then( (response) => {
            setSampleTypes(response.data)
        })
        
    }
    
    const onFormUpdate = (formData) => {
        console.log(formData)
        console.log("Shit got updated");
        setFormData(formData)
    }

    const onSketchCreation = () => {
        console.log("Running after sketch got created")
        console.log("Clear form data")
        console.log(formData)
        setFormData({})
    }

    return (
        <>
            <h1>Map</h1>

            <Select inline id="select-1" labelText="Select" onChange={(e) => {sampleTypeSelected(e)}}>
                <SelectItem value="" text="" />
                
                { sampleTypes.map((sample, index) => {
                    return <SelectItem key={index} value={index} text={sample.sampleTypeName} />
                })}

            </Select>
            
            <MapDynamicForm fields={!selectedSampleType ? [] : selectedSampleType.fields} onFormUpdate={onFormUpdate}/>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <MapComponent coordinates={ coordinates } formData={formData} onSketchCreation={(e)=>{onSketchCreation()}}/>
        </>
    )
}

export default MapPage