import { fetchArticles } from '../article/articleActions'
import { fetchAvatar,fetchHeadline } from '../../profile/profileActions'
export const addFollow = (toAddUser)  => {

    return (dispatch) =>{
        Promise.all([
            fetchAvatar(toAddUser),
            fetchHeadline(toAddUser),
            fetchArticles(toAddUser)
        ]).then((arr)=>{

            dispatch({
                type: 'ADD_FOLLOW',
                toAdd: {
                            avatar: arr[0],
                            headline: arr[1],
                            username: toAddUser,
                            articles: arr[2]
                        }
            })
        })
    }
}


export const removeFollow = (toRemoveID, toRemoveUser) => {
    return (dispatch) =>{
        dispatch({type: 'REMOVE_FOLLOW',
            id: toRemoveID,
            username: toRemoveUser
        })
    }

}

