//const initArticle = require('./../../../data/articles.json')
import Actions from '../../../actions'

const initState = {
    articles: [],
    filter: ''
}
const ArticleReducer = (state =initState,action )=>{
    switch (action.type) {
        case Actions.PUBLISH_NEW:
            // current user post a new article
            let _date = new Date()
            return {
                ...state,
                articles: [...state.articles,
                    {...action.article, commentShow: false, addCommentArea: false}],
                filter: ''
            }
        case Actions.TOGGLE_COMMENT:
            return {
                ...state,
                articles: state.articles.map((e)=>{
                    if(e._id == action.id)
                        return {...e, commentShow: !e.commentShow}
                    else
                        return e
                })
            }
        case Actions.SHOW_COMMENT_AREA:
            return {
            ...state,
            articles: state.articles.map((e)=>{
                if(e._id == action.id)
                    return {...e, addCommentArea: !e.addCommentArea}
                else
                    return e
            })
        }
        case Actions.FILTER_ARTICLE:
            // when text in search bar is changed
            return {
                ...state,
                filter: action.keyword
            }
        case Actions.LOGIN:
            return {
                ...state,
                articles: action.articles.map((e) =>{
                    return {
                        ...e,
                        commentShow: false,
                        addCommentArea: false
                    }
                })
            }
        case Actions.LOGOUT:
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return{
                ...state,
                articles: initState.articles,
                filter: initState.filter
            }
        case Actions.ADD_FOLLOW:
            return{
                ...state,
                articles: [ ...state.articles,
                    ...action.toAdd.articles
                ]
            }
        case Actions.REMOVE_FOLLOW:
            return {
                ...state,
                articles: state.articles.filter((e) => { return e.author != action.username })
            }
        case Actions.UPDATE_ARTICLE:
            return {
                ...state,
                articles: state.articles.map((e) => {
                    if(e._id == action.article._id){
                        action.article.commentShow = e.commentShow
                        action.article.addCommentArea = e.addCommentArea
                        return action.article
                    }
                    return e
                })
            }
        case Actions.NAV_TO_MAIN:
            return {
                ...state,
                articles: state.articles.map((e) => {
                    e.commentShow = false
                    e.addCommentArea = false
                    return e
                })
            }
        default:
            return state

    }
}
export default ArticleReducer