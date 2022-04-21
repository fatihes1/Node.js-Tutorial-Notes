const request = require('request');
const API_KEY = '7c3dc456a83a09efe450c362d936d771'

const forecast = (enlem, boylam, callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key='+API_KEY+'&query=' + enlem + ',' + boylam + '&units=m';
    request({url: URL, json: true}, (err, res, body) => {
        if(err){
            callback(err, undefined);
        }
        callback(undefined, body.current)
    })
}

module.exports = forecast
