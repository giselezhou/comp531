import { fetchArticles } from '../article/articleActions'
import { fetchAvatar,fetchHeadline } from '../../profile/profileActions'
import Actions, { resource } from '../../../actions'

const addFollowToServer = (toAddUser) => {

    return resource('PUT', 'following/' + toAddUser)
        .then((res)=>{
            return res.following
        })


}

const removeFollowFromServer = (toRemoveUser) =>{
    return resource('DELETE', 'following/' + toRemoveUser)
        .then((res)=>{
            return res.following
        })
}
export const addFollow = (toAddUser)  => {

    return (dispatch) =>{
        Promise.all([
            addFollowToServer(toAddUser),
            fetchAvatar(toAddUser),
            fetchHeadline(toAddUser),
            fetchArticles(toAddUser)
        ]).then((arr)=>{

            dispatch({
                type: Actions.ADD_FOLLOW,
                toAdd: {
                            avatar: arr[1],
                            headline: arr[2],
                            username: toAddUser,
                            articles: arr[3]
                        }
            })
        })
    }
}


export const removeFollow = (toRemoveID, toRemoveUser) => {
    return (dispatch) =>{
        Promise.all([removeFollowFromServer(toRemoveUser)])
            .then((res) => {
                dispatch({type: Actions.REMOVE_FOLLOW,
                    id: toRemoveID,
                    username: toRemoveUser
                })
            })

    }

}

