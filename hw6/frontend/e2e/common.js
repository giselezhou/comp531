
import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'jz65test',
    password: 'piece-truck-market'
}

exports.regForm = {
    username: 'dsde',
    email: '123@de.sd',
    phone: '123-233-1234',
    birth: '10-11-1989',
    zipcode: '71234',
    password: '1',
    passwordConfirm: '1'
}


exports.login = () =>
    sleep(500)
        .then(findId('loginUserName').clear())
        .then(findId('loginPassword').clear())
        .then(findId('loginUserName').sendKeys(exports.creds.username))
        .then(findId('loginPassword').sendKeys(exports.creds.password))
        .then(findId('login').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.eql('You have logged out')
            })
        )