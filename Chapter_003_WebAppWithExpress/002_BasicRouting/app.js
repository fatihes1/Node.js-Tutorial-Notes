// Expres modülünü içeri aktardık
const express = require('express');

// Express modülünden bir 'app' oluşturuyoruz
const app = express();

// Define a route
app.get('someUrl', (req, res, next) => {})

// Define GET, POST, PUT and DELETE method for the same domain

app.get('/myPath', (req, res, next) => {})
app.post('/myPath', (req, res, next) => {})
app.put('/myPath', (req, res, next) => {})
app.delete('/myPath', (req, res, next) => {})

/* Tüm bu yönlendirmeleri ayrı ayrı yapmak yerine zincirleyebiliriz. (route keyword)
app.route('/myPath')
    .get(function (req, res, next) {})
    .post(function (req, res, next) {})
    .put(function (req, res, next) {})
    .delete(function (req, res, next) {})
*/

// Eğer bir path (route) için hangi tarz istek gelirse gelsin,
// Aynı davranışı tanımlamak istiyorsanız aşağıdakilerden birini kullanabilirsiniz.
// 'all' or 'use' keyword
app.all('/allPath', (req, res, next) => {});
app.use('/allPath', (req, res, next) => {});

// Veya '*' (willcard) kullanabilirsiniz.
// Bu tüm yönlendirmeleri aynı path'e gönderir
app.use('/allPath', (req, res, next) => {});