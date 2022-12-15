let express = require('express')
let moment =require('moment')
let app = express()
let port = 3005

let models = require('./models/index')

app.use(express.json())

app.get('/', (req,res) => {
    res.send('nama provinces dan cities')
})

function logUrl(req, res ,next) {
    console.log('Request URL ', req.originalUrl)
    next()
}

// app.get('/provinces', logUrl, (req,res) => {
//     res.json({message: "provinsi", data: [{id:1, cities: "Jakarta"},{id:2, cities: "Bandung"}]})
// })

app.get('/provinces', logUrl, (req,res) => {
    let findUser =  models.Provinces.findAll().then(function(result) { // untuk menampilkan semua data  pakai findAll
        if(result.length < 1) {
            res.json({message: "Data not available"})
        }

        res.json(result)
    })
})

app.post('/provinces', (req,res) => {
    let createUser = models.Provinces.create(req.body)
    if (!createUser) {
        console.log('Error create user')
    }

    res.json(req.body)
    // console.log(req.body)
    // res.send('nama provinsi: ' + req.body.provinsi)
})

app.get('/provinces/:id', (req,res) => {
    let findUser = models.Provinces.findOne({ where: {id: req.params.id} }).then(function(result) { // untuk menampilkan id setiap table pakai findOne
        if(result.length < 1) {
            res.json({message: "Data not available"})
        }   

        res.json(result)
    })
})


app.get('/Cities', logUrl, (req,res) => {
    let findUser =  models.cities.findAll().then(function(result) { // untuk menampilkan semua data  pakai findAll
        if(result.length < 1) {
            res.json({message: "Data not available"})
        }

        res.json(result)
    })
    // res.json({data: "cities", cities: [{id:1, cities: "Jakarta"},{id:2, cities: "Bandung"}]})
})

app.post('/Cities', (req,res) => {
    let createUser = models.cities.create(req.body)
    if (!createUser) {
        console.log('Error create user')
    }

    res.json(req.body)
})

app.get('/Cities/:id', (req,res) => {
    let findUser = models.cities.findOne({ where: {id: req.params.id} }).then(function(result) { // untuk menampilkan id setiap table pakai findOne
        if(result.length < 1) {
            res.json({message: "Data not available"})
        }   

        res.json(result)
    })
    // res.send('Cities ' + req.params.id)
})


app.listen(port, () => {
    console.log('Example app listen to port 3005')
})  