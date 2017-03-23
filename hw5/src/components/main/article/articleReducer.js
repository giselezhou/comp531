//const initArticle = require('./../../../data/articles.json')
const initState = {
    articles: [],
    filter: ''
}
const ArticleReducer = (state =initState,action )=>{
    switch (action.type) {
        case 'POST_ARTICLE':
            // current user post a new article
            let _date = new Date()
            return {
                ...state,
                articles: [...state.articles,
                    {...action.article, commentShow: false}],
                filter: ''
            }
        case 'CHANGE_SHOW':
            return {
                ...state,
                articles: state.articles.map((e)=>{
                    if(e._id == action.id)
                        return {...e, commentShow: !e.commentShow}
                    else
                        return e
                })
            }
        case 'FILTER':
            // when text in search bar is changed
            return {
                ...state,
                filter: action.keyword
            }

        case 'LOGIN':
            return {
                ...state,
                articles: action.articles.map((e) =>{
                    return {
                        ...e,
                        commentShow: false
                    }
                })
            }
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return{
                ...state,
                articles: initState.articles,
                filter: initState.filter
            }
        case 'ADD_FOLLOW':
            return{
                ...state,
                articles: [ ...state.articles,
                    ...action.toAdd.articles
                ]
            }
        case 'REMOVE_FOLLOW':
            return {
                ...state,
                articles: state.articles.filter((e) => { return e.author != action.username })
            }
        default:
            return state

    }
}
export default ArticleReducer