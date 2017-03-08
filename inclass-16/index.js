
const express = require('express')
const bodyParser = require('body-parser')
const articles =[
    { id:1, author: "Scott",body: "A post" },
    { id:2, author: "Scott1",body: "A post1" },
    { id:3, author: "Scott2",body: "A post2" }
]
const addArticle = (req, res) => {
    console.log('Payload received', req.body)
    articles.push({"id":articles.length+1, "author": 'Gisele', "text" :req.body})
    res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })
const getArticle = (req, res) => res.send( JSON.stringify({ "articles" : articles}))

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
        const addr = server.address()
        console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

