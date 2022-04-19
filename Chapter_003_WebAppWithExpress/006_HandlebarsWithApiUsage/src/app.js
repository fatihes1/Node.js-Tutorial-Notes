const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const PORT = process.env.PORT || 3000;

// Express modülünden uygulama oluştur.
const app = express();
// public klasörünün dizini
const pathOfPublicDirectory = path.join(__dirname, '../public');
// public/views klasörünün dizini
const pathOfViews = path.join(__dirname, '../public/templates/views');

// partials => Her sayfada değişmeyen footer, navbar gibi componentlerin bulunduğu alan
const pathOfPartials = path.join(__dirname, '../public/templates/partials');

// views'ların bulunduğu yeri uygulamaya belirt
app.set('views', pathOfViews);

// view engine olarak hbs'i ata
app.set('view engine', 'hbs');

// Express için kullanılacak (.use) static dosyaların yerini belirt
app.use(express.static(pathOfPublicDirectory));

//hbs'e partials dizinin belirt ki verileri çekebilsin
hbs.registerPartials(pathOfPartials);



// Yönlendirmeleri tanımla (Home Page)
app.get('/', (req, res) => {
    // render edilecek dosya adı ve dinamik değişken adlarını (obje olarak) ver.
    res.render('index', { title : 'Weather Application', name : 'Fatih ES' })
})

// Yönlendirmeleri tanımla (About Page)
app.get('/about', (req, res) => {
    // render edilecek dosya adı ve dinamik değişken adlarını (obje olarak) ver.
    res.render('about', { title : 'About Page', name : 'Fatih ES' })
})

// Yönlendirmeleri tanımla (Help Page)
app.get('/help', (req, res) => {
    // render edilecek dosya adı ve dinamik değişken adlarını (obje olarak) ver.
    res.render('help', { title : 'Help Page', helpText: 'Showing help message !', name : 'Fatih ES' })
})

// help dizini altında herhangi bir dizine gidilemez, bunu kısıtla !
app.get('/help/*', (req, res) => {
    // Render edilecek view sayfası --> 404
    res.render("404", {
        errorTitle : "Hata !",
        errorsubTitle : "Help dizini altında böyle bir yol bulunamadı!",
        errorText : 'Lütfen gitmeye çalıştığınız URL\'i kontrol ediniz !',
        name : "Fatih ES"
    })
})

// Input (konum) girilmesi durumunda oluşacak yönlendirmeler
app.get('/weather', (req, res) => {

    // Input alanına bir konum girildi mi girilmedi mi kontrolü (address değişkeni üzerinden)
    if(!req.query.address){
        return res.send({ error : 'Lütfen bir konum bilgisi giriniz.' })
    }

    // Innput alanı var o halde devam et ve gelen konumu geocode ile al !
    // TODO GEOCODE INCELE VE BURAYA EKLE !
    geocode(req.query.address, (err, {latitude, longitude, locaton} = {}) => {
        
        // İstek sonrasında hata varsa yakala ve belirt !
        if(err){    
            return res.send({ err });
        }

        // Hata yok ise forecast kullanarak hava durumu bilgileini almaya çalış (Enlem ve boylam bilgileri ile)
        forecast(latitude, longitude, (err, data) => {
            // Hata varsa yakala ve belirt !
            if(err){
                return res.send({ err });
            }

            // Hata yoksa sıkıntı yok demektir bilgileri gönder
            // Aynı sayfa içerisinde gösterileceği için render kullanmaya gerek yok, home pagede görünecek !
            res.send({
                forecast : data,
                locaton: locaton,
                address : req.query.address
            })
        })  
    })
}) 

// Yukarıda tanımlı yönlendirmeler harici bir sayfaya ulaşmaya çalışırsa hata döndür !
app.get("*", (req, res) => {
    // render olarak view içerisindeki 404 sayfasını yolla !
    // Parametreleri unutma --> Handlebars (hbs) bu parametreleri render ederken kullanacak
    // Bir nevi dinamik içerik olarak düşünülebilir
    res.render("404", {
        errorTitle : "HATA !",
        errorSubTitle : "Bu web sayfasında böyle bir sayfa bulunmamaktadır.",
        errorText : "Lütfen gitmeye çalıştığınız sayfanın URL bilgisi kontrol ediniz." 
    })
})


// app değerine hangi portu dinliyeceğini belirtelim ve server çalıştığı sırada bunu terminalde görelim
app.listen(PORT, () => {
    console.log("Server is up and listening on port : " + PORT);
})