export const DISPLAY_ALERT = 'SHOW_ALERT'
export const CLEAR_ALERT = 'CLEAR_ALERT'

// WILL BE ADDED WHEN REGISTRATION IS ADDED
export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'

export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'

export const LOAD_PROJECTS = 'LOAD_PROJECTS'

export const TOGGLE_SAMPLELISTOPEN = 'TOGGLE_SAMPLELISTOPEN'

export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const TEST = 'TEST'

export const UPDATE_PROJECT_IN_STATE = 'UPDATE_PROJECT_IN_STATE'

export const TOGGLE_ADDING_PROJECT = 'TOGGLE_ADDING_PROJECT'

export const display_alert = () => ({
    type: DISPLAY_ALERT,
})

export const clear_alert = () => ({
    type: CLEAR_ALERT,
})

export const register_user_begin = () => ({
    type: REGISTER_USER_BEGIN,
})

export const register_user_success = () => ({
    type: REGISTER_USER_SUCCESS,
})

export const register_user_error = () => ({
    type: REGISTER_USER_ERROR,
})

export const login_user_begin = () => ({
    type: LOGIN_USER_BEGIN,
})

export const login_user_success = () => ({
    type: LOGIN_USER_SUCCESS,
})

export const login_user_error = () => ({
    type: LOGIN_USER_ERROR,
})

export const load_projects = (projects) => ({
    type: LOAD_PROJECTS,
    payload: projects,
})

export const toggle_samplelist_open = () => ({
    type: TOGGLE_SAMPLELISTOPEN,
})

export const update_project = (project) => ({
    type: UPDATE_PROJECT,
    payload: project
})

export const update_project_in_state = () => ({
    type: UPDATE_PROJECT_IN_STATE,
})

export const toggle_adding_project = (state) => ({
    type: TOGGLE_ADDING_PROJECT,
    payload: state
})