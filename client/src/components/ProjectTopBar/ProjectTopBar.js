import React from 'react';
import './ProjectTopBar.scss';
import NavTopMenu from '../NavTopMenu/NavTopMenu';
import Button from "../../components/Button/Button";
import AppStatus from '../../patterns/AppStatus/AppStatus.js';
import { useAppContext } from "../../context/appContext";

import { Search, Settings} from "@carbon/icons-react";
import { Link } from 'react-router-dom';

const ProjectTopBar = () => {
    const { project } = useAppContext();
    const settingsURL = "/project-settings/"+project._id;

    return (
        <div className='project-top-bar-wrapper'>
            <div>
                <div className='project-search-input-wrap'>
                    <input className='input project-search' type='search'/>
                    <button className='search-button'><Search className='search-icon' /></button>
                </div>
            </div>
            
            {/* From app context */}
            {/* <AppStatus currentStatus='good'/>  */}
            <NavTopMenu>
                {/* <Button  buttonStyle='sq-button' icon='ScanAlt' title='Camera Link'/> */}
                <Link to={settingsURL} ><Button  buttonStyle='sq-button' icon='Settings' title='Project Settings'/></Link>
                {/* <Button  buttonStyle='sq-button' icon='ScanAlt' title='Camera Link'/> */}
            </NavTopMenu>
        </div>
    );
};

export default ProjectTopBar;