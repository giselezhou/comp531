var mongoose = require('mongoose')

// replace this "localhost" value with the one from heroku/mlab
var url = 'mongodb://jz65:zz123456@ds127731.mlab.com:27731/heroku_vmx6h9c3'

if (process.env.MONGOLAB_URI) {
    url = process.env.MONGOLAB_URI;
}

mongoose.connect(url)

///////////////////////////////////////////////////
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + url)
})
mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected')
})

process.once('SIGUSR2', function() {
    shutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2')
    })
})
process.on('SIGINT', function() {
    shutdown('app termination', function() {
        process.exit(0)
    })
})
process.on('SIGTERM', function() {
    shutdown('Heroku app shutdown', function() {
        process.exit(0)
    })
})
function shutdown(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg)
        callback()
    })
}
///////////////////////////////////////////////////
