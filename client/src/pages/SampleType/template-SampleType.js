// react imports
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Spacer, ProjectSideNav, ProjectTopBar, DataTableComponent, LightBox, Breadcrumb, Button} from '../../components';
import './template-SampleType.scss';
import { ChevronRight } from "@carbon/icons-react";
import map from './map.png';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import DynamicForm from './components/DynamicForm/DynamicForm';
import FilesSIF from '../../components/SIFComponents/Files-SIF';

/*
    * Update existing samples/sample files
    * Fix add sample type files in project-settings
    * Loading states for everything ********* V1
    * 
*/

const InfoItem = (props) => {
    return (
      <div className='info-wrap'>
        <h3 className='info-header'>{props.infoHeader}</h3>
        <span className='info-text'>
          {props.infoText}
        </span>
      </div>
    );
  }

const TemplateSampleType = () => {
    const { project, updateProject } = useAppContext()
    const { sampleTypeIDParams } = useParams();
    const [ sampleType, setSampleType ] = useState({})
    const [ dataTableHeaders, setDataTableHeaders] = useState([])

    useEffect( () => {
        fetchSampleType()
    }, [])

    useEffect( () => {
        if(sampleType !== undefined && Object.keys(sampleType).length > 0){
            const project_id = sampleType.project_id
            updateProject(project_id)

            // console.log(sampleType)
            buildDataTableHeaders()
        }
    }, [sampleType])

    const fetchSampleType = async () => {
        await axios.get(`http://localhost:5000/controller/sampleType/getAllSamples/${sampleTypeIDParams}`).then( (response) => { 
            setSampleType(response.data[0])
            console.log(response.data[0])
        })
    }

    const handleAddSample = async (sample) => {
        // actually submit data
        // console.log(sample)
        const filesObj = {}
        const sampleObj = {}

        for(const key in sample){

            switch (sample[key].type) {
                case "files":
                    let files = sample[key].value
                    let fileNames = {
                        type: "files",
                        value: []
                    }

                    for(const file in files){
                        fileNames.value.push(files[file].name)
                    }


                    filesObj[key] = files
                    sampleObj[key] = fileNames

                    break;
                case "options":
                    console.log("Options exists in form")
                    break
                default:
                    sampleObj[key] = sample[key]
                    break;
            }
        }

        const addRequest = await axios.put(`http://localhost:5000/controller/sample/addSample/${sampleType.project_id}/${sampleType._id}`, sampleObj).then( (response) => { 
            updateSamplesInDT(response.data)

            const sampleId = response.data._id
            handleUpload(sampleType.project_id, sampleType._id, sampleId, filesObj)
        })
    }

    const updateSamplesInDT = (sample) => {
        console.log("updated")
        const updatedSampleType = {...sampleType}
        updatedSampleType.ST_Samples.push(sample)

        setSampleType(updatedSampleType)
    }

    const buildDataTableHeaders = () => {
        const headers = []
    
        for (let index = 0; index < sampleType.fields.length; index++) {
            const element = sampleType.fields[index]
            // console.log(element)
            const headerObject = {
                header: element.values.field_name,
                key: element.values.field_name,
                type: element.type
            }

            headers.push(headerObject)

        }

        setDataTableHeaders(headers)
    }

    const handleUpload = async (projectID, sampleTypeID, sampleID, filesObject ) => {  
        for(const key in filesObject){
            let formData = new FormData();
            let files = filesObject[key]

            for (const file of files) {
                formData.append('files', file);
            }

            const request = await axios.post(`http://localhost:5000/controller/sample/upload/${projectID}/${sampleTypeID}/${sampleID}/${key}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data); // Handle the server response here
            })
            .catch((error) => {
                console.error(error);
            });
            
            
        }
    }

    return (
        <>
            <ProjectSideNav />
                <div className="project-page-wrapper">
                    <ProjectTopBar />

                    {/* Only content below this should be left in the template. Remove Everything above this line */}
                    <>
                        <Breadcrumb>
                            <a>{ project && project.project_name }</a>
                            <ChevronRight className='arrow'/>
                            <a>{ sampleType && sampleType.sampleTypeName }</a>

                            {/* <ChevronRight className='arrow'/> */}
                            {/* <a>FL-04-18 ?</a> */}

                        </Breadcrumb>
                        
                        
                        <Spacer size='_04'/>
                        
                        <div className='sample-name-wrapper'>
                            <h1>{ sampleType && sampleType.sampleTypeName }</h1>
                        </div>

                        {/* <div className='sample-name-wrapper'>
                            <h1>FL-04-18</h1>
                            <a className='id-link'>DJ83KA23WM08</a>
                        </div> */}


                        <Spacer size='_08'/>
                        <div className='top-info-grid'>
                            
                            {/* Static for now */}
                            {/* <div className='inner-info-grid'>
                                <InfoItem infoHeader="Referenced Items" infoText="63 boxes"/>
                                <InfoItem infoHeader="Creation Date" infoText="2018/08/02"/>
                                <InfoItem infoHeader="Last Updated" infoText="2 hours ago"/>
                                <InfoItem infoHeader="Referenced In" infoText="FL-04-18 BOXES 1-63"/>
                            </div> */}
                            
                            {/* Image */}
                            {/* <div className='info-map-wrapper'>
                                <img src={map} alt='map of nfld'/>
                            </div> */}

                        </div>
                        <Spacer size='_08'/>
                        <>
                        {/* <h3>Image Gallery</h3> */}
                        <Spacer size='_04'/>
                        
                        {/* <LightBox>
                            <img src='http://unsplash.it/300/300' alt='sample image'/>
                        </LightBox> */}
                        
                        <Spacer size='_08'/>
                        </>

                        {/* <h3>Referenced Core Boxes</h3>
                        <Spacer size='_04'/> */}

                        { sampleType.fields && <DynamicForm fields={sampleType.fields} addSample={handleAddSample}/>}

                        <DataTableComponent headersProp={dataTableHeaders} rowDataProp={sampleType}/>
                    </>


                </div>
        </>
    );
};

export default TemplateSampleType;