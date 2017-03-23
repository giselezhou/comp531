
import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'
import {fetchEmail, fetchZip} from './profileActions'

describe('Validate Profile actions', () => {
    let url, resource
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache: true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        url = require('../../actions').url
        resource = require('../../actions').resource
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch the user profile information', (done) => {
        mock(`${url}/email/test`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json:{
                username: 'test', email: '65@rice.edu'
            }
        })
        mock(`${url}/zipcode/test`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json:{
                username: 'test', zipcode: '77005'
            }
        })
        fetchEmail('test')
            .then((res)=>{
                expect(res).to.eql('65@rice.edu')
            })
        fetchZip('test')
            .then((res)=>{
                expect(res).to.eql('77005')
            })

        done()
    })



})
