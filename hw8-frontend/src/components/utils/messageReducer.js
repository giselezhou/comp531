import Actions from '../../actions'
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
    },
    avatarMsg: {
        type: undefined,
        msg: undefined
    },
    followingMsg: {
        type: undefined,
        msg: undefined
    },
    linkMsg: {
        type: undefined,
        msg: undefined
    },
    unlinkMsg: {
        type: undefined,
        msg: undefined
    }
}
const MessageReducer = (state = initState ,action )=>{
    switch (action.type) {
        case Actions.LOGIN_ERROR:
            return {
                ...state,
                logMsg: {
                    type: false,
                    msg: action.errorMsg
                }
            }
        case Actions.REGISTER_ERROR:
            return {
                ...state,
                regMsg:{
                    type: false,
                    msg: action.errorMsg
                }
            }
        case Actions.REGISTER:
            return {
                ...state,
                regMsg:{
                    type: true,
                    msg: action.msg
                }
            }
        case Actions.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                updateMsg:{
                    type: false,
                    msg: action.errorMsg
                }
            }
        case Actions.UPDATE_PROFILE:
            return {
                ...state,
                updateMsg: {
                    type: action.msg? true: undefined,
                    msg: action.msg? action.msg: undefined
                }
            }

        case Actions.UPDATE_AVATAR_ERROR:
            return{
                ...state,
                avatarMsg: {
                    type: false,
                    msg: action.errorMsg
                }
            }
        case Actions.UPDATE_AVATAR:
            return{
                ...state,
                avatarMsg: {
                    type: true,
                    msg: action.msg
                }
            }
        case Actions.DUPLICATE_FOLLOW:
            return {
                ...state,
                followingMsg: {
                    type: false,
                    msg: action.msg
                }
            }
        case Actions.CLEAR_FOLLOW_MSG:
            return {
                ...state,
                followingMsg: {
                    type: undefined,
                    msg: undefined
                }
            }
        case Actions.LINK_ERROR:
            return {
                ...state,
                linkMsg: {
                    type: false,
                    msg: action.msg
                }
            }
        case Actions.UNLINK_ERROR:
            return {
                ...state,
                unlinkMsg: {
                    type: false,
                    msg: action.msg
                }
            }
        case Actions.LINK:
            return {
                ...state,
                linkMsg: {
                    type: true,
                    msg: action.msg
                }
            }
        case Actions.UNLINK:
            return {
                ...state,
                unlinkMsg: {
                    type: true,
                    msg: action.msg
                }
            }
        case Actions.NAV_TO_MAIN:
        case Actions.NAV_TO_PROFILE:
        case Actions.LOGOUT:
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return initState
        default:
            return state

    }
}
export default MessageReducer