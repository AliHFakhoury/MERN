import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update_project } from "../../../../context/actions";
import { connect } from 'react-redux';

// Look more into the connect function. dafuq is happening?

const ProjectOnGrid = ({project}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projectURL = '/projectDashboard/' + project._id;


    const linkClicked = () => {
        dispatch(update_project(project));
        navigate(projectURL);
    }

    return (
       
        <div>
            <a target="" className="project-thumbnail" onClick={linkClicked}>
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

// const mapStateToProps = (state) => ({
//     projects: state.projects,
//     project: state.project,
//   });

// const mapDispatchToProps = {
//     update_project,
//   };

// export default  connect(mapStateToProps, mapDispatchToProps)(ProjectOnGrid);
export default ProjectOnGrid;