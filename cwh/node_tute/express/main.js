// import express package
const express = require("express")
// declare app as an express object
const app = express()
// setup server at localhost:3000
const port = 3000


// using middleware to statically share a page on the web
app.use(express.static('public'))

// program how the app respnds when user requests home page
app.get('/', (request, response) => {
    console.log('this is a get request')
    response.send('Hello World get')
})

// using request parameters to display required page in the web app
// we can also use request queries to pass along some trivial data through the url itself
app.get('/:slug', (req, res) => {
    res.send(`welcome to ${req.params.slug}`)
})

app.post('/table.html', (req, res) => {
    console.log('this is a post request')
    res.send("Hello World post")
})

// start server at chosen port
app.listen(port, () => {
    console.log(`app is listening at port: ${port} `)
})