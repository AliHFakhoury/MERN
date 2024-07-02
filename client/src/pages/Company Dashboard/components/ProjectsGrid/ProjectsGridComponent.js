import React, { useEffect, useState } from 'react'
import ProjectOnGrid from './ProjectOnGrid'

const ProjectsGridComponent = ({projects}) => {
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            {projects.map((project) => (
                <ProjectOnGrid project={project}/>
            ))}
        </>
    )
}

export default ProjectsGridComponent


/*
    - Create an Add Project Form save function that sends the request.
    - Update the html so that we can see the projects. DONE
    - Allow project editing (Do this after updating sample types page)
    - Update the sample types tab so that it's actually adding the sample type IDs to the project it's on.
    - GG well played
*/