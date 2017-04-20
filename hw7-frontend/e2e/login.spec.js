import { expect } from 'chai'
import {  go, sleep, findId, findClassName, findAllClassName, findCSS, findAllCSS } from './selenium'
import common from './common'

describe('Test * Login in as test user', () => {


    before('should go to landing page', (done) => {
        go()
            .then(findId('loginUserName').clear())
            .then(findId('loginPassword').clear())
            .then(findId('loginUserName').sendKeys(common.creds.username))
            .then(findId('loginPassword').sendKeys(common.creds.password))
            .then(findId('login').click())
            .then(sleep(2000))
            .then(done)
    })

    it('should login successfully', (done) => {
        sleep(500)
            .then(findId('main').then((e)=>{
                expect(e).to.exist
            }))
            .then(sleep(500))
            .then(done)
    })

   it('should create a new article and validate the article appears in the feed', (done) => {
        sleep(500)
            .then(findId('newArticleText').sendKeys("a new test article"))
            .then(findId('post').click())
            .then(sleep(500))
            .then(findClassName('card-text').getText()
                .then( text => {
                expect(text).to.be.eql("a new test article")
            }))
            .then(sleep(1000))
            .then(done)
    })

    it('should edit an article and validate the article text has updated', (done) => {
        let newArticle = 'this is new'
        sleep(500)
            .then(findClassName('card-text').clear())
            .then(findClassName('card-text').sendKeys(newArticle))
            .then(findCSS('[name = "edit"]').click())
            .then(findClassName('card-text').getText()
                .then( text => {
                    expect(text).to.be.eql(newArticle)
                }))
            .then(sleep(500))
            .then(done)
    })

    it('should update the status headline and verify the change', (done) => {
        let newHeadline = 'this is new headline'
        sleep(500)
            .then(findId('headline').clear())
            .then(findId('headline').sendKeys(newHeadline))
            .then(findId('postHeadline').click())
            .then(sleep(500))
            .then(findId('currentHeadline').getText()
                .then( text => {
                    expect(text).to.be.eql(newHeadline)
                }))
            .then(sleep(500))
            .then(done)
    })

    it('should count the number of followed users', (done) => {
        sleep(500)
            .then(findAllCSS('[name = "following"]')
                .then( list =>{
                    return list.length
                }))
            .then(sleep(500))
            .then(done)
    })

    it('should add the user "Follower" to the list of followed users and verify the count increases by one', (done) => {
        let before, after
        sleep(500)
            .then(findAllCSS('[name = "following"]')
                .then( list =>{
                    before = list.length
                }))
            .then(findId('newFollowing').clear())
            .then(findId('newFollowing').sendKeys('rx4'))
            .then(findId('addNewFollowing').click())
            .then(sleep(500))
            .then(findAllCSS('[name = "following"]')
                .then( list =>{
                    after = list.length
                    expect(after).to.be.eql(before+1)
                }))
            .then(sleep(500))
            .then(done)
    })
    it('should remove the user "Follower" to the list of followed users and verify the count decreases by one', (done) => {
        let before, after
        sleep(500)
            .then(findAllCSS('[name = "following"]')
                .then( list =>{
                    before = list.length
                }))
            .then(findAllCSS('[name = "unFollow"]')
                .then(res => {
                    res[res.length-1].click()
                }))
            .then(sleep(500))
            .then(findAllCSS('[name = "following"]')
                .then( list =>{
                    after = list.length
                    expect(after).to.be.eql(before-1)
                }))
            .then(sleep(500))
            .then(done)
    })

    it('should search for "Only One Article Like This" and verify only one article shows, and verify the author', (done) => {
        let searchFor = 'Only One Article Like This'
        sleep(500)
            .then(findId('filterBar').clear())
            .then(findId('filterBar').sendKeys(searchFor))
            .then(findAllCSS('[name = "articleText"]')
                .then(res => {
                    expect(res.length).to.eql(1)
                }))
            .then(findClassName('card-title').getText()
                .then(author => {
                    expect(author).to.eql('jz65test')
                }))
            .then(done)
    })

    it('should navigate to the profile view', (done) => {
        sleep(500)
            .then(findId('Profile Page').click())
            .then(done)
    })

   it('should update the user\'s email and verify', (done) => {
        let newEmail = '123@ricddee.edu'
        sleep(500)
            .then(findId('newEmail').clear())
            .then(findId('newEmail').sendKeys(newEmail))
            .then(findId('updateProfile').click())
            .then(sleep(100))
            .then(findId('displayInfoEmail').getText()
                .then( res => {
                    expect(res).to.eql(newEmail)
                }))
            .then(done)
    })

    it('should update the user\'s zipcode and verify', (done) => {
        let newZipcode = '90922'
        sleep(500)
            .then(findId('newZipcode').clear())
            .then(findId('newZipcode').sendKeys(newZipcode))
            .then(findId('updateProfile').click())
            .then(sleep(100))
            .then(findId('displayZip').getText()
                .then( res => {
                    expect(res).to.eql(newZipcode)
                }))
            .then(done)
    })
    it('should update the user\'s password, verify a "will not change" message is returned', (done) => {
        let newPsw = '2'
        sleep(500)
            .then(findId('newPSW').clear())
            .then(findId('newPSW').sendKeys(newPsw))
            .then(findId('newPSWConfirm').clear())
            .then(findId('newPSWConfirm').sendKeys(newPsw))
            .then(findId('updateProfile').click())
            .then(sleep(500))
            .then(findClassName('alert-success').getText()
                .then( res => {
                    expect(res).to.eql('will not change')
                }))
            .then(done)
    })


    after('should logout', (done) => {
        sleep(500)
            .then(findId('Logout').click())
            .then(sleep(500))
            .then(findId('landing').then((e)=>{
                expect(e).to.exist
            }))
            .then(sleep(500))
            .then(done)
    })

})