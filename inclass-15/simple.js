const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
    let body = ''
    req.on('data', function(chunk) {
        body += chunk
    })
    req.on('end', function() {
        req.body = body
        server(req, res)
    })
}
function respond (url, body, method) {
    var res
    switch(url){
        case "/" :
            res = { hello: 'world'}
            break
        case "/articles":
            if(method == 'GET')
                res = { articles: [
                    { id:1, author: "Scott",body: "A post" },
                    { id:2, author: "Scott1",body: "A post1" },
                    { id:3, author: "Scott2",body: "A post2" }
                ]}
            break
        case "/login" :
            if(method == 'POST') {
                var _body = JSON.parse(body)
                res = {username : _body[username], result:'success'}
            }
            break
        case "/logout" :
            if(method == 'PUT')
                res = "OK"
            break
        default : break
    }
    return res
}
function server(req, res) {
    console.log('Request method        :', req.method)
    console.log('Request URL           :', req.url)
    console.log('Request content-type  :', req.headers['content-type'])
    console.log('Request payload       :', req.body)

    const payload = respond(req.url, req.body, req.method)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(payload))
}

