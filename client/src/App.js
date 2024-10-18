import React from "react";

import {BrowserRouter, Routes, Route, Link, Redirect, Navigate} from 'react-router-dom';

import {Dashboard, Error, Project, Login, Documents, MapPage} from './pages'

import {TemplateProjectSettings} from "./pages/Project Settings";
import {TemplateSampleType} from "./pages/SampleType";

import ProtectedRoute from "./pages/ProtectedRoute";
import CompanyDashboard from "./pages/Company Dashboard/CompanyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/project-settings/:projectIdParams" element={
              <ProtectedRoute>
              <TemplateProjectSettings />
              </ProtectedRoute>
              }>
              <Route path="sample-list" element={<TemplateProjectSettings />}/>
              </Route> */}

        
          <Route path="/project-settings/:projectIdParams" element={<TemplateProjectSettings />}/>
          <Route path="/projectDashboard/:projectIdParams" element={<Dashboard />}/>
          <Route path="/:projectIdParams/sampleType/:sampleTypeIDParams" element={<TemplateSampleType />}/>
          <Route path="/documents/:projectIdParams" element={<Documents />}/>
          <Route path="/companyDashboard" element={<CompanyDashboard />}/>
       


        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Login />}/>
        {/* <Route path="/project" element={<Project />}/> */}
       
        <Route path="/Map/:projectIdParams" element={<MapPage />}/>
        
        <Route path="*" element={<Error />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;