const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')
const app = express()


// Define Paths for Express Config
console.log(__dirname);
console.log(path.join(__dirname, '../public'));


// (use) way to customize the server
const publicDirectory = path.join(__dirname, '../public')
// for changing the views name to template we do this
const viewsPath = path.join(__dirname, '../templates/views')
// set allow to set values for given express value
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)


// Set up static directroy to serve
app.use(express.static(publicDirectory))
// app.get('', (req, res) => {})
// app.com == app.com/help
// app.com/about


// render allows us to render the views can handel one of the handle bars templates
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yash Dayama'
    })
})

app.get('', (req, res) => {
    res.send('Hello Express')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yash Dayama'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a proper address'
        })
    }
  
    geocode(req.query.address)
    console.log(req.query.address, (error, { latitude, longitude, location }) =>{
        if(error){
            return res.send({ error: error})
        }
        
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error: error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }) 
    })
    res.send({
        forecast: 'It is Hot Outside',
        location: 'Ahmedabad',
        address: req.query.address
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yash Dayama',
        helpText: 'This is a help page Pagaraph'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name:'Yash Dayama',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Dayama',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on Port 3000.');
})