import { expect } from 'chai'
import NavReducer from './navReducer'

describe('Nav Reducer', () => {
    const initNav = { location: 'LANDING_PAGE' }
    it('should initialize state', () => {

        expect(NavReducer(initNav, {}))
            .to.eql({ location: 'LANDING_PAGE'})
    })

    it('should navigate',() => {
        expect(NavReducer(initNav, {type: 'NAV_TO_PROFILE'}))
            .to.eql({ location: 'PROFILE_PAGE'})
        expect(NavReducer(initNav, {type: 'NAV_TO_MAIN'}))
            .to.eql({ location: 'MAIN_PAGE'})
        expect(NavReducer(initNav, {type: 'NAV_TO_LANDING'}))
            .to.eql({ location: 'LANDING_PAGE'})
    })
})

