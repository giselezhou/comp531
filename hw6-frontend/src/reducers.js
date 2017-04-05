
import { combineReducers } from 'redux'


import UserReducer from './components/userReducer'
import NavReducer from './components/utils/navReducer'
import MessageReducer from './components/utils/messageReducer'
import FollowReducer from './components/main/following/followingReducer'
import ArticleReducer from './components/main/article/articleReducer'
const Reducer = combineReducers({
    UserReducer,
    NavReducer,
    MessageReducer,
    FollowReducer,
    ArticleReducer
})

export default Reducer