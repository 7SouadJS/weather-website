const path = require('path')
const express = require('express')
//download hbs
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
//add partials 
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
      title : 'Weather App',
      name : 'BOUZID SOUAD MEAD'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
       title : 'About Me Strong Girl',
       name :  'BOUZID SOUAD MEAD'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
      title : 'HELP-YOURSELF-FIRST',
      done :'I feel so powerful inside me ,then NOTHING will stop me,I WAKE UP AGAIN ',
      name: 'BOUZID SOUAD MEAD'
    })
})

app.get('/weather',(req, res)=>{
        //if there's no adress
        if(!req.query.address){
         return res.send({
        error:"You must provide an adress!"
                        })    }
        geocode(req.query.address, (error,{latitude,longitude,location} = {} ) => {
        if(error){
            return res.send({error})
                 }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send ({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
        })
})

//adding products
app.get('/products',(req, res)=>{
    if (!req.query.search){
        return res.send({
          error:'You must provide a search term'  
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'SOUAD MEAD',
        errorMessage: 'HELP ARTICLE NOT FOUND.'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'SOUAD MEAD',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port' + port)
})
