const express = require('express');
const request = require('request');
const PORT = process.env.PORT || 3000;
const app = express();

const API_KEY = '6066172498887faad33228207f053586';

app.get('/', (req, res) => {
    let city = req.query.city;
    let url = `https://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    request(url, (error, response, body) => {
        let data = JSON.parse(body);
        if(res.statusCode == 200) {
            res.send('The weather is in ' + city + ' = ' + data.list[0].weather[0].description);
        }
    })
})


app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})