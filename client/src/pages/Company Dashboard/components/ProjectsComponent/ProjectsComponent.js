import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AddProjectForm from '../Add Form/AddProjectForm';
import ProjectOnGrid from '../ProjectsGrid/ProjectOnGrid';
import '../../styling/ProjectSettings.scss';


import { useDispatch, useSelector } from 'react-redux';
import { load_projects, toggle_adding_project, test_action, test_action2 } from '../../../../context/actions';

const ProjectsComponent = () => {
    const dispatch = useDispatch();


    const company_id = useSelector( (state) => state.projectReducer.company_id);
    const projects = useSelector( (state) => state.projectReducer.projects);
    const addingProject = useSelector( (state) => state.projectReducer.addingProject);

    const userID = "6683352cc707c3b57c5a1caa";
    
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        await axios.post("http://localhost:5000/controller/project/getAllProjects", { userID: userID}).then((response) => {
            console.log(response.data);
            dispatch(load_projects(response.data));
        }).catch((error) => {
            // Build error handling after everything
            console.log(error);
        });
    }

    const handleProjectCreation = async (formData) => {
        const project = {
            project_name: formData.project_name,
            project_type: formData.project_type || "production",
            // company_id: companyID,
            project_creator: userID
        };

        await axios.post("http://localhost:5000/controller/project/createProject", project).then((result)=>{
            dispatch(toggle_adding_project(false));

            project._id = result.data._id;
        });

        dispatch(load_projects([...projects, project]));
    }

    return (
        <>
            { addingProject ? (
                <div className='w-layout-grid settings-sample-type-field-options-grid button-wrapper'>       
                    <AddProjectForm companyID={company_id} onSave={handleProjectCreation}/>
                </div>
            ) : (
                <>

                </>
            )}       
            
            <div className='projects-grid'>
                {projects.map((project) => (
                    <ProjectOnGrid project={project} key={project._id}/>
                ))}
            </div>
        </>
    );
}

export default ProjectsComponent;


/*
    - Create an Add Project Form save function that sends the request. DONE
    - Update the html so that we can see the projects. DONE
    - Allow project editing
    - Update the sample types tab so that it's actually adding the sample type IDs to the project it's on.
    - GG well played
*/