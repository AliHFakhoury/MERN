import { 
    DISPLAY_ALERT,
    CLEAR_ALERT,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SAMPLELISTOPEN,
    UPDATE_PROJECT,
    TEST,
    UPDATE_PROJECT_IN_STATE,
    SET_ADD_PROJECT
} from "./actions";


const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {...state, showAlert: true, alertType: 'danger', alertText: action.alertText};
        case CLEAR_ALERT:
            return {...state, showAlert: false, alertType: '', alertText: ''};
        case LOGIN_USER_BEGIN:
            return {...state, isLoading: true };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token, 
                user:action.payload.user,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Logged In!'
            };
        case LOGIN_USER_ERROR:
            return {
                ...state, 
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Login Error mate'
            };
        case TOGGLE_SAMPLELISTOPEN:
            // console.log(state.sampleListOpen);
            return {
                ...state,
                sampleListOpen: !state.sampleListOpen
            };
        case UPDATE_PROJECT:
            // console.log(action.payload.project)

            return {
                ...state,
                project: action.payload.project
            };
        case UPDATE_PROJECT_IN_STATE:
            return {
                ...state,
                project: action.payload.updatedProject
            };
        case SET_ADD_PROJECT:
            return {
                ...state,
                addingProject: action.payload.isAdding
            } 
        case TEST:
            return {
                ...state,
                test:"Second Value"
            };
        default:
            throw new Error(`no such action : ${action.type}`)
    }
}

export default reducer
