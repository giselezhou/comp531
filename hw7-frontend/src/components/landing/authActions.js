
import Actions, { resource } from '../../actions'
import { fetchArticles } from '../main/article/articleActions'
import { fetchAvatar, fetchHeadline, fetchDob, fetchEmail, fetchZip } from '../profile/profileActions'

export const login = (username, password) => {
    if( username && password ){
        return (dispatch)=>{
            resource('POST', 'login', { username: username, password:  password })
                .then(() => {
                        setupMain(username, dispatch)

                })
                .catch(() => {
                    dispatch({type: Actions.LOGIN_ERROR, errorMsg: "username or password wrong!"})
                })
        }
    }else{
        return (dispatch)=>{
            dispatch({type: Actions.LOGIN_ERROR, errorMsg: "username or password missing!"})
        }
    }

}

export const fbLogin = () => {
    return (dispatch) => {
        resource('GET', 'auth/facebook')
            .then(() => {
                dispatch({type: Actions.LOGIN_ERROR, errorMsg: res})
            })

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
            if( userList && userList.length > 0){
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

                        dispatch({ type: Actions.LOGIN, followings: _followings,
                            articles: _articles, avatar: arr[4], headline: arr[5],
                            username: username, email: arr[6], zipcode: arr[7], birthday: (new Date(arr[8])).toLocaleString()})

                    })
            }else{
                Promise.all([
                    users,
                    fetchArticles(),
                    fetchAvatar(username),
                    fetchHeadline(username),
                    fetchEmail(username),
                    fetchZip(username),
                    fetchDob()

                ])
                    .then((arr) => {
                        const _followings = []
                        const _articles = arr[1]


                        dispatch({ type: Actions.LOGIN, followings: _followings,
                            articles: _articles, avatar: arr[2], headline: arr[3],
                            username: username, email: arr[4], zipcode: arr[5], birthday: (new Date(arr[6])).toLocaleString()})

                    })


            }


        })
}

