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
    response.send('Hello World')
})

// using request parameters to display required page in the web app
// we can also use request queries to pass along some trivial data through the url itself
app.get('/:slug', (req, res) => {
    res.send(`welcome to ${req.params.slug}`)
})

// start server at chosen port
app.listen(port, () => {
    console.log(`app is listening at port: ${port} `)
})