const request = require('request');


const API_KEY = '7c3dc456a83a09efe450c362d936d771'

const forecast = (city, callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key='+API_KEY+'&query='+city
    request({url : URL, json : true}, (err, res, body) => {
        if(err) {
            callback('Bağlantı sorunusu var', undefined);
        } else {
            callback(undefined, body.current)
        }
        
    })
}

module.exports = forecast;
