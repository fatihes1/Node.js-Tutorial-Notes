const express = require('express');

const PORT = process.env.PORT || 3000;
const geocode = require('./geocode');
const forecast = require('./forecast');
const app = express();

app.get('/', (req ,res) => {
    res.send('Welcome Page is here !')
});

app.get('/weather', (req, res) => {
    // res.send(req.query.city);
    geocode(req.query.city, (err, {enlem, boylam, konum}) => {
        if(err){
            return res.send(err);
        } else {
            forecast(enlem, boylam, (err, data) => {
                if(err){
                    return res.send(err);
                }

                const showData = {
                    sicaklik : data.temperature,
                    hava_durumu : data.weather_descriptions[0],
                    nem : data.humidity
                }

                res.send(showData);
            })
        }
    })
})



app.listen(PORT, () => {
    console.log("Server is up on port : "+ PORT)
})