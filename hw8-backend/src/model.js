// this is model.js
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
    commentId: String, author: String, date: Date, text: String
})
var articleSchema = new mongoose.Schema({
    id: String, author: String, img: String, date: Date, text: String,
    comments: [ commentSchema ]
})

var profileSchema = new mongoose.Schema({
    username: String, headline: String, dob: Number,
    following: [ String ], email: String, zipcode: String,
    avatar: String
})

var userSchema = new mongoose.Schema({
    username: String, salt: String, hash: String, auth_id: String, auth: []
})
exports.Article = mongoose.model('article', articleSchema)
exports.Comment = mongoose.model('comment', commentSchema)
exports.User = mongoose.model('user', userSchema)
exports.Profile = mongoose.model('profile', profileSchema)