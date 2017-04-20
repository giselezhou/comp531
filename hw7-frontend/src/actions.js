import fetch from 'isomorphic-fetch'
const isLocal = false
const isDummy = false
export const url =  isLocal? 'http://localhost:3000':
    (isDummy ? 'https://webdev-dummy.herokuapp.com': 'https://gisele-hw7-backend.herokuapp.com')


export const resource = (method, endpoint, payload, isJSON = true) => {
    let options =  {
        method,
        credentials: 'include'
    }
    if(isJSON) options.headers = {
        'Content-Type': 'application/json'
    }

    if (payload) options.body = isJSON? JSON.stringify(payload) :payload

    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status == 401 || r.status == 400) {
                const message = `Error in ${method} ${endpoint} ${JSON.stringify(r.json())}`
                throw new Error(message)
            } else {
                return r.json()
            }
        })
}

const Actions = {
    LOGIN: 'LOGIN',
    REGISTER: 'REG',
    UPDATE_HEADLINE: 'UPDATE_STATUS',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    LOGOUT: 'NAV_TO_LANDING',
    NAV_TO_PROFILE: 'NAV_TO_PROFILE',
    NAV_TO_MAIN: 'NAV_TO_MAIN',
    LOGIN_ERROR: 'LOGIN_ERR',
    REGISTER_ERROR: 'REG_ERR',
    UPDATE_PROFILE_ERROR: 'UPDATE_ERR',
    UPDATE_AVATAR_ERROR: 'AVATAR_UPLOAD_ERR',
    UPDATE_AVATAR: 'AVATAR_UPLOAD',
    ADD_FOLLOW: 'ADD_FOLLOW',
    REMOVE_FOLLOW: 'REMOVE_FOLLOW',
    TOGGLE_COMMENT: 'CHANGE_SHOW',
    SHOW_COMMENT_AREA: 'SHOW_COMMENT_AREA',
    FILTER_ARTICLE: 'FILTER',
    PUBLISH_NEW: 'POST_ARTICLE',
    UPDATE_ARTICLE: 'UPDATE_ARTICLE',
    DUPLICATE_FOLLOW: 'DUPLICATE_FOLLOW',
    CLEAR_FOLLOW_MSG: 'CLEAR_FOLLOW_MSG'
}

export default Actions



