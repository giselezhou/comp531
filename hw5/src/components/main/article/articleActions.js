
import { resource } from '../../../actions'


export const fetchArticles = (username) => {
    return resource('GET', 'articles/'+username)
        .then((res)=>{
            return res.articles
        })

}

export const publish = (author, article) => {

    return (dispatch) => {
        resource('POST', 'article', {text: article})
            .then((res)=>{
                dispatch({type: 'POST_ARTICLE', article: res.articles[0]})
            })
    }
}

export const changeShow = (article) => {
    return (dispatch) => {
        dispatch({type: 'CHANGE_SHOW', id: article._id})
    }
}
