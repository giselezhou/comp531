
import Actions, { resource } from '../actions'


// check if age is older than 18 years
const checkAge = (birthday)=>{
    let now = new Date();
    let birthdayArr = birthday.split('-')
    let birth = new Date(birthdayArr[0], birthdayArr[1],birthdayArr[2]);
    let dist_year = now.getYear()-birth.getYear();

    let under_18 = 0;
    if(dist_year<18){
        under_18 = 1;
    }else if(dist_year == 18){
        if(now.getMonth()<birth.getMonth()){
            under_18 = 1;
        }else if(now.getMonth()==birth.getMonth()){
            if(now.getDay()<birth.getDay()){
                under_18 = 1;
            }
        }
    }
    return under_18 == 0
}
// check*  objects are used to check if the param matches the required pattern
// check*.errorMsg is the msg used to tell users what is wrong
const checkUsername ={
    check : (username) =>{return (/^[a-zA-Z][a-zA-Z0-9]*$/).test(username)},
    errorMsg : 'Name should be starting with a letter and only contains letters and digits!'
}
const checkZipcode = {
    check: (zipcode) => {return (/^[0-9][0-9][0-9][0-9][0-9]$/).test(zipcode)},
    errorMsg: 'Zip code should be five digits!'
}

const checkEmail = {
    check: (email) =>{return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+$/).test(email)},
    errorMsg: 'Email address is in wrong format!'
}

const checkPhone ={
    check: (phone) => {
        return (/^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/).test(phone)
    },
    errorMsg: 'Phone number should be like 100-100-1000'
}


const checkUpdatables = (newEmail, newZipcode, newPsw, newPswConfirm, _type) =>{
    if(newPsw){
        if(newPsw!=newPswConfirm){
            return (dispatch)=>{
                dispatch({type: _type, errorMsg: 'Password does not match!'})
            }
        }
    }
    if(newEmail){
        if(!checkEmail.check(newEmail)){
            return (dispatch)=> {
                dispatch({type: _type, errorMsg: checkEmail.errorMsg })
            }
        }
    }

    if(newZipcode){
        if(!checkZipcode.check(newZipcode)){
            return (dispatch)=>{
                dispatch({type: _type, errorMsg: checkZipcode.errorMsg})
            }
        }
    }
}
export const register = (birthday, username, psw, pswConfirm, phone, zipcode, email) =>{

    if(birthday&&psw&&pswConfirm&&phone&&zipcode&&email&&username){
        if(!checkAge(birthday)){
            return (dispatch)=>{
                dispatch({type: Actions.REGISTER_ERROR, errorMsg: 'You should be older than 18 years old!'})
            }
        }
        if(username){
            if(!checkUsername.check(username)){
                return (dispatch)=>{
                    dispatch({type: Actions.REGISTER_ERROR, errorMsg: checkUsername.errorMsg})
                }
            }
        }
        if(phone){
            if(!checkPhone.check(phone)){
                return (dispatch)=>{
                    dispatch({type: Actions.REGISTER_ERROR, errorMsg: checkPhone.errorMsg})
                }
            }
        }
        const checks=checkUpdatables( email, zipcode, psw, pswConfirm, Actions.REGISTER_ERROR)
        if(checks){
            return checks
        }

        return (dispatch)=>{
            resource('POST', 'register', {username: username,email: email, dob:birthday, zipcode: zipcode, password:psw})
                .then((res) => {
                    dispatch({
                        type:Actions.REGISTER,
                        username: username,
                        birthday: birthday,
                        phone: phone,
                        zipcode: zipcode,
                        email: email,
                        msg: 'Register successfully!'
                    })
                })
                .catch((err) => {
                    dispatch({
                        type:Actions.REGISTER_ERROR,
                        errorMsg: err.message
                    })
                })
        }
    }else{
        return (dispatch)=>{
            dispatch({type: Actions.REGISTER_ERROR, errorMsg: 'Fill all required please!'})
        }
    }
}

export const update = (newEmail, newZipcode, newPsw, newPswConfirm) => {

    const checks = checkUpdatables(newEmail, newZipcode, newPsw, newPswConfirm, Actions.UPDATE_PROFILE_ERROR)
    if(checks)
        return checks

    if(newEmail) {
        resource('PUT', 'email', {email: newEmail})
    }
    if(newZipcode){
        resource('PUT', 'zipcode', {zipcode: newZipcode })
    }
    if(newPsw){
        return (dispatch) => {
            resource('PUT', 'password', {password: newPsw})
                .then( (res) => {
                    dispatch({type:Actions.UPDATE_PROFILE, email: newEmail, zipcode:newZipcode, msg: res.status })
                })
        }


    }else{
        return (dispatch)=>{
            dispatch({type:Actions.UPDATE_PROFILE, email: newEmail, zipcode:newZipcode})
        }
    }
}

export const updateStatus=(newStatus)=>{
    return (dispatch) => {
        resource('PUT', 'headline', { headline: newStatus })
            .then((res) => {
                dispatch({type: Actions.UPDATE_HEADLINE, status: res.headline })
            })
    }

}

export const uploadAvatar = (newAvatar) => {


        if(newAvatar){
            return (dispatch) => {
                const fd = new FormData()
                fd.append('image', newAvatar)
                resource('PUT', 'avatar', fd, false)
                    .then((res)=>{
                        dispatch({ type: Actions.UPDATE_AVATAR, avatar: res.avatar, msg: 'uploaded' })
                    })
            }

        }else{
            return (dispatch) => {
                dispatch({type: Actions.UPDATE_AVATAR_ERROR, errorMsg: 'there is no image to upload'})
            }
        }
}

export const logout = () => {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(() => {
                dispatch({type: Actions.LOGOUT})
            })
    }
}

export const linkAccount = (username, password) => {
    return (dispatch)=>{
        resource('POST', 'link', {username: username, password:password})
            .then((res) => {
                dispatch({type: Actions.LINK, msg: "You have linked to " + res.username })
            })
            .catch((err) => {
                dispatch({type: Actions.LINK_ERROR, msg: err.message})
            })
    }
}

export const unlinkAccount = () => {

    return (dispatch)=>{
        resource('PUT', 'unlink' )
            .then((res) => {
                dispatch({type:Actions.UNLINK, msg: res.result})
            })
            .catch((err) => {
                dispatch({type: Actions.UNLINK_ERROR, msg: err.message})
            })
    }
}