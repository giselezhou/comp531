const md5 = require('md5')
let cookieParser = require('cookie-parser')


let cookieKey = 'sid'
let users = {}


const mySalt = () =>{
    let time = (new Date()).getMilliseconds()
    return time/1000 + Math.random() * 1000;
}
const register = (req, res) => {
    let username = req.body.username;
    let password = req.body.username;
    if(!username || !password){
        res.sendStatus(400).send("username or password missing")
        return
    }
    let salt = mySalt()
    users.push({username: { salt: salt, hash: md5(password + salt) }})
    res.send({ result: 'success', username: username})
}

const generateCode = (username) => {
    return  Math.floor(username.length * Math.random())
}
const login = (req, res) => {
    let username = req.body.username;
    let password = req.body.username;
    if(!username || !password){
        res.sendStatus(400).send("username or password missing")
        return
    }
    if(users[username]){
        let salt = users[username].salt
        let newHash = md5(password + salt)
        if(newHash === users[username].hash){
            res.cookie(cookieKey, generateCode(username), {MaxAge: 3600*1000, httpOnly: true })
            res.send({ username: username, result: 'success'})
            return
        }
    }

    res.sendStatus(401).send("username or password wrong")

}
module.exports = app => {
    app.use(cookieParser())
    app.post('/register', register);
    app.post('/login', login);

}