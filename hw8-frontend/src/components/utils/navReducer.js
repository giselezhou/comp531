
import Actions from '../../actions'
const NavReducer = (state={
    location: 'LANDING_PAGE'
}, action)=>{
    switch (action.type){

        case Actions.NAV_TO_PROFILE:
            return{
                ...state,
                location: 'PROFILE_PAGE'
            }
        case Actions.LOGIN: // same as nav_to_main
        case Actions.NAV_TO_MAIN:
            return{
                ...state,
                location: 'MAIN_PAGE'
            }
        case Actions.LOGOUT:
            return{
                ...state,
                location: 'LANDING_PAGE'
            }

        default:
            return state
    }

}
export default NavReducer