// react imports
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { Grid, Column } from 'carbon-components-react';
import {ChevronRight} from '@carbon/icons-react';

// our components
import { InputContainer, Navbar, Tabs, Spacer, Breadcrumb } from '../../components/index.js'
import TabsMenu from './components/TabsMenu'
import axios from "axios";


// project settings styles
import './styling/ProjectSettings.scss'

// import Navbar from '../../components/Navbar/Navbar.js';

/*
    - Update all components to render based on whether the project value is set or not.
*/

const TemplateProjectSettings = () => {
    const { projectIdParams } = useParams();
    const [ project, setProject ] = useState({})
    const sampleTypesURL = "/projectDashboard/"+projectIdParams;

    useEffect(() => {        
        if(projectIdParams !== undefined){
            loadProject();
        }
    }, [])


    const loadProject = async () => {
        await axios.get(`http://localhost:5000/controller/project/getProject/${projectIdParams}`).then( (response) => {
            console.log(response) 
            if(response.status === 200){
                setProject(response.data)
            }
        })
    }

    return (
        <div>
            <Navbar />
            <section className='page-section'>
                <div className='container'>
                    <Breadcrumb className='breadcrumb-wrap'>
                        <a href={sampleTypesURL}>
                            { (project && Object.keys(project).length > 0) &&  project.project_name }
                        </a>
                        <ChevronRight className='arrow'/>
                        <a href='/projects'>
                            Project Settings
                        </a>

                    </Breadcrumb>
                    <h1> {(project && Object.keys(project).length > 0) && project.project_name.toUpperCase() }</h1>
                    <Spacer size='_page-margin-normal'/>
                    <TabsMenu />
                </div>
            </section>
            
        </div>
    );
};

export default TemplateProjectSettings;