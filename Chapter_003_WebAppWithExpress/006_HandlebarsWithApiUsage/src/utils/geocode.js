const request = require('request');
require('dotenv').config();

// Geocode işlevini tanımlıyoruz. parametre olarak address bilgisi  ve döndürdüğü değerler için callback değeri ister
const geocode = (address, callback) => {

    // İstek atılacak URL tanımlanır, address değeri URL için encode edilir ve env dosyasından token alınır
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token='+ process.env.GEOCODE_API_KEY +'&limit=1';
    
    // const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bursa.json?access_token=pk.eyJ1IjoiY2FueWFoeWEiLCJhIjoiY2tucTZ2a3ZlMDI4ZzMzbnQzY29wd24wdiJ9.Stz8gEheY66xXHzzQTVZow&limit=1'

    // request modülü ile istek atılır
    request({ url:URL, json: true }, (err,{body}) => {

        // İstek yapılırken hata oluştuysa yakala ve callback değeri olarak döndür.
        // geocode işlevinin çağrıldığı yerde callback alanı için tanımlı objeye atanır !
        if(err){    
            callback('Unable to connect location services !', undefined);
        } // İstenilen datalar geldi mi ? Veri bulunuyor mu kontrol et.
        // Hatayı yakaladık ama belki veri geldi ama boş geldi ?? :(
        else if (body.features[0]==null || body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            // Sorun yoksa enlem, boylam ve lokasyon değerlerini geri dönder
            // Bu değerler app.js içerisinde forecast isteği atılırken kullanılacak gibi he ;)
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

// app.js içeriside modülü kullanabilmek için export et !
module.exports = geocode