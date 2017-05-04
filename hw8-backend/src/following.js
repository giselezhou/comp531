const Profile = require('./model.js').Profile

const fetchFollowing = (req, res) => {
    let username = req.params.user? req.params.user : req.username
    if(!username) {
        res.status(401).send("Please login")
    }
    Profile.find({username: username}).exec(function(err, profile){
        if(err) throw err
        if(profile !== null && profile.length !== 0){
            const user = profile[0]
            res.status(200).send({username: username, following: user.following})
        }
    })

}

// in the frontend, I will check if the user have followed
// the new one or if the new one is exactly the user
// so, the backend do not have to be concerned about duplicate following
// if the new following does not exist, I will also send the following list to frontend
// frontend should check if the new to-add following is in the response list
// if it is not in the list, it means the new one does not exist and there will be an error message
const addFollowing = (req, res) => {
    const toAddUser = req.params.user
    const currentUser = req.username
    if(!currentUser){
        res.status(400).send({error:"Put following error: missing parameter 'user'"})
    }

    Profile.find({username: toAddUser}).exec(function(err, profile){
        if(profile != null && profile.length != 0) {
            Profile.findOneAndUpdate({username: currentUser},
                { $addToSet: {following: toAddUser}}, {upsert:true, new:true}, function(err, profile){})
        }

        Profile.find({username: currentUser}).exec(function(err, profile){
            const profileObj = profile[0]
            res.status(200).send({username: toAddUser, following: profileObj.following})
        })


    })
}

const removeFollowing = (req, res) => {
    const user = req.params.user
    const username = req.username
    if(!user){
        res.status(400).send({error:"Remove following error: missing parameter 'user'"})
    }
    Profile.findOneAndUpdate({username: username}, { $pull: {following: user}}, {new:true}, function(err, profile){})


    Profile.find({username: username}).exec(function(err, profile){
        const profileObj = profile[0]
        res.status(200).send({username: username, following: profileObj.following})
    })
}


module.exports = app => {
    app.delete('/following/:user', removeFollowing)
    app.put('/following/:user', addFollowing)
    app.get('/following/:user?', fetchFollowing)


}