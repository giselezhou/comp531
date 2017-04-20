
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const Profile = require('./model.js').Profile
const md5 = require('md5')


const fetchArticle = (req, res) => {

    // first find if there is id
    const id = req.params.id
    if (id != undefined) {

        // check if is a post id
        Article.findById(id).exec(function(err, article){

            if( article == null || article.length == 0){
                // if not check if is an userid
                Article.find({author: id}).exec(function(err, _article){
                    if( _article == null || _article.length == 0){
                        res.status(200).send({articles: []})
                    }else{
                        res.status(200).send({articles: _article})
                    }
                })

            }else {

                res.status(200).send({articles: article})
            }

        })

    }else{
        //find the following of current user
        Profile.find({username: req.username}).exec(function(err, profile){
            const profileObj = profile[0]

            let following = profileObj.following

            following.push(req.username)
            // fetch all article related to current user
            Article.find({}).exec(function(err, articles){

                const ret = articles.filter(e =>{ return following.indexOf(e.author) > -1 } )
                res.status(200).send({articles: ret})
            })

        })


    }




}
const updateArticle = (req, res) => {
    const id = req.params.id
    if(!id){
        res.status(400).send({error:"Put article error: missing parameter 'id' "})
    }
    if(!req.body.text){
        res.status(400).send({error:"Put article error: missing parameter 'text'"})
    }

    Article.find({_id: id}).exec(function(err, articles){
        if( articles == null || articles.length == 0){
            res.status(400).send({error:"Put article error: article not found"})

        }

        if(!req.body.commentId) {

            if(articles[0].author == req.username){
                Article.findByIdAndUpdate(id, {$set: {text:req.body.text}}, {new: true},
                    function(err, article){
                    res.status(200).send({articles: article})
                })
            }

        }else if (req.body.commentId == -1){
            const commentId = md5(req.username + new Date().getTime())
            const comment = new Comment({commentId: commentId, author: req.username, text: req.body.text, date: new Date()})
            new Comment(comment).save(function(err, comment){
                if(err) throw err
            })
            Article.findByIdAndUpdate(id, {$addToSet: {comments: comment}},
                {upsert:true, new:true}, function(err, article){})
            Article.find({_id:id}).exec(function(err, article){
                res.status(200).send({articles: article})
            })

        }else if(req.body.commentId){
            Comment.find({commentId: req.body.commentId}).exec(function(err, comments){

                if(comments == null || comments.length === 0 ){
                    res.status(400).send({error:"Put articles error: comment not found"})
                }else if(comments[0].author == req.username ){

                    Comment.update({commentId: req.body.commentId},
                        { $set: {text:req.body.text}}, {new:true}, function(err, comments){})

                    Article.update({_id: id, 'comments.commentId':req.body.commentId},
                        {$set:{'comments.$.text':req.body.text}}, {new: true}, function(err, article){})
                    Article.find({_id: id}).exec(function(err, article){
                        res.status(200).send({articles: article})
                    })

                }
            })
        }


    })

}

const postArticle = (req, res) => {

    if(!req.body.text){
        res.status(400).send('there is no text')
    }else{

        const article = new Article({author: req.username, img: null,text: req.body.text,date: new Date(),comments: []})
        new Article(article).save(function(err, article){
            if(err) throw err
            else {
                res.status(200).send({articles: [article]})
            }
        })
    }

}

module.exports = (app) => {

    app.get('/articles/:id*?', fetchArticle)
    app.put('/articles/:id', updateArticle)
    app.post('/article', postArticle)

}









