const request = require('request');

const API_KEY = 'pk.eyJ1IjoiY2FueWFoeWEiLCJhIjoiY2tucTZ2a3ZlMDI4ZzMzbnQzY29wd24wdiJ9.Stz8gEheY66xXHzzQTVZow'
const geocode = (city, callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token='+ API_KEY +'&limit=1';
    request({url: URL, json: true}, (err, res, body) => {
        if(err){
            callback('Server is down', undefined)
        }
        // console.log(body.features[0]);
        callback(undefined, {
            enlem : body.features[0].center[1],
            boylam : body.features[0].center[0],
            konum : body.features[0].place_name
        })
    })
}

module.exports = geocode