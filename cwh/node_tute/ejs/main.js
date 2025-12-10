const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const siteName = "Adidas"
    const search = "80000 ke joote"
    const arr = [1, 2, 3, 4]
    // we use a separate views folder to work with ejs adn in the location param of render we can just write file name
    // there is no need to specify the location or extention
    res.render('index', { siteName: siteName, search: search, arr })
    // here variables siteName and search are being passed to the index file to use
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})