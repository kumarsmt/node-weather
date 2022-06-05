const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Sumit kumar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sumit Kumar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sumit Kumar'
    })
})
app.get('/weather', (req, res) => {
     
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            
            forecast( latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    forecast: forecastData.forecast,
                    location,
                    time: forecastData.time,
                    address: req.query.address
                })
            })
        })
        
    
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {

    }
    console.log(req.query)
    res.send({
        product: []
    })
})
app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name:'Sumit',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Sumit',
        errorMessage: '404 page not found'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('server is up on port ' + port)
})