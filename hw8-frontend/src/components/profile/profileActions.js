import Actions, { resource } from '../../actions'

export const fetchEmail = (username) =>{
    return resource('GET', 'email/'+username)
        .then((res) => {
            return res.email
        })
}

export const fetchZip = (username) =>{
    return resource('GET', 'zipcode/'+username)
        .then((res) => {
            return res.zipcode
        })
}

export const fetchAvatar = (username) =>{
    return resource('GET', 'avatars/'+username)
        .then((res) => {
            return res.avatars[0].avatar
        })
}

export const fetchHeadline = (username) =>{
    return resource('GET', 'headlines/'+username)
        .then((res) => {
            return res.headlines[0].headline
        })
}
export const fetchDob = () => {
    return resource('GET', 'dob')
        .then((res) => {
            return res.dob
        })
}

export const fetchAuth = () =>{
    return resource('GET', 'auth')
        .then((res)=>{
            return res.auth
        })

}