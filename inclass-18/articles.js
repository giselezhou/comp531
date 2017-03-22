
const articles =[
    { id:1, author: "Scott",body: "A post" },
    { id:2, author: "Scott1",body: "A post1" },
    { id:3, author: "Scott2",body: "A post2" }
]

const fetchArticle = (req, res) => {
    console.log('Payload received', req.params.id)
    const id = req.params.id
    if (id) {
        res.send(JSON.stringify({
            "articles" : articles.filter( el => el.id == id)
        }))
    }
    else {
        res.send(JSON.stringify({ "articles" : articles}))
    }

}

const postArticle = (req, res) => {
    console.log('Payload received', req.body)
    const article = {"id": articles.length + 1, "author": 'Gisele', "body" : req.body.text}
    articles.push(article)
    const ret = [ {"id": articles.length + 1, "author": 'Gisele', "body" : req.body.text} ]

    res.send(JSON.stringify({"articles": ret}))
}

module.exports = (app) => {
    app.get('/articles/:id*?', fetchArticle)
    app.post('/article', postArticle)
}