// İstek atacağımız için request modülünü dahil ettik !
const request = require('request');

// forecast işlevini tanımlayalım. app.js içerisinde çağırılacak

// enlem, boylam ve tabiki geri döndereceği değerleri tutacak bir değişken olmak üzere
// 3 parametre alır (app.js) içerisinde böyle çağrılır !

const forecast = (latitude, longitude, callback) =>{

    // İstek atılacak url bilgisi nedir ?
    // key değeri .env dosyasından, enlem ve boylam değerleri ise zaten çağırılırken parametre olarak gelecek :)
    const URL = 'http://api.weatherstack.com/current?access_key='+process.env.WEATHER_API_KEY+'&query=' + latitude + ',' + longitude + '&units=m';

    // isteği atalım
    request({ url: URL, json:true }, (err, {body}) => {
        
        // Hata yakalandıysa yakala ve app.js içerisinde çağrılan yere callback ile yolla !
        if(err){
            callback('Unable to connect to weather service', undefined);
        } 
        // hata yakalayamadı belki ama resonse.body içerisinde hata varsa diye kontrol et !
        else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            // Hata yok hava durumu string bir cümle ile yolla !
            callback(undefined, 'Hava Durumu Açıklaması: ' + body.current.weather_descriptions[0] + ',\nHava Sıcaklığı : ' + body.current.temperature + ' derece' + ',\nHissedilen sıcaklık: ' + body.current.feelslike + ' derece')
        }
    })
}

// app.js içerisinde kullanmak üzere modülü export et !
module.exports = forecast;