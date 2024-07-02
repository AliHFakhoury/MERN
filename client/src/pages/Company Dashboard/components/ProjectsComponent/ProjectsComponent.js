import React, { useContext, useEffect, useState } from 'react'
import { useAppContext } from '../../../../context/appContext';

import axios from 'axios';
import AddProjectForm from '../Add Form/AddProjectForm'
import ProjectOnGrid from '../ProjectsGrid/ProjectOnGrid';
import '../../styling/ProjectSettings.scss'

const ProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const { companyID, addProjectIdToLocalStorage, addingProject, setAddingProject } = useAppContext();
    // const userStorage = localStorage.getItem('user')
    // const userObject = JSON.parse(userStorage)
    const userObject = "123"

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        const response = await axios.post("http://localhost:5000/controller/project/getAllProjects", { userID: userObject._id});
        setProjects(response.data);

        console.log(response.data);
    }

    const handleProjectCreation = async (formData) => {
        const project = {
            project_name: formData.project_name,
            project_type: formData.project_type || "production",
            company_id: companyID,
            project_creator: userObject._id

        }

        console.log("PROJECT:")
        console.log(project)

        const response = await axios.post("http://localhost:5000/controller/project/createProject", project).then((result)=>{
            setAddingProject(false)
            project._id = result.data._id
            console.log(result)
        });

        setProjects(existingProjects => [...existingProjects, project])
    }

    const cancelProject = () => {
        setAddingProject(false)
    }

    return (
        <>
            { addingProject ? (
                <div className='w-layout-grid settings-sample-type-field-options-grid button-wrapper'>       
                    <AddProjectForm companyID={companyID} onSave={handleProjectCreation} onCancel={cancelProject}/>
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
    )
}

export default ProjectsComponent


/*
    - Create an Add Project Form save function that sends the request. DONE
    - Update the html so that we can see the projects. DONE
    - Allow project editing
    - Update the sample types tab so that it's actually adding the sample type IDs to the project it's on.
    - GG well played
*/