// Expres modülünü içeri aktardık
const express = require('express');

// Express modülünden bir 'app' oluşturuyoruz
const app = express();

// 'app' değişkeni için GET isteği metodu tanımlıyoruz.
app.get('/ping', (req, res) => {
    res.end('pong');
});

// 8080 portunu dinliyoruz.
app.listen(8080, 'localhost');