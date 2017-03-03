// this reducer controls the data related to current user in state

const defaultAvatar = "http://vignette4.wikia.nocookie.net/crayonshinchan/images/2/26/Crayon20Shinchan209520720x720.jpg"
const initState ={

    username: 'Gisele',
    phone: '100-100-1000',
    zipcode: '77005',
    email: '123@rice.edu',
    birthday: '1888-10-11',
    avatar: defaultAvatar,
    status: 'fun'

}
const UserReducer = (state= initState, action)=>{

    switch (action.type){
        case 'LOGIN':
            return{
                ...state,
                username: action.username
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
                status: action.status
            }
        case 'UPDATE_PROFILE':
            return{
                ...state,
                // check if the value is null or ''
                // if it is '' or null
                // it means the value is not changed
                // then it will be the original value
                username: action.username? action.username: state.username,
                phone: action.phone? action.phone:state.phone,
                zipcode: action.zipcode?action.zipcode:state.zipcode,
                email: action.email?action.email:state.email,
                birthday:action.birthday?action.birthday:state.birthday
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
                avatar: defaultAvatar,
                status: initState.status
            }
        default:
            return state
    }

}

export default UserReducer