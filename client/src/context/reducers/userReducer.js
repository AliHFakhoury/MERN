import { 
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TEST
} from "../actions";

const initialUserState = {
    user: 'Ali',
    token: 'token',
    companyID: "0001e24099fcaca1f859548a", //empty
    userID: "0001e24099fcaca1f859548b", //empty
}

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
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
        case TEST:
            return {
                ...state,
                test:"Second Value"
            };
        default:
            return {...state}
    }
}

export default userReducer
