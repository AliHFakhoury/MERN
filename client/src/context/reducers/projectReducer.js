import { 
    LOAD_PROJECTS,
    TOGGLE_SAMPLELISTOPEN,
    UPDATE_PROJECT,
    UPDATE_PROJECT_IN_STATE,
    TOGGLE_ADDING_PROJECT
} from "../actions";

const initialState = {
    company_id: null,
    projects: [],
    project: {},
    sampleListOpen: false,
    addingProject: false,
}


const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case TOGGLE_SAMPLELISTOPEN:
            return {
                ...state,
                sampleListOpen: !state.sampleListOpen
            };
        case UPDATE_PROJECT:
            return {
                ...state,
                project: action.payload
            };
        case UPDATE_PROJECT_IN_STATE:
            return {
                ...state,
                project: action.payload.updatedProject
            };
        case TOGGLE_ADDING_PROJECT:
            console.log("Here?");
            return {
                ...state,
                addingProject: action.payload
            }
        default:
            return {...state}
    }
}

export default projectReducer