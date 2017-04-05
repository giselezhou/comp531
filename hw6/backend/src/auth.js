

const user = {
    username: 'jz65',
    password: '123'
}



const login = (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).send('Invalid body')
    }

    const name = req.body.username
    const psw = req.body.password
    if(user.username == name && user.password == psw){
        res.status(200).send({ username: name, result: "success"})
    }else{
        res.status(401).send('Unauthorized login')
    }
}

const logout = (req, res) => {
    res.status(200).send('OK')
}

const register = (req, res) => {

    if(!req.body.username || !req.body.email || !req.body.dob
        || !req.body.zipcode || !req.body.password ){
        res.status(400).send('Required parts missing')
    }

    res.status(200).send({ result: 'success', username: req.body.username})

}


const updatePSW = (req, res) => {
    if(!req.body.password){
        res.status(400).send('New password required')
    }
    res.status.send({ username: user.username, status: 'will not change' })

}
module.exports = app => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', logout)
    app.put('/password', updatePSW)

}