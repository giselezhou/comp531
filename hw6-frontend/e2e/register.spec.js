import { expect } from 'chai'
import {  go, sleep, findId, findClassName } from './selenium'
import common from './common'

describe('Test * Register a new user', () => {


    before('should go to landing page', (done) => {
        go().then(done)
    })

    it('should register a new user', (done) => {
        sleep(500)
            .then(findId('name').clear())
            .then(findId('displayName').clear())
            .then(findId('email').clear())
            .then(findId('phone').clear())
            .then(findId('zipcode').clear())
            .then(findId('password').clear())
            .then(findId('passwordConfirm').clear())
            .then(findId('name').sendKeys(common.regForm.username))
            .then(findId('email').sendKeys(common.regForm.email))
            .then(findId('phone').sendKeys(common.regForm.phone))
            .then(findId('zipcode').sendKeys(common.regForm.zipcode))
            .then(findId('birthday').sendKeys(common.regForm.birth))
            .then(findId('password').sendKeys(common.regForm.password))
            .then(findId('passwordConfirm').sendKeys(common.regForm.passwordConfirm))
            .then(findId('register').click())
            .then(sleep(500))
            .then(findId('message').then((e)=>{
                expect(e).to.exist
            }))
            .then(sleep(500))
            .then(done)
    })


})
