const initState = {
    logMsg: {
        type: undefined,
        msg: undefined
    },
    regMsg: {
        type: undefined,
        msg: undefined
    },
    updateMsg: {
        type: undefined,
        msg: undefined
    }
}
const MessageReducer = (state = initState ,action )=>{
    switch (action.type) {
        case 'LOGIN_ERR':
            return {
                ...state,
                logMsg: {
                    type: false,
                    msg: action.errorMsg
                }
            }
        case 'REG_ERR':
            return {
                ...state,
                regMsg:{
                    type: false,
                    msg: action.errorMsg
                }
            }
        case 'REG':
            return {
                ...state,
                regMsg:{
                    type: true,
                    msg: action.msg
                }
            }
        case 'UPDATE_ERR':
            return {
                ...state,
                updateMsg:{
                    type: false,
                    msg: action.errorMsg
                }
            }
        case 'UPDATE_PROFILE':
            return {
                ...state,
                updateMsg: {
                    type: undefined,
                    msg: undefined
                }
            }
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return initState
        default:
            return state

    }
}
export default MessageReducer