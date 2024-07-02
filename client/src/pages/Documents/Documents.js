import React, { useEffect, useState } from "react";
import {TreeView} from "@carbon/react";
import Tree from "./TreeView";
import { Spacer, ProjectSideNav, ProjectTopBar, DataTableComponent, LightBox, Breadcrumb, Button} from '../../components';
import "./Documents.scss";
import { Folder, Pd, ChevronRight, DocumentBlank } from "@carbon/icons-react";
import FilesSIF from "../../components/SIFComponents/Files-SIF";
import axios from "axios";
import { useAppContext } from "../../context/appContext";
import { useParams } from "react-router-dom";

/*
    CONTINUE FROM HERE:
        - Get the latest 5 files' names
        - Fastest thing to do would be to click on a document and have it be downloaded


    To Do:
        - Transitioning between different pages
        - Modal opens and closes for adding samples
        - Each sample opens in its own page
        - Upload document designed
        - Delete project
        - Edit project info
        - Only allow documents page to open after project is loaded in AppContext
        - And more...?
*/

const FileItem = ({ fileName, fileSize, onClick }) => {

    const handleClick = () => {
        onClick(fileName)
    }

    return (
      <div className='folder-wrap' onClick={handleClick}>
        <DocumentBlank className='folder-icon'/>
        <div>
           <span className="folder-name">{fileName}</span>
            <div className='folder-info-wrap'>
                {/* <span> {props.lastEdit} </span> */}
                <span>{fileSize}</span>
            </div>
        </div>
      </div>
    );
}

const FolderItem = ({ folderName, folderSize, onClick }) => {

    const handleClick = () => {
        onClick(folderName)
    }

    return (
      <div className='folder-wrap' onClick={handleClick}>
        <Folder className='folder-icon'/>
        <div>
           <span className="folder-name">{folderName}</span>
            <div className='folder-info-wrap'>
                {/* <span> {props.lastEdit} </span> */}
                <span>{folderSize}</span>
            </div>
        </div>
      </div>
    );
}

const Documents = () => {
    const [ selectedFiles , setSelectedFiles ] = useState([])
    const [ s3Docments, setS3Documents ] = useState([])
    
    const { projectIdParams } = useParams();
    const {  updateProject, project } = useAppContext()

    useEffect( () => {
        updateProject(projectIdParams)
        fetchDocuments()
    }, [])

    useEffect(() => {
        console.log(selectedFiles)
    }, [selectedFiles])

    const fieldValues = {
        field_name: "Documents to upload"
    }

    const onInputChange = (valueObject) => {
        const files = valueObject.value
        
        let formData = new FormData();

        for(const key in files){
            let file = files[key]

            formData.append('files', file);
            
        }
        
        setSelectedFiles(formData)
    }

    const handleUpload = async () => {
        const request = await axios.post(`http://localhost:5000/controller/project/uploadDocuments/${projectIdParams}`, selectedFiles, {
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

    const fetchDocuments = async () => {
        console.log(project)

        //update the project id to be attached to the url
        const request = await axios.get(`http://localhost:5000/controller/documents/getAllDocuments/${projectIdParams}`).then( (response) => {
            console.log(response.data)
            setS3Documents(response.data)
        })

        // const request = await axios.get(`http://localhost:5000/controller/documents/getAllDocuments/${project._id}`).then( (response) => {
        //     console.log(response.data)
        //     setS3Documents(response.data)
        // })
        
    }

    const handleFileClick = (fileName) => {
        const s3URL = "s3://orogentechdev/projects/"+projectIdParams+"/documents/"+fileName;

        console.log(s3URL)
    }

    return (
 
        <>
            <ProjectSideNav />
                <div className="project-page-wrapper">
                    <ProjectTopBar />

                    {/* Only content below this should be left in the template. Remove Everything above this line. */}
                    
                    
                    <h1>Mustang Lake Documents</h1>
                    <Spacer size='_055'/>
                    <Breadcrumb>
                        <a>Mustang Lake</a>
                        <ChevronRight className='arrow'/>
                        <a>Documents</a>
                    </Breadcrumb>


                    {/* Forgive me Cole */}
                    {/* V1 */}
                    {/* <div className="documents-wrapper">
                        <div className="treeview-wrap">
                            <Tree />
                        </div>
                        <div>
                            <Spacer size='_page-margin-normal'/>
                            <div className="document-wrap">
                                <div className="doc-title-wrap">
                                    <h3>Folders</h3>
                                    <Spacer size='_04'/>
                                </div>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                            </div>
                            <Spacer size='_page-margin-normal'/>
                            <div className="document-wrap">
                                <div className="doc-title-wrap">
                                    <h3>Files</h3>
                                    <Spacer size='_04'/>
                                </div>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                                <FolderItem folderName='Folder Name' lastEdit='2 hours ago' folderSize='255gb'/>
                            </div>
                        </div>
                    </div> */}

                    <div className="document-wrap">
                        <div className="doc-title-wrap">
                            <h3>Files</h3>
                            <Spacer size='_04'/>
                        </div>

                        { s3Docments.map( (document, index) => {
                            {/* console.log(document) */}

                            let fileSize = document.fileSize + 'mb'

                            {/* Where are the ... coming from? */}
                            return (
                                <FileItem fileName={document.fileName} fileSize={fileSize} onClick={handleFileClick} key={index}/>
                            )
                        })}
                    </div>


                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <FilesSIF fieldValues={fieldValues} onChange={onInputChange}/>
                    <br></br>
                    <Button text={"Upload documents"} buttonStyle={"primary"} onChange={handleUpload} />
                </div>

        </>
    );
};

export default Documents;