import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { expect } from 'chai'

describe('Validate Resource ', () => {
    let resource, url

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache: true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        resource = require('./actions').resource
        url = require('./actions').url
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('resource should be a resource', (done)=> {

        mock(`${url}/headlines`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{
                username: 'name',
                headline: 'my new headline'
            }
        })

        resource('GET', 'headlines')
            .then((res) => {
                expect(res).to.eql({
                    username: 'name',
                    headline: 'my new headline'
                })
            })
            .then(done)
            .catch(done)
    })

    it('resource should give me the http error', (done)=> {

        resource('GET', 'test').then((res) => {
        })
            .then(done)
            .catch((err) => {
                expect(err).to.exist
                done()
            })
    })

    it('resource should be POSTable', (done) => {
        const _username = 'testuser'
        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json: {
                username: _username,
                result: "success"
            }
        })

        resource('POST', 'login', { _username, password: '123' })
            .then((res) => {
                expect(res).to.eql({ username: 'testuser', result: "success"})
            })
            .then(done)
            .catch((err) => {
                expect(err).to.not.exist
                done()
            })
    })
})