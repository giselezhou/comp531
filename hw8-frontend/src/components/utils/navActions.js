import Actions, {resource} from '../../actions'
export const nav = (dest) => {
    if(dest && (dest == 'NAV_TO_MAIN' || dest == 'NAV_TO_PROFILE')){
        return (dispatch) => {
            dispatch({ type: dest })
        }
    }else if(dest && dest == 'NAV_TO_LANDING'){
        return (dispatch) => {
            resource('PUT', 'logout')
                .then((res) => {
                    dispatch({type: Actions.LOGOUT})
                })
                .catch(error => {
                    dispatch({type: Actions.LOGOUT})
                })
        }
    }

}