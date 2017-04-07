

const user = {
    username: 'jz65',
    password: '123'
}

const request = require('request')
const express = require('express')
const qs = require('querystring')
const md5 = require('md5')
const cookieParser = require('cookie-parser')

const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

var cookieKey = 'sid'


const callbackURL = 'http://localhost:3000/auth/callback'
const clientSecret = "e7327704c2a8d1f5d338f5f9f1a8294d"
const clientID = "1405990842755742"
const config = {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
}


var users = [];


passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            return done(null,profile);
        })
    }
))

passport.serializeUser(function(user, done){
    users[user.id] = user
    done(null, user.id)
})

passport.deserializeUser(function(id,done){
    var user = users[id]
    done(null, user)
})



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



const updatePSW = (req, res) => {
    if(!req.body.password){
        res.status(400).send('New password required')
    }
    res.status.send({ username: user.username, status: 'will not change' })

}

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

const index = (req, res) => {

    res.send({ hello: 'world' })

}
function logout(req, res) {
    req.logout()
    res.redirect('/')
}

function fail(req, res) {
    res.send('failed to login')
}

function profile(req, res) {
    res.send('ok now what', req.user)
}

const _logout = (req, res) => {
    res.status(200).send('OK!')
}

module.exports = (app) => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', _logout)
    app.put('/password', updatePSW)

    app.use(session({secret:'uiuedhjksadheuiashjkdeuiashjdk'}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(cookieParser())
    app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
    app.use('/auth/facebook', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
    app.use('/logout',logout)
    app.use('/profile', isLoggedIn, profile)
    app.use('/fail', fail)
    app.use('/', index)

}