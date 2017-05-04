const md5 = require('md5')
if (!process.env.REDIS_URL) {
    process.env.REDIS_URL = 'redis://h:p087a180d9a59d11eea55e056732fd3eeff0fcab91eb51d29b00528ae808cf110@ec2-34-206-214-110.compute-1.amazonaws.com:11279'
}
const redis = require('redis').createClient(process.env.REDIS_URL)
const session = require('express-session')
const User = require('./model.js').User
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const Profile = require('./model.js').Profile
const mySecret = 'jdkshaduueih'
let cookieKey = 'sid'
const cookieParser = require('cookie-parser')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const clientSecret = "4510c3c5da1ea6c102751af7121c8c6b"
const clientID = "455940541405965"

const callbackURL = 'https://gisele-backend.herokuapp.com/auth/callback'
const config = {clientSecret, clientID, callbackURL}
let front_url = ''
passport.serializeUser(function(user, done){

    done(null, user.id)
})

passport.deserializeUser(function(id, done){


    User.findOne({auth_id: id}).exec(function(err, user) {

        done(null, user)
    })
})


passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done){

        const username = profile.displayName + "_fb"
        User.findOne({username: username}).exec(function(err, user) {

            if(!user || user.length === 0){
                const newUser = new User({username: username, auth_id: profile.id})
                new User(newUser).save(function (err, usr){
                    if(err) return console.log(err)
                })
                const newProfile = new Profile({username: username, headline: "", following:[], email: null,
                    zipcode: null, dob: new Date(1990,1,1).getTime(), avatar: null})
                new Profile(newProfile).save(function (err, usr){
                    if(err) return console.log(err)
                })
            }
            return done(null, profile)
        })
    }
))


function isLoggedIn (req, res, next) {

    if(req.isAuthenticated()){
        const fields = req.user.username.split('_')
        const _auth = {}
        _auth['facebook'] = fields[0]
        User.findOne({auth: _auth}).exec(function(err, user) {
            req.username = user? user.username : req.user.username
            next()
        })
    }else{
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
                    res.redirect('./login')
                }
            })
        }
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
    if (req.isAuthenticated()) {
        req.session.destroy()
        req.logout()
        res.status(200).send("OK")
    }else{
        redis.del(req.cookies[cookieKey])
        res.clearCookie(cookieKey)
        res.status(200).send('OK')
    }

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


const fbLoginSuccess = (req, res) => {

    res.redirect(front_url)
}

const fbLoginFail = ( err,req, res, next) => {
    if(err) {
        res.status(400);
        res.send({err: err.message});
    }

}

const frontend = (req, res, next) => {
    if(front_url === ''){
        front_url = req.headers.referer

    }

    next()
}

const fetchAuth = (req, res) =>{
    if(req.username){
        User.find({username: req.username}).exec(function(err, users) {
            const user = users[0]
            res.status(200).send({username:user.username, auth: user.auth})

        })
    }else{
        res.status(400)
    }
}

const hello = (req, res) => res.status(200).send({ hello: 'world' })

const linkAccount = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if(!username || !password){
        res.sendStatus(400).send("Link error: username or password missing")
        return
    }
    User.find({username: username}).exec(function(err, users){
        if(users === null || users.length === 0) {
            res.status(401).send("Link error: user not found")
        }else{
            let userObj = users[0]
            let salt = userObj.salt
            let newHash = myHash(password, salt)
            if(newHash === userObj.hash){
                Article.update({author:req.username}, {$set: {'author': username}}, { new: true, multi: true }, function(){})
                Article.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, { new: true, multi: true  }, function(){})
                Comment.update({author:req.username}, {$set: {'author': username}}, { new: true, multi: true  }, function(){})
                Profile.findOne({username: req.username}).exec(function(err, profile){
                    if(profile){
                        Profile.findOne({username: username}).exec(function(err, orginialUser) {
                            if(orginialUser){
                                const newFollowingUsers = orginialUser.following.concat(profile.following)
                                Profile.update({username: username}, {$set: {'following': newFollowingUsers}}, function(){})
                            }
                        })
                        Profile.update({username: req.username}, {$set: {'headline': "", 'following':[], 'email': null, 'zipcode': null, 'dob': new Date(1990,1,1).getTime(), 'avatar': null}}, function(){})
                    }
                })
                User.findOne({username: username}).exec(function(err, user){
                    if(user){
                        const userSplit = req.username.split('_');
                        const authObj = {}
                        authObj['facebook'] = userSplit[0]
                        User.update({username: username}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
                    }
                })
                res.status(200).send({ username: username, result: 'success'})
            }else{
                res.status(401).send("Link error: wrong password")
            }
        }
    })
}

const unlinkAccount = (req, res) => {
    const username = req.username
    //const company = 'facebook'
    User.findOne({username: username}).exec(function(err, user){
        if(user.auth && user.auth.length !== 0){
            User.update({username: username}, {$set: {auth: []}}, {new: true}, function(){
                res.status(200).send({result: 'unlinking with facebook account success'})
            })
        } else {
            res.status(400).send("no link account")
        }
    })
}
module.exports = app => {

    // for login and register, we do not have to check if the user is logged in
    // so put them before use(isLoggedIn)
    app.use(cookieParser())
    app.use(frontend)
    app.use(session({secret:'uiuedhjksadheuiashjkdeuiashjdk', resave: false, saveUninitialized: false}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {failureRedirect:'/fail'}), fbLoginSuccess, fbLoginFail)

    app.post('/login', login)
    app.post('/register', register)
    app.get('/', hello)
    app.use(isLoggedIn)
    app.get('/auth', fetchAuth)
    app.post('/link', linkAccount)
    app.put('/unlink', unlinkAccount)
    app.put('/logout', isLoggedIn, logout)
    app.put('/password',isLoggedIn, updatePSW)


}
