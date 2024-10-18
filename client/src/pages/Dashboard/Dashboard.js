import React, { useEffect, useState } from "react";
import './Dashboard.scss';
import { ProjectSideNav } from "../../components";
import ProjectTopBar from "../../components/ProjectTopBar/ProjectTopBar";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const { projectIdParams } = useParams();
    const [ project, setProject ] = useState({});
    const [ sampleTypes, setSampleTypes ] = useState([]);

    useEffect(() => {        
        if(projectIdParams !== undefined){
            fetchProject(projectIdParams);
        }
    }, []);
    
    useEffect( () => {
        if(project !== undefined && Object.keys(project).length > 0){
            fetchSampleTypes()
        }
    }, [project]);

    const fetchProject = async (projectId) => {
        await axios.get(`http://localhost:5000/controller/project/getProject/${projectId}`).then((response)=>{
            if(response.status == 200){
                setProject(response.data);
            }
        })
        }

    const fetchSampleTypes = async () => {
        const sampleTypeIds = project.sample_type_ids;

        await axios.post(`http://localhost:5000/controller/sampleType/getAllSamplesWithLatest`, sampleTypeIds).then( (response) => {
            console.log(response.data);
            setSampleTypes(response.data);
        });
        
    }

    return (<div>
                <ProjectSideNav />
                <div className="project-page-wrapper">
                    <ProjectTopBar />
                    <h1>Project Name: {project.project_name}</h1>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    {/* <h2>Documents:</h2>
                    <h3>Shows latest documents added</h3> */}

                    { sampleTypes.length == 0 && (
                        <div>
                            <h3><Link to={"/project-settings/"+projectIdParams}>Create Sample Types</Link></h3>
                        </div>
                    )}

                    { sampleTypes.length > 0 && (
                        sampleTypes.map( (item, index) => (
                            <div key={index}>
                                <Link to={"/"+projectIdParams+"/sampleType/"+item._id}><h3>{item.sampleTypeName}</h3></Link>


                                {/* List the latest additions to each sample types, V1 */}
                                {/* {item.ST_Samples.length > 0 && (
                                    item.ST_Samples.map( (sample, index) => {
                                        console.log(sample)
                                        return (
                                            <div key={index}>
                                                <h3>{sample.data.Name.value}</h3>
                                            </div>
                                        )
                                    })
                                )} */}
                            </div>
                            
                        ))
                    )}



                    <div style={{display:"flex", alignItems:"Center", justifyContent:"center", flexDirection:"column", padding:"2.5rem 0 10rem 0",minHeight:"80vh"}}>
                        {/* <Logo colour='blue' maxSize='4rem'/>
                        <Spacer size='_06'/>
                        <h1>Welcome to Orogen Data!</h1>
                        <Spacer size='_04'/> */}

                        {/* WHAT TO SAY HERE? */}
                        {/* <p>This is the latest data, info bits, and a place for people to catch up with the rest of the team.</p> */}

                        {/* <p>If you can see me, you have no errors! Congrats 🎉</p> */}
                        
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;