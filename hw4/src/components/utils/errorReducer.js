
const ErrorReducer = (state = {
    logError: {
        errorMsg: undefined,
        showErr: false
    },
    regError:{
        errorMsg:undefined,
        showErr: false
    },
    updateError:{
        errorMsg:undefined,
        showErr: false
    }
},action )=>{
    switch (action.type) {
        case 'LOGIN_ERR':
            return {
                ...state,
                logError: {
                    errorMsg: action.errorMsg,
                    showErr: true
                }
            }
        case 'REG_ERR':
            return {
                ...state,
                regError:{
                    errorMsg: action.errorMsg,
                    showErr: true
                }
            }
        case 'UPDATE_ERR':
            return {
                ...state,
                updateError:{
                    errorMsg: action.errorMsg,
                    showErr: true
                }
            }
        case 'UPDATE_PROFILE':
            return {
                ...state,
                updateError:{
                    errorMsg:undefined,
                    showErr: false
                }
            }
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return {
                ...state,
                logError: {
                    errorMsg: undefined,
                    showErr: false
                },
                regError:{
                    errorMsg:undefined,
                    showErr: false
                },
                updateError:{
                    errorMsg:undefined,
                    showErr: false
                }
            }
        default:
            return state

    }
}
export default ErrorReducer