import { expect } from 'chai'
import mockery from 'mockery'
import React from 'react'
import fetch, { mock } from 'mock-fetch'
import { fetchArticles } from './articleActions'
import { updateFilter } from './filterArticle'

describe('Validate Article actions', () => {
    let url, resource
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache: true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        url = require('../../../actions').url
        resource = require('../../../actions').resource
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch articles', (done) => {
        mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: {articles: [
                    { _id: 1, author: 'Scott', text: "1" },
                    { _id: 2, author: 'Scott', text: "2" }
                ]}
        }
        )

        fetchArticles()
            .then((res) => {
                expect(res).to.eql(
                     [
                        { _id: 1, author: 'Scott', text: "1" },
                        { _id: 2, author: 'Scott', text: "2" }
                    ])
            })


        done()
    })

    it('should update the search keyword', (done) => {

        updateFilter('test_filter')((action)=>{
            expect(action).to.eql({
                type: 'FILTER',
                keyword: 'test_filter'
            })
        })

        done()
    })

    it


})
