// this reducer controls the data related to current user in state


const initState ={

    zipcode: '',
    email: '',
    birthday: '',
    avatar: undefined,
    headline: ''

}
const UserReducer = (state= initState, action) => {

    switch (action.type){
        case 'LOGIN':
            return{
                ...state,
                avatar: action.avatar,
                headline: action.headline,
                username: action.username,
                birthday: action.birthday,
                email: action.email,
                zipcode:action.zipcode
            }
        case 'REG':
            return{
                ...state,
                username: action.username,
                phone: action.phone,
                zipcode: action.zipcode,
                email: action.email,
                birthday:action.birthday
            }
        case 'UPDATE_STATUS':
            return{
                ...state,
                headline: action.status
            }
        case 'UPDATE_PROFILE':
            return{
                ...state,
                // check if the value is null or ''
                // if it is '' or null
                // it means the value is not changed
                // then it will be the original value

                zipcode: action.zipcode?action.zipcode:state.zipcode,
                email: action.email?action.email:state.email,

            }
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return{
                ...state,
                username: initState.username,
                phone: initState.phone,
                zipcode: initState.zipcode,
                email: initState.email,
                birthday: initState.birthday,
                avatar: initState.avatar,
                headline: initState.headline
            }
        default:
            return state
    }

}

export default UserReducer