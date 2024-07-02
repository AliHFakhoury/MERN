// react imports
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { Grid, Column } from 'carbon-components-react';
import {ChevronRight} from '@carbon/icons-react';

// app context
import { initialAppContextState, useAppContext } from '../../context/appContext';

// our components
import { InputContainer, Navbar, Tabs, Spacer, Breadcrumb } from '../../components/index.js'
import TabsMenu from './components/TabsMenu'


// project settings styles
import './styling/ProjectSettings.scss'

// import Navbar from '../../components/Navbar/Navbar.js';

/*
    - Update all components to render based on whether the project value is set or not.
*/

const TemplateProjectSettings = () => {
    const { projectIdParams } = useParams();
    const { updateProject, project } = useAppContext();
    const sampleTypesURL = "/projectDashboard/"+project._id;

    useEffect(() => {        
        if(projectIdParams !== undefined){
            updateProject(projectIdParams)
        }
    }, [])

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