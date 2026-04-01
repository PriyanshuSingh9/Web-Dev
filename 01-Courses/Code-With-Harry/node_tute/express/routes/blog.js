const express = require('express')
// declaring router as an express router
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send(("blog idhar hai"))
})

// define the about page route
router.get('/about', (req, res) => {
    res.send('this is the about page for blogs')
})

// exporting the router object
module.exports = router