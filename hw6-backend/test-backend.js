#!/usr/bin/env node
const fs = require('fs')
const fetch = require('node-fetch')

const config = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'))
console.log(`Checking for ${config.netid} site ${config.backend}`)

const checkStatus = endpoint => (r) => {
    if (r.status != 200) {
        const msg = `Got GET ${endpoint} received ${r.status} status response`
        console.error(msg)
        throw new Error(msg)
    }
    return r.json()
}

const get = endpoint => fetch(`${config.backend}${endpoint}`)
    .then(checkStatus(endpoint)).then(r => {
        console.log(`GET ${endpoint}`, r)
        return r
    })

const put = endpoint => fetch(`${config.backend}${endpoint}`, { method: 'PUT' })
    .then(checkStatus(endpoint)).then(r => {
        console.log(`PUT ${endpoint}`, r)
        return r
    })

const getArticles = (oldArticles) => get('/articles').then(r => {
    const a = r.articles
    if (!a || a.length < 3) {
        const msg = `FAIL: Expected at least 3 articles from GET /articles but found ${a.length}`
        console.error(msg)
    } else {
        console.log(`OK: GET /articles returned ${a.length} articles, expecting at least 3`)
    }
    if (oldArticles) {
        if (oldArticles.length != a.length - 1) {
            const msg = `FAIL: expected one new article added by found ${oldArticles.length} + 1 = ${a.length}`
            console.error(msg)
            throw new Error(msg)
        } else {
            console.log('OK: GET /articles returned one additional article')
        }
    }
    return a
})

const checkText = (text) => r => {
    if (r.articles) { r = r.articles }
    if (Array.isArray(r)) {
        if (r.length != 1) {
            const msg = `FAIL: Expected 1 new article added but found ${r.length} articles`
            console.error(msg)
            throw new Error(msg)
        }
        r = r[0]
    }
    console.log('article ', r)
    if (!r.text) {
        const msg = `FAIL: Expected field "text" in article but found ${JSON.stringify(r)}`
        console.error(msg)
        throw new Error(msg)
    }
    if (r.text !== text) {
        console.error(`FAIL: Article did not have the correct message: ${r.text} vs ${text}`)
    } else {
        console.log(`OK: article text was correct`)
    }
    return r
}

const postNew = (oldArticles) => {
    const payload = { text: 'Hello World!' }
    console.log(`POST /article -d`, payload)
    return fetch(`${config.backend}/article`, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
    })
        .then(checkStatus('article'))
        .then(checkText(payload.text))
        .then(r => {
            const id = r.id || r._id
            return get(`/articles/${id}`)
        })
        .then(checkText(payload.text))
        .then(r => {
            const id = r.id || r._id
            console.log(`OK GET /articles/${id} got the new article correctly`)
        })
        .then(_ => oldArticles)
}

const testGets = () => Promise.all([
    '/headlines' , '/headlines/' + config['netid'],
    '/email', '/email/' + config['netid'],
    '/zipcode', '/zipcode/' + config['netid'],
    '/avatars', '/avatars/' + config['netid']
].map(v => get(v)))

const testPuts = () => Promise.all([
    '/headline', '/email', '/zipcode', '/avatar'
].map(v => put(v)))

get('/')
    .then(console.log)
    .then(getArticles)
    .then(postNew)
    .then(getArticles)
    .then(testGets)
    .then(testPuts)
    .then(_ => console.log('SUCCESS!'))
    .catch(e => {
        console.error('There was an ERROR', e)
    })

