
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req,res) =>{
    let users = req.params.user.split(',')

    res.send({ headlines:  users.map((user) => ({
            username: user || 'jz65',
            headline: 'this is a headline'
        })
    )
    })
}

const putHeadline = (req,res) =>{
    res.send({
        username: 'jz65',
        headline: req.body.headline || 'there is no headline'
    })
}

const  getEmail = (req,res) =>{
    res.send({
        username: 'User'+req.params.user,
        email : 'jz65@rice.edu'
    })
}

const putEmail = (req,res) =>{
    res.send({
        username: 'jz65',
        email: req.body.email || 'there is no email'
    })
}

const getZip = (req,res) =>{
    res.send({
        username: 'User'+req.params.user,
        zipcode: '77055'
    })
}

const putZip = (req,res) =>{
    res.send({
        username: 'jz65',
        zipcode : req.body.zipcode || 'there is no zipcode'

    })
}

const getAvatars = (req,res) =>{
    let users = req.params.user.split(',')
    res.send({ avatars : users.map((avatar) => ({
        username: 'User'+avatar,
        avatar: 'avatar src'
    }))
    })
}

const putAvatar = (req,res) =>{
    res.send({
        username: 'jz65',
        avatar : req.body.avatar || 'there is no avatar'

    })
}
module.exports = app => {
    app.get('/', index)
    app.get('/headlines/:user?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZip)
    app.put('/zipcode', putZip)
    app.get('/avatars/:user?', getAvatars)
    app.put('/avatar', putAvatar)
}
