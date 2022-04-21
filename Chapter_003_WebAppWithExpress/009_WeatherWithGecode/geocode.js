const request = require('request');
const API_KEY = 'pk.eyJ1IjoiY2FueWFoeWEiLCJhIjoiY2tucTZ2a3ZlMDI4ZzMzbnQzY29wd24wdiJ9.Stz8gEheY66xXHzzQTVZow'


const geocode = (location, callback) => {
    // encodeURIComponent(location)
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token='+ API_KEY +'&limit=1';
    // console.log(URL);
    request({url: URL, json: true}, (err, res, body) => {
        if(err){
            callback('The server is down', undefined);
        }
        // console.log(body.features[0].place_name);
        callback(undefined, {
            enlem : body.features[0].center[1],
            boylam : body.features[0].center[0],
            konum : body.features[0].place_name
        })
    })
}

module.exports = geocode