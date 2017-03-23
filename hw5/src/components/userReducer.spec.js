import { expect } from 'chai'
import UserReducer from './userReducer'

describe('User Reducer', () => {

    const initUser = {

        zipcode: '',
        email: '',
        birthday: '',
        avatar: undefined,
        status: ''

    }
    it('should initialize state', () => {

        expect(
            UserReducer(initUser, {})
        ).to.eql(initUser)
    })



})

