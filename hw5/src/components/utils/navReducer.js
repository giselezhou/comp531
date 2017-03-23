

const NavReducer = (state={
    location: 'LANDING_PAGE'
}, action)=>{
    switch (action.type){

        case 'NAV_TO_PROFILE':
            return{
                ...state,
                location: 'PROFILE_PAGE'
            }
        case 'LOGIN': // same as nav_to_main
        case 'NAV_TO_MAIN':
            return{
                ...state,
                location: 'MAIN_PAGE'
            }
        case 'LOGOUT': // same as nav_to_landing
        case 'NAV_TO_LANDING':
            return{
                ...state,
                location: 'LANDING_PAGE'
            }

        default:
            return state
    }

}
export default NavReducer