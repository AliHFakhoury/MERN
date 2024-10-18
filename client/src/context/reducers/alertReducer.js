import {
    DISPLAY_ALERT,
    CLEAR_ALERT
} from "../actions";

const initialAlertState = {
    showAlert: true,
    alertText: 'ALERT TEXT',
    alertType: 'danger',
}

const alertReducer = (state = initialAlertState, action) => {
    switch(action.type){
        case DISPLAY_ALERT:
            return {...state, showAlert: true, alertType: 'danger', alertText: action.alertText};
        case CLEAR_ALERT:
            return {...state, showAlert: false, alertType: '', alertText: ''};
        default:
            return {...state}
    }
}

export default alertReducer;