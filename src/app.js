const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebards engine and views location
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mateo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name:'Mateo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help text',
        title: 'Help page',
        name:'Mateo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                feelslike: forecastData.feelslike,
                temperature: forecastData.temperature,
                description: forecastData.description,
                location: location,
                address: req.query.address
            })
        })
        
    })
    
   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search terms'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article was not found',
        title: 'Help page',
        name:'Mateo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: '404 message brah',
        title: 'Help page',
        name:'Mateo'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})