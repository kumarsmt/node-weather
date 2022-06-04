const request = require('request')
//const forecast = require('./utils/forecast')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=512f3101e13524960a09e85bc1700f98&query='+latitude+','+longitude+'&units=m'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!.',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const data = body
            callback(undefined,data.current.weather_descriptions[0] + ': It is currently ' + data.current.temperature + ' degrees out. It feels  like ' + data.current.feelslike + ' degrees out.')
            //console.log(data.location.name + ','+data.location.region)
    
        }
    
    })

}

module.exports = forecast
