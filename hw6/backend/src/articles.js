


const articles = [
        {
            _id: 3801412,
            text: "Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius.",
            date: "2015-05-15T23:07:14.469Z",
            img: null,
            comments: [ ],
            author: "cjb6test"
        },
        {
            _id: 5609955,
            text: "Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. ",
            date: "2015-07-18T00:33:53.358Z",
            img: null,
            comments: [ ],
            author: "cjb6"
        },
        {
            _id: 3626497,
            text: "Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. ",
            date: "2015-08-26T03:26:03.694Z",
            img: null,
            comments: [ ],
            author: "gradertest"
        }
    ]


const fetchArticle = (req, res) => {

    const id = req.params.id
    if (id != undefined) {
        const ret = articles.filter(e => e._id == id )
        if(ret.length == 0) {
            res.status(400).send('No article of this id')
        }else{
            res.status(200).send(JSON.stringify({
                "articles" : ret
            }))
        }
    }else{
        res.send(JSON.stringify({ "articles" : articles}))
    }




}
const updateArticle = (req, res) => {
    if(!req.params.id){
        res.status(400).send("missing parameters")
    }
    if(!req.body.text){
        res.status(400).send("there is no new article")
    }

    res.status(200).send({ articles: [articles[0]]})
}

const postArticle = (req, res) => {

    if(!req.body.text){
        res.status(200).send('there is no text')
    }else{
        const article = {"_id": articles.length + 1, "author": 'Gisele', "text" : req.body.text}
        articles.push(article)
        const ret = [ {"_id": articles.length, "author": 'Gisele', "text" : req.body.text} ]

        res.send(JSON.stringify({"articles": ret}))
    }

}

module.exports = (app) => {
    app.get('/articles/:id*?', fetchArticle)
    app.put('/articles/:id', updateArticle)
    app.post('/article', postArticle)

}









