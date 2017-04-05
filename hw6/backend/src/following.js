const defaultUser = 'jz65'
let followings = {
    'jz65': ['stub1', 'stub2'],
    'stub1': ['stub2'],
    'stub2': ['jz65'],
    'stub3': ['jz65', 'stub2']
}

const fetchFollowing = (req, res) => {
    let user = req.params.user? req.params.user : defaultUser
    if(!followings[user]){
        res.status(400).send('User not exists')
    }
    res.status(200).send({ username: user, following: followings[user]})

}

const addFollowing = (req, res) => {
    const user = req.params.user
    if(!user){
        res.status(400).send('user missing')
    }

    followings[defaultUser].push(user)
    res.status(200).send({ username: defaultUser, following: followings[defaultUser]})
}

const removeFollowing = (req, res) => {
    const user = req.params.user
    if(!user){
        res.status(400).send('user missing')
    }
    const list = followings[defaultUser].filter((e)=> e == user)
    if(list.length == 0){
        res.status(400).send('User not exists')
    }
    followings[defaultUser] = followings[defaultUser].filter(e => e != user)
    res.status(200).send({ username: defaultUser, following: followings[defaultUser]})
}


module.exports = app => {
    app.get('/following/:user?', fetchFollowing)
    app.put('/following/:user', addFollowing)
    app.delete('/following/:user', removeFollowing)

}