const express = require('express');
const app = express();
const PORT = 3000;

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir : `${__dirname}/views/layouts`,
    extname : 'hbs',
    defaultLayout : 'index',
    partialsDir : `${__dirname}/views/partials`
}));

app.use(express.static('public'));

const fakeAPI = () => 'VUE3^';
const suggestAPI = () => {
    return [
        {
            name : 'Fatih',
            surname : 'Es',
            side : 'front'
        },
        {
            name : 'Yigit',
            surname : 'Karakus',
            side : 'front'
        },
        {
            name : 'Yılmaz',
            surname : 'Kalını',
            side : 'back'
        }
    ]
}
const control = true;

app.get('/', (req, res) => {
    // res.render('main', {layout : 'index'});
    res.render('main', {layout: 'index', bestOne : fakeAPI(), suggestion : suggestAPI(), resExist: control});
});

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`)
});