import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { login } from '../landing/authActions'
import { register, update } from '../userActions'

describe('Validate Message Actions', () => {
    let url

    const rightReg = {
        birthday: '1993-1-1',
        username: 'right',
        psw: '123',
        pswConfirm: '123',
        phone: '100-100-1000',
        zipcode: '77005',
        email: '123@rice.edu'
    }
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

    it('should update error message', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            status: 401
        })
        login(undefined, undefined)((action)=>{
            expect(action).to.eql({type: 'LOGIN_ERR', errorMsg: "username or password missing!"})
        })
        login('username','123')((action)=>{
            expect(action).to.eql({type: 'LOGIN_ERR', errorMsg: "Wrong password or username!"})
        })


        register(undefined, undefined, undefined, undefined, undefined, undefined, undefined)((action)=>{
            expect(action).to.eql({type: 'REG_ERR', errorMsg: "Fill all required please!"})
        })

        register('2000-1-1', rightReg.username, rightReg.psw, rightReg.pswConfirm,
            rightReg.phone, rightReg.zipcode, rightReg.email)((action)=>{
            expect(action).to.eql({type: 'REG_ERR', errorMsg: 'You should be older than 18 years old!'})
        })

        register(rightReg.birthday, '123', rightReg.psw, rightReg.pswConfirm,
            rightReg.phone, rightReg.zipcode, rightReg.email)((action)=>{
            expect(action).to.eql({type: 'REG_ERR',
                errorMsg: 'Name should be starting with a letter and only contains letters and digits!'})
        })

        register(rightReg.birthday, rightReg.username, rightReg.psw, '0',
            rightReg.phone, rightReg.zipcode, rightReg.email)((action)=>{
            expect(action).to.eql({type: 'REG_ERR', errorMsg: 'Password does not match!'})
        })
        register(rightReg.birthday, rightReg.username, rightReg.psw, rightReg.pswConfirm,
            '123', rightReg.zipcode, rightReg.email)((action)=>{
            expect(action).to.eql({type: 'REG_ERR', errorMsg: 'Phone number should be like 100-100-1000'})
        })
        register(rightReg.birthday, rightReg.username, rightReg.psw, rightReg.pswConfirm,
            rightReg.phone, '123', rightReg.email)((action)=>{
            expect(action).to.eql({type: 'REG_ERR', errorMsg: 'Zip code should be five digits!'})

        })

        register(rightReg.birthday, rightReg.username, rightReg.psw, rightReg.pswConfirm,
            rightReg.phone, rightReg.zipcode, '123')((action)=>{
            expect(action).to.eql({type: 'REG_ERR', errorMsg: 'Email address is in wrong format!'})
        })


        update('123@', undefined)((action) => {
            expect(action).to.eql({type: 'UPDATE_ERR', errorMsg: 'Email address is in wrong format!' })
        })
        update(undefined, '123')((action) => {
            expect(action).to.eql({type: 'UPDATE_ERR', errorMsg: 'Zip code should be five digits!' })
        })
        done()

    })

    it('should update success message', (done) => {

        register(rightReg.birthday, rightReg.username , rightReg.psw, rightReg.pswConfirm,
            rightReg.phone, rightReg.zipcode, rightReg.email)((action)=>{
            expect(action).to.eql({
                type:'REG',
                username: rightReg.username,
                birthday: rightReg.birthday,
                phone: rightReg.phone,
                zipcode: rightReg.zipcode,
                email: rightReg.email,
                msg: 'Register successfully!'
            })
        })

        update('223@rice.edu', '12334')((action) => {
            expect(action).to.eql({type:'UPDATE_PROFILE', email: '223@rice.edu', zipcode: '12334'})
        })

        done()
    })
})

