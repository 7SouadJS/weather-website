const request = require('request')

// take url in browser "darksky.net/dev"
const forecast = (latitude, longitude, callback) => {
const url = `https://api.darksky.net/forecast/8b3b11c81a7585da2f395740f12e5aad/`+ latitude + `,` + longitude +`?lang=fr&units=auto`

request({ url, json : true}, (error, { body }) => {
if (error) {
   callback('Unable to connect to weather services!', undefined)
} else if (body.error) {
   callback('Unable to find location', undefined)
} else {
   callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degree out, There is a  '+ body.currently.precipProbability + '% chances of rain')
     }
   })
}

//use the function forecast anywhere
module.exports = forecast
