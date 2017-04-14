
const defaultUser = 'jz65'
const uploadImage = require('./uploadCloudinary')
let profiles = {
    'jz65': {
        headline: 'This is jz65',
        email: 'jz65@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        dob: (new Date('1/8/1978')).getMilliseconds()
    },
    'stub1': {
        headline: 'This is stub1',
        email: 'stub1@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        dob: (new Date('1/8/1978')).getMilliseconds()
    },
    'stub2': {
        headline: 'This is stub2',
        email: 'stub2@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        dob: (new Date('1/8/1978')).getMilliseconds()
    },
    'stub3': {
        headline: 'This is stub3',
        email: 'stub3@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        dob: (new Date('1/8/1978')).getMilliseconds()
    }

}




const fetchHeadlines = (req, res) => {
    if(req.params.users == undefined){
        res.status(200).send({ headlines: [{
            username: defaultUser,
            headline: profiles[defaultUser].headline
        }]
        })
    }else{
        let users = req.params.users.split(',')

        res.send({ headlines:  users.map((user) => ({
            username: user,
            headline: profiles[user].headline || 'default headline'
        }))
        })
    }


}

const putHeadline = (req,res) => {
    if(!req.body.headline){
        res.status(400).send('there is no headline')

    }else{
        profiles[defaultUser].headline = req.body.headline
        res.send({
            username: defaultUser,
            headline: req.body.headline
        })
    }

}

const  getEmail = (req,res) => {
    const user = req.params.user? req.params.user : defaultUser
    if(!profiles[user]){
        res.status(400).send('user not exist')
    }else{
        res.send({
            username: user,
            email : profiles[user].email
        })
    }

}

const putEmail = (req,res) => {
    if(!req.body.email){
        res.status(400).send('there is no email')
    }
    profiles[defaultUser].email = req.body.email
    res.send({
        username: defaultUser,
        email : req.body.email

    })
}

const getZip = (req,res) => {
    const user = req.params.user? req.params.user : defaultUser
    if(!profiles[user]){
        res.status(400).send('user not exist')
    }else {
        res.send({
            username: user,
            zipcode: profiles[user].zipcode
        })
    }


}

const putZip = (req,res) => {
    if(!req.body.zipcode){
        res.status(400).send('there is no zipcode')
    }else{
        profiles[defaultUser].zipcode = req.body.zipcode
        res.send({
            username: defaultUser,
            zipcode : req.body.zipcode

        })
    }

}

const getAvatars = (req,res) => {
    if(!req.params.user){
        res.status(200).send({ avatars : {
            username: defaultUser,
            avatar: profiles[defaultUser].avatar
        }
        })
    }
    let users = req.params.user.split(',')

    res.send({ avatars : users.map((user) => ({
        username: user,
        avatar: profiles[user].avatar
    }))
    })
}

const putAvatar = (req,res) => {

    if(!req.fileurl || !req.fileid){
        res.status(401).send('image upload error')
    }else {

        const avatar = cloudinary.image(req.fileid, {
            format: "png", width: 100, height: 130, crop: "fill"
        })


        res.send(`Uploaded: ${req.fileurl}<br/><a href="${req.fileurl}">${image}</a>`);

    }


}

const getDob = (req, res) => {
    let user = defaultUser
    res.send({
        username: user,
        dob: profiles[user].dob
    })
}
module.exports = app => {
    app.get('/headlines/:users*?', fetchHeadlines)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/dob', getDob)
    app.get('/zipcode/:user?', getZip)
    app.put('/zipcode', putZip)
    app.get('/avatars/:user?', getAvatars)
    app.put('/avatar',uploadImage('avatar'),  putAvatar)
}