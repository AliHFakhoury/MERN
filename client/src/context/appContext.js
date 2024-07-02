import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios';

import { 
    DISPLAY_ALERT,
    CLEAR_ALERT,
    // REGISTER_USER_BEGIN,
    // REGISTER_USER_SUCCESS,
    // REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SAMPLELISTOPEN,
    UPDATE_PROJECT,
    UPDATE_PROJECT_IN_STATE,
    SET_ADD_PROJECT,
    TEST
} from "./actions";


const user = localStorage.getItem('user');
const token = localStorage.getItem('token');


const initialAppContextState = {
    isLoading: false,
    showAlert: true,
    alertText: 'ALERT TEXT',
    alertType: 'danger',
    user: user ? JSON.parse(user) : null,
    token: token,
    sampleListOpen: false,
    companyID: "0001e24099fcaca1f859548a",
    userID: "0001e24099fcaca1f859548b",
    test:"Initial Value",
    project: {},
    addingProject: false
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialAppContextState);

    const addProjectIdToLocalStorage = (projectID) => {
        localStorage.setItem('projectID', projectID);
        console.log("App context set projectID as: "+projectID);
    }

    const updateProject = async (project_id) => {
        const projectRequest = await axios.get(`http://localhost:5000/controller/project/getProject/${project_id}`)    
        const project = projectRequest.data;
    
        dispatch({type: UPDATE_PROJECT, payload:{project}})
    }

    const updateProjectInState = (formData) => {
        const updatedProject = {...state.project, project_name: formData.project_name, project_type: formData.project_type }
        
        dispatch({type: UPDATE_PROJECT_IN_STATE, payload:{updatedProject}})
    }

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        console.log("Hello!!");
        clearAlert()
    }

    const clearAlert = () => {
        // setTimeout( () => {
        //     dispatch({type: CLEAR_ALERT})
        // }, 3000)
    }

    //will be updated to run on login
    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN});

        try {
            
            const request = await axios.post('http://localhost:5000/controller/user/login', currentUser).then( (response) => {
                console.log(response.status)

                if(response.status != 200){
                    console.log("nope")

                    return ;
                }

                const {user, token} = response.data;
                
                dispatch({type: LOGIN_USER_SUCCESS, payload:{user, token}})
            
                addUserToLocalStorage({user, token});
    
                clearAlert();

            });
            
            
        } catch (error){
            // console.log(error.response);

            dispatch({type: LOGIN_USER_ERROR, payload: {msg:error.response.data.msg}});

            clearAlert();
        }

    }

    function toggleSampleListOpen(){
        dispatch({type: TOGGLE_SAMPLELISTOPEN });
    }


    function setAddingProject(isAdding){
        dispatch({type: SET_ADD_PROJECT, payload: {isAdding: isAdding} });
    }

    return (
        <AppContext.Provider value = {{...state, displayAlert, loginUser, toggleSampleListOpen, updateProject, addProjectIdToLocalStorage, updateProjectInState, setAddingProject}}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialAppContextState, useAppContext }