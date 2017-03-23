import { expect } from 'chai'
import FollowingReducer from './followingReducer'

describe('Following Reducer', () => {
    const initState = {
        nextID: 0,
        followingItems: undefined
    }
    it('should initialize state', () => {
        expect(FollowingReducer(initState,{})).to.eql(initState)
    })
})