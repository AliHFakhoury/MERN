import React from 'react';
import './ProjectSideNav.scss';
import Logo from "../Logo/Logo";
import {Workspace, Folders, Nominal, Task, Map} from '@carbon/icons-react';
import { OverflowMenuHorizontal } from '@carbon/icons-react';
import Button from "../../components/Button/Button";
import { Link } from 'react-router-dom';
import { useAppContext } from "../../context/appContext";


const ProjectSideNav = () => {
    const { project } = useAppContext();

    const companyDashboard = "/companyDashboard";
    const sampleTypesURL = "/projectDashboard/"+project._id;
    const documentsURL = "/documents/"+project._id;
    const mapURL = "/map/"+project._id;

    return (
        <div className='project-side-nav-wrapper'>
            {/* Below logo triggers a Carbon Overflow Menu */}
            <Logo colour='black' maxSize='2.5rem' />
                    <div className='psn-button-wrapper'>      
                        <Link to={companyDashboard}><Button  buttonStyle='sq-button on-colour' icon='Workspace' title='Dashboard'/></Link>
                        <Link to={documentsURL}><Button  buttonStyle='sq-button on-colour' icon='Folders' title='Documents'/></Link>
                        <Link to={sampleTypesURL}><Button  buttonStyle='sq-button on-colour' icon='Nominal' title='Samples'/></Link> 
                        <Link to={mapURL}><Button  buttonStyle='sq-button on-colour' icon='Earth' title='Map'/></Link> 
                        <Button  buttonStyle='sq-button on-colour' icon='Task' title='My Tasks [Coming Soon]'/>


                        {/* <Link to={companyDashboard}><Button  buttonStyle='sq-button on-colour' text={'Projects'} title='Dashboard'/></Link>
                        <Link to={documentsURL}><Button  buttonStyle='sq-button on-colour' text={'Documents'} title='Documents'/></Link>
                        <Link to={sampleTypesURL}><Button  buttonStyle='sq-button on-colour' text={'Samples'} title='Samples'/></Link>
                        <Link to={mapURL}><Button  buttonStyle='sq-button on-colour' text={'Map'} title='Map'/></Link> */}


                        {/* <Button  buttonStyle='sq-button on-colour' text={'Tasks'} title='My Tasks [Coming Soon]'/> A/B Testing for tasks????*/}
                    </div>
                    {/* Below button triggers a Carbon Modal */}
                    <button className='psn-info-button' title='Software Info'>
                        <OverflowMenuHorizontal className='icon'/>
                    </button>
        </div>
        // Find a way to show/hide above buttons based on users subscription to easy module. The comp. would have all the buttons, but would only render if the user has access to each.
    );
};

export default ProjectSideNav;

// Join Microsoft for startups
// Azure AI Capabilities
// Visualization power BI for analytics 
// understanding who exactly, exact problem, X amount of risk/time/from a drilling program to a submitted 401, tested with ____, 
// think of messaging
// explain very simply, who is it for, specifically.
// manage exploration agreement/project progress
// refining the message to explain what is the data that is being stored
// How to get people to understand what the problem is without the emotional connection?
// IP person, Sahand, Pragmaclin, Johan