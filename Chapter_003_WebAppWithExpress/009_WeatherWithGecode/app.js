const express = require('express');
const forecast = require('./forecast');
const geocode = require('./geocode');

const PORT = process.env.PORT || 3000;


const app = express();


app.get('/', (req, res) => {
    res.send('Welcome page for full weather api & geocode exercise');
})

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        res.send('Please enter a location !');
    }
    geocode(req.query.location, (err, {enlem, boylam, konum}) => {
        if(err){
            return res.send({err})
        }
        forecast(enlem, boylam, (err,data) => {
            if(err){
                return res.send(err);
            }
            const showData = {
                konum: konum,
                olculen_zaman : data.observation_time,
                sicaklik : data.temperature,
                hava_durumu : data.weather_descriptions[0],
                ruzger_hizi : data.wind_speed,
                nem : data.humidity,

            }
            res.send(showData)
        })

    })
})



app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
})
