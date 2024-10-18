// react imports
import React, { useState } from 'react';
import {ChevronRight} from '@carbon/icons-react';

// app context
import { initialAppContextState, useAppContext } from '../../context/appContext';

// our components
import { InputContainer, Navbar, Tabs, Spacer, Breadcrumb } from '../../components/index.js'
import { ModalWrapper } from 'carbon-components-react';

// project settings styles
import './styling/ProjectSettings.scss'

import ProjectsComponent from './components/ProjectsComponent/ProjectsComponent';

// import Navbar from '../../components/Navbar/Navbar.js';

const CompanyDashboard = () => {
    return (
        <div>
            <Navbar/>
            <section className='page-section'>
                <div className='container'>

                    {/* <h1>Company Name</h1> */}
                    <h1>Projects</h1>
                    <Spacer size='_page-margin-normal'/>
                    
                    <br/>
                    <br/>
                    <br/>
                    
                    <ProjectsComponent />
                    


                </div>
            </section>
            
        </div>
    );
};

export default CompanyDashboard;