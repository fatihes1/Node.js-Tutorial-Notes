const express = require('express');
const forecast = require('./forecast');
const PORT = process.env.PORT || 3000
const app = express();


app.get('/', (req, res, err) => {
    res.send('Welcome Page is here !');
})

app.get('/weather', (req, res) => {
    if(!req.query.city) {
        res.send("Lütfen bir şehir adı ekleyiniz !");
    }
    forecast(req.query.city, (err, data) => {
        res.json(data);
    })
})


app.listen(PORT, ()=> {
    console.log('The server is up on port ' + PORT)
})





