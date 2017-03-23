

const FollowReducer = (state ={
    nextID: 0,
    followingItems: undefined
},action )=>{
    switch (action.type) {
        case 'ADD_FOLLOW':
            return {
                ...state,
                followingItems: [...state.followingItems,
                    {
                        avatar: action.toAdd.avatar,
                        headline: action.toAdd.headline,
                        username: action.toAdd.username,
                        id: state.nextID
                    }
                ],
                nextID: state.nextID + 1
            }
        case 'REMOVE_FOLLOW':
            return{
                ...state,
                followingItems: state.followingItems.filter((el) => {return el.id != action.id})
            }
        case 'LOGOUT':
        case 'NAV_TO_LANDING':
            // it will happens when users choose to logout
            // then all data will be in the initial state
            return {
                ...state,
                nextID: 0,
                followingItems: undefined
            }
        case 'LOGIN':
            return {
                ...state,
                followingItems: action.followings,
                nextID: action.followings.length
            }
        default:
            return state

    }
}
export default FollowReducer