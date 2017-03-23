import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as userActions from './userActions'

describe('Validate User Actions', () => {
    let url
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache: true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        url = require('../actions').url
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should update headline', (done) => {

        mock(`${url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            json: {username: 'sep1test' , headline: 'A new headline!'}
        })

        userActions.updateStatus('does not matter')(
            (action) => {
                expect(action).to.eql({type: 'UPDATE_STATUS', status: 'does not matter'})
            })
        done()

    })

})