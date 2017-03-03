
const initFollow = require('../../../data/followers.json')
const FollowReducer = (state ={
    nextID: 3,
    followingItems: initFollow.followingItems
},action )=>{
    switch (action.type) {
        case 'ADD_FOLLOW':
            return {
                ...state,
                followingItems: [...state.followingItems,
                    {
                        id: state.nextID,
                        status: "This is an following",
                        username: action.name,
                        avatar: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/10299744_415961128615127_1756724653_n.jpg?ig_cache_key=MTA2ODkxODc3Mjc3OTk2ODk3OA%3D%3D.2"
                    }

                ],
                nextID: state.nextID + 1
            }
        case 'REMOVE_FOLLOW':
            return{
                ...state,
                followingItems: state.followingItems.filter(({id}) => id != action.id)
            }
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return {
                ...state,
                nextID: 3,
                followingItems: initFollow.followingItems
            }
        default:
            return state

    }
}
export default FollowReducer