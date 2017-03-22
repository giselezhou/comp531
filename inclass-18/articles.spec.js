/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

    it('should give me three or more articles', (done) => {
        fetch(url('/articles'))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                expect(body.articles.length).to.have.above(2)
            })
            .then(done)
            .catch(done)
    }, 200)

    it('should add two articles with successive article ids, and return the article each time', (done) => {
        // add a new article
        // verify you get the article back with an id
        // verify the content of the article
        // add a second article
        // verify the article id increases by one
        // verify the second artice has the correct content
        let id1, id2
        fetch(url('/article'), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "text": "A new article!" })
        })
            .then( res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then( body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                expect(body.articles.length).to.eql(1)
                id1 = body.articles[0].id
            })
            .then( () => {return fetch(url('/article'), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "text": "A new article!" })
            })})
            .then( res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then( body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                expect(body.articles.length).to.eql(1)
                id2 = body.articles[0].id
                expect(id2).to.eql(id1+1)
            })
            .then(done)
            .catch(done)

    }, 200)

    it('should return an article with a specified id', (done) => {
        // call GET /articles first to find an id, perhaps one at random
        // then call GET /articles/id with the chosen id
        // validate that only one article is returned
        fetch(url('/articles'))
            .then( res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                expect(body.articles.length).to.have.above(3)
                return body.articles[0].id
            })
            .then(id => {
                const path = '/articles/'+id
                return fetch(url(path))
            })
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                expect(body.articles.length).to.eql(1)
            })
            .then(done)
            .catch(done)


    }, 500)

    it('should return nothing for an invalid id', (done) => {
        // call GET /articles/id where id is not a valid article id, perhaps 0
        // confirm that you get no results
        fetch(url('/articles/0'))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                expect(body.articles.length).to.eql(0)
            })
            .then(done)
            .catch(done)


    }, 500)

});