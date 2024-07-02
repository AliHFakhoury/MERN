import { useEffect } from "react";
import { useAppContext } from "../../../../context/appContext"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "carbon-components-react";


const ProjectOnGrid = ({project}) => {
    const { updateProject } = useAppContext();
    const navigate = useNavigate();

    const projectURL = '/projectDashboard/' + project._id;

    const handleEditClick = () => {
        updateProject(project._id);
        navigate("/project-settings/"+project._id)
    };


    return (
       
        <div>
            <a href={projectURL} target="" className="project-thumbnail">
                <div className="project-thumbnail-hover">
                    Open Project
                </div>
            </a>
            <div className="project-title-wrap">
                <h3>{project.project_name}</h3>
                {/* <div>X</div> */}
            </div>
            {/* <div className="project-last-edit">Last Edited: TIME</div> */}
            {/* <div>Project Type: {project.project_type}</div> */}
        </div>
       
    )
}

export default ProjectOnGrid