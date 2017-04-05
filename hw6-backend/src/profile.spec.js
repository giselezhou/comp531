const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`


describe('Validate Headline functionality', () => {

    const newHeadline = 'this is the new'

    it('should update headline successfully', (done) => {
        fetch(url('/headline'), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "headline": newHeadline })
        }).then( () =>{
                return fetch(url('/headlines'))
            })
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.have.property('headlines')
                expect(body.headlines).to.be.an('array')
                expect(body.headlines.length).to.eql(1)
                expect(body.headlines[0].headline).to.eql(newHeadline)
            })

            .then(done())
    }, 200)



});