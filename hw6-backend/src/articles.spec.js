const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`


describe('Validate Article functionality', () => {

    let before, after

    it('should add a new article successfully', (done) => {
        fetch(url('/articles'))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                before = body.articles.length
            })
            .then(()=>{
                return fetch(url('/article'), {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "text": "A new article!" })
                })
            })
            .then( () => {
                return fetch(url('/articles'))
            })
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('articles')
                expect(body.articles).to.be.an('array')
                after = body.articles.length
                expect(before).to.eql(after-1)
            })
            .then(done())
    }, 200)



});