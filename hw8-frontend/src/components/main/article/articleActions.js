
import Actions, { resource } from '../../../actions'


export const fetchArticles = (username) => {
    const append = username? username :''
    return resource('GET', 'articles/'+ append)
        .then((res)=>{
            return res.articles
        })

}

export const publish = (author, article, file) => {
    return (dispatch) => {
        const fd = new FormData()
        fd.append('text', article)
        if(file){
            fd.append('image', file)
        }
        resource('POST', 'article', fd, false)
            .then((res)=>{
                dispatch({type: Actions.PUBLISH_NEW, article: res.articles[0]})
            })
    }


}

export const publishWithoutImg = (author, article, file) => {
    return (dispatch) => {
        if(!file){
            resource('POST', 'article', {text: article})
                .then((res)=>{
                    dispatch({type: Actions.PUBLISH_NEW, article: res.articles[0]})
                })
        }else{
            publishWithImage(author, article, file)
        }

    }


}

export const changeShow = (type, article) => {
    if( type == "commentList"){
        return (dispatch) => {
            dispatch({type: Actions.TOGGLE_COMMENT, id: article._id})
        }
    }else{
        return (dispatch) => {
            dispatch({type: Actions.SHOW_COMMENT_AREA, id: article._id})
        }
    }

}

export const updateArticle = (articleID, newArticle, commentID) => {

    if(commentID){
        return (dispatch) => {
            resource('PUT', 'articles/' + articleID, {text: newArticle, commentId: commentID})
                .then( (res) => {
                    dispatch({type: Actions.UPDATE_ARTICLE, article: res.articles[0]})
                })

        }
    }else{
        return (dispatch) => {
            resource('PUT', 'articles/' + articleID, {text: newArticle})
                .then( res => {
                    dispatch({type: Actions.UPDATE_ARTICLE, article: res.articles[0]})
                })

        }
    }


}
