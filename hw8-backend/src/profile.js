const Profile = require('./model.js').Profile
const uploadImage = require('./uploadCloudinary').uploadImage


const fetchHeadlines = (req, res) => {
    const users = req.params.users ? req.params.users.split(',') : [req.username]
    Profile.find({username: {$in: users}}).exec(function(err, profiles){
        if(profiles === null || profiles.length === 0) {
            res.status(400).send({error:"Get headlines error: user not found"})
        }
        let headlines = []
        profiles.forEach(profile => {
            headlines.push({username: profile.username, headline: profile.headline})
        })
        res.status(200).send({headlines: headlines})
    })

}

const putHeadline = (req,res) => {
    const headline = req.body.headline
    if(!headline){
        res.status(400).send({error:"Put headline error: missing parameter 'headline'"})

    }else{
        Profile.update({username: req.username}, { $set: {headline: headline}}, {new: true}, function(err, profile){
            if(err) throw err
            else {
                res.status(200).send({username:req.username, headline:req.body.headline})
            }
        })
    }

}

const  getEmail = (req,res) => {
    const user = req.params.user? req.params.user : req.username
    Profile.find({username: user}).exec(function(err, profile){
        if(profile === null || profile.length === 0){
            res.status(400).send({error:"Get email error: user not found"})
        } else {
            const userObj = profile[0]
            res.status(200).send({username: user, email: userObj.email})
        }
    })

}

const putEmail = (req,res) => {
    const email = req.body.email
    const username = req.username
    if(!email){
        res.status(400).send({error:"Put email error: missing parameter 'email'"})
    }else{
        Profile.update({username: username}, { $set: {email: email}}, {new: true}, function(err, profile){
            if(err) throw err
            else {
                res.status(200).send({username: username, email: email})
            }
        })
    }
}

const getZip = (req,res) => {
    const user = req.params.user? req.params.user : req.username
    Profile.find({username: user}).exec(function(err, profile){
        if(profile === null || profile.length === 0){
            res.status(400).send({error:"Get email error: user not found"})
        } else {
            const userObj = profile[0]
            res.status(200).send({username: user, zipcode: userObj.zipcode})
        }
    })
}

const putZip = (req,res) => {
    const zipcode = req.body.zipcode
    const username = req.username
    if(!zipcode){
        res.status(400).send({error:"Put email error: missing parameter 'zipcode'"})
    }else{
        Profile.update({username: username}, { $set: {email: zipcode}}, {new: true}, function(err, profile){
            if(err) throw err
            else {
                res.status(200).send({username: username, zipcode: profile.zipcode})
            }
        })
    }

}

const getAvatars = (req,res) => {
    if(!req.params.user){
        res.status(400).send({error:"Get avatar error: missing parameter 'user'"})
    }

    const user =  req.params.user.split(',')
    Profile.find({username: {$in: user}}).exec(function(err, profiles){
        if(profiles === null || profiles.length === 0) {
            res.status(400).send('Get avatars error: user not found')
        }
        let avatars = []
        profiles.forEach(profile => {
            avatars.push({username: profile.username, avatar: profile.avatar})
        })
        res.status(200).send({avatars: avatars})
    })
}

const putAvatar = (req,res) => {
    const user = req.username
    const fileurl = req.fileurl
    if(!fileurl){
        res.status(400).send('there is no avatar')
    }else {
        Profile.update({username: user}, { $set: {avatar: fileurl}}, {new: true}, function(err, profile){
            if(err) throw err
            else {
                res.status(200).send({username:user, avatar:fileurl})
            }
        })
    }


}

const getDob = (req, res) => {
    const user = req.params.user? req.params.user : req.username
    Profile.find({username: user}).exec(function(err, profile){
        if(profile === null || profile.length === 0){
            res.status(400).send({error:"Get email error: user not found"})
        } else {
            const userObj = profile[0]
            res.status(200).send({username: user, dob: userObj.dob})
        }
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