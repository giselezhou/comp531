const initArticle = require('./../../../data/articles.json')
const initState = {
    nextID: 10,
    articles: initArticle.articles,
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
                    {
                        _id: state.nextID,
                        text: action.article,
                        date: _date.toJSON(),
                        img: "http://lorempixel.com/378/211/",
                        comments: [

                        ],
                        author: action.author
                    }

                ],
                nextID: state.nextID + 1,
                filter: ''
            }
        case 'FILTER':
            // when text in search bar is changed
            return {
                ...state,
                filter: action.keyword
            }
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return{
                ...state,
                nextID: initState.nextID,
                articles: initState.articles,
                filter: initState.filter
            }
        default:
            return state

    }
}
export default ArticleReducer