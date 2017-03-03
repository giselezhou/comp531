
import { combineReducers } from 'redux'


import UserReducer from './components/userReducer'
import NavReducer from './components/utils/navReducer'
import ErrorReducer from './components/utils/errorReducer'
import FollowReducer from './components/main/following/followingReducer'
import ArticleReducer from './components/main/article/articleReducer'
const Reducer = combineReducers({
    UserReducer,
    NavReducer,
    ErrorReducer,
    FollowReducer,
    ArticleReducer
})

export default Reducer