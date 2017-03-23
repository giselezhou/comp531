
import { resource } from '../../actions'
import { fetchArticles } from '../main/article/articleActions'
import { fetchAvatar, fetchHeadline, fetchDob, fetchEmail, fetchZip } from '../profile/profileActions'

export const login = (username, password) => {
    if( username && password ){
        return (dispatch)=>{
            resource('POST', 'login', { username: username, password:  password })
                .then(() => {
                        setupMain(username, dispatch)

                },()=>{
                    dispatch({type: 'LOGIN_ERR', errorMsg: "username or password wrong!"})
                })
                .catch(() => {
                    dispatch({type: 'LOGIN_ERR', errorMsg: "username or password wrong!"})
                })
        }
    }else{
        return (dispatch)=>{
            dispatch({type: 'LOGIN_ERR', errorMsg: "username or password missing!"})
        }
    }

}


const map = (key, res) => {
    const ret = {}
    res.forEach( (ele) => {
        ret[ele.username] = ele[key]
    })
    return ret

}
const setupMain = (username, dispatch) => {
    resource('GET', 'following/'+username)
        .then((res) => {
            const users = res.following
            const userList = users.join(',')
            Promise.all([
                users,
                resource('GET', 'headlines/'+userList)
                    .then((res) => {
                       return map('headline', res.headlines)
                    }),
                resource('GET', 'avatars/'+userList)
                    .then((res) => {
                       return map('avatar', res.avatars)
                    }),
                fetchArticles(),
                fetchAvatar(username),
                fetchHeadline(username),
                fetchEmail(username),
                fetchZip(username),
                fetchDob()

            ])
                .then((arr) => {

                const _followings = []
                let count = 0
                const _headlines = arr[1]
                const _avatars = arr[2]
                const _articles = arr[3]
                arr[0].forEach( (ele) => {
                    _followings.push({
                        id: count,
                        headline: _headlines[ele],
                        username: ele,
                        avatar: _avatars[ele]
                    })
                    count = count + 1
                })

                    dispatch({ type: 'LOGIN', followings: _followings,
                        articles: _articles, avatar: arr[4], headline: arr[5],
                        username: username, email: arr[6], zipcode: arr[7], birthday: (new Date(arr[8])).toLocaleString()})

                })

        })
}
export const logout = () => {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(() => {
                dispatch({type: 'LOGOUT'})
            })
    }
}
