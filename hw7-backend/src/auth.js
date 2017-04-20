const md5 = require('md5')

var redis = require('redis')
    .createClient('redis://h:p97f0876f71eec2974bbc3f42727a8e9ced9742d07a2798f86a78b79377127701@ec2-34-206-56-122.compute-1.amazonaws.com:38769')
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const mySecret = 'jdkshaduueih'
let cookieKey = 'sid'


function isLoggedIn (req, res, next) {
    let sid = req.cookies[cookieKey]
    if (!sid || sid == null || sid == undefined || sid == '') {
         res.status(401).send("Please login before operation!")
    } else {
        redis.hgetall(sid, (err, userObj) => {
            if(err) throw err;
            if (userObj) {
                // console.log(sid + ' mapped to ' + userObj.username)
                req.username = userObj.username
                next()
            } else {
                req.redirect('./login')
            }
        })
    }
}

// my salt is based on username and timestamp, there should not be duplicates.
const mySalt = (username) =>{
    let time = (new Date()).getMilliseconds()
    return md5(username+ (time/1000 + Math.random() * 1000));
}

const myHash = (password, salt) => {
    return  md5(password + salt)
}
const login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(!username || !password){
        res.sendStatus(400).send("Login error: username or password missing")
        return
    }
    User.find({username: username}).exec(function(err, users){
        if(users === null || users.length === 0) {
			res.status(401).send("Login error: user not found")
		}else{
            let userObj = users[0]
            let salt = userObj.salt
            let newHash = myHash(password, salt)
            if(newHash === userObj.hash){
                const key = md5((new Date()).getTime() + userObj.username + mySecret )
                redis.hmset(key, userObj)
                res.cookie(cookieKey, key, {MaxAge: 3600*1000, httpOnly: true })
                res.status(200).send({username: userObj.username, result: 'success'})
            }else{
                res.status(401).send("Login error: wrong password")
            }
        }
    })

}

const logout = (req, res) => {
    redis.del(req.cookies[cookieKey])
    res.clearCookie(cookieKey)
    res.status(200).send('OK')
}

const register = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let dob = req.body.dob;
    let zipcode = req.body.zipcode;

    if(!username || !email || !dob || !zipcode || !password ){
        res.status(400).send({error:"Required parts missing"})
    }else{

        // first I will check if there is someone using the username if so, will return a error message
        User.find({username: username}).exec(function(err, users){
            if(users.length != 0) {
                res.status(400).send({error:"Register error: username exists"})
            }else{
                const salt = mySalt(username)
                const hash = myHash(password, salt)
                const user = new User({username: username, salt: salt, hash: hash})
                new User(user).save(function(err, user){
                    if(err) throw err
                })
                const profile = new Profile({ username: username, dob: dob, email: email, zipcode: zipcode, avatar: null,
                    headline: "", following: []})
                new Profile(profile).save(function(err, profile){
                    if(err) throw err
                })
                res.status(200).send({ result: 'success', username: username})
            }
        })
    }


}


const updatePSW = (req, res) => {
    let username = req.username;
    let password = req.body.password;
    if(!password){
        res.status(400).send({error:"Put password error: new password required"})
    }else{
        User.find({username: username}).exec(function(err, users){
            const user = users[0]
            // first check if the old psw and new psw have the same hash
            // if so, tell the user to choose another one
            if(myHash(password, user.salt) == user.hash){
                res.status(400).send({error:"Put password error: choose a new password"})
            }else{
                const salt = mySalt(username)
                const hash = myHash(password, salt)
                User.update({username: username}, {$set: { salt: salt, hash: hash}}, {new: true}, function(err, user) {
                    if(err) throw err
                    else {
                        res.send({ username: username, status:'Password changed' })
                    }
                })


            }
        })
    }

}

const hello = (req, res) => res.status(200).send({ hello: 'world' })
module.exports = app => {

    // for login and register, we do not have to check if the user is logged in
    // so put them before use(isLoggedIn)
    app.post('/login', login)
    app.post('/register', register)
    app.get('/', hello)
    app.use(isLoggedIn)
    app.put('/logout', isLoggedIn, logout)
    app.put('/password',isLoggedIn, updatePSW)

}
