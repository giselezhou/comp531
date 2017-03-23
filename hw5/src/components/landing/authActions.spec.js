import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'
import {login, logout} from './authActions'
describe('Validate Authentication', () => {
    let url
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache: true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        url = require('../../actions').url

    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
    it('should log in a user', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {
                username: 'testuser', result: 'success'
            }
        })
        login('testuser','psw')((action)=>{
            expect(action).to.eql({type: 'LOGIN', username: 'testuser'})
        })
        done()
    })
    it('should not log in an invalid user', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }, {
            username: 'testuser', password: 'success'
        })
        login(undefined, undefined)((action)=>{
            expect(action).to.eql({type: 'LOGIN_ERR', errorMsg: "username or password missing!"})
        })
        login('username', '123')((action)=>{
            expect(action).to.eql({type: 'LOGIN_ERR', errorMsg: "username or password wrong!"})
        })
        done()
    })

    it('should log out a user', (done) => {
        mock(`${url}/logout`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        })
        logout()((action)=>{
            expect(action).to.eql({type:'LOGOUT'})
        })
        done()
    })


})
