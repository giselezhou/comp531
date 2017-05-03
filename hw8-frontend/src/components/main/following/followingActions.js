import { fetchArticles } from '../article/articleActions'
import { fetchAvatar,fetchHeadline } from '../../profile/profileActions'
import Actions, { resource } from '../../../actions'



const removeFollowFromServer = (toRemoveUser) =>{
    return resource('DELETE', 'following/' + toRemoveUser)
        .then((res)=>{
            return res.following
        })
}
export const addFollow = (toAddUser, followingItems, user)  => {

    const res = followingItems.filter((e)=> e.username == toAddUser)
    if(res && res.length>0){
        return (dispatch) => {
            dispatch({type: Actions.DUPLICATE_FOLLOW, msg: "You have followed this user!"})
        }
    }else if(toAddUser == user){
        return (dispatch) => {
            dispatch({type: Actions.DUPLICATE_FOLLOW, msg: "You can not follow yourself!"})
        }
    }else{

        return (dispatch) =>{
            resource('PUT', 'following/' + toAddUser)
                .then((res) => {
                    const filter = res.following.filter((e)=> e == toAddUser)
                    if(filter && filter.length>0){
                        Promise.all([
                            res.following,
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
                                    articles: arr[3]? arr[3]:[]
                                }
                            })
                        })
                    }else{
                        dispatch({type: Actions.DUPLICATE_FOLLOW, msg: "User don't exist!"})
                    }

                })


        }


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

export const clearMsgAction = () => {
    return (dispatch) => {
        dispatch({type: Actions.CLEAR_FOLLOW_MSG})
    }
}

