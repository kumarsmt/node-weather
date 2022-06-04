const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=5f8274bac05151558d13e1563f2d059e&query=' + encodeURIComponent(address)

    request( {url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.data.length == 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].county + ' ' + body.data[0].region
                
            })
        }
    })
}

module.exports = geocode