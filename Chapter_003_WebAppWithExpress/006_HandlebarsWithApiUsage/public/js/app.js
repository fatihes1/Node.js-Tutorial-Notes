// Form, input ve mesaj alanlarının querySelector ile alınması
var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');

if(weatherForm) {
    
// Form submit edildiğinde olacak olayları eventListenner ile kontrol et ve tanımla
weatherForm.addEventListener('submit', (e) => {
    // Sayfanın refresh edilmesini engelliyor. Submit'in default özelliği sayfayı yenilemektir. Bunu engelliyor.
    e.preventDefault(); 

    // Input alanına girilen şehri location değişkenine atadık
    const location = search.value;
    console.log(location);

    //Veriler çekilene kadar loading yazısı için messageOne değişkeni ataması
    messageOne.textContent = 'Loading . . .'

    // messageTwo değişkenin ilk değeri boş string olarak atanır.
    messageTwo.textContent = '';

    // fetch anahtar kelimesi ile verileri çekelim !
    // route olarak 'weather' verdik böylelikle kök dizindeki app.js dosyasındaki
    // yönlendirmeler ile forecast ve geocode API'lerini kullanacak.
    fetch('/weather?address=' + location).then((response) => {
        // gelen veriyi json yaptık.
        response.json().then((data) => {
            // json() yaptıktan sonra buna data isimlendirmesi yaptık.
            if (data.error) {
                // Bir hata olması durumunda messageTwo değerinde bunu göstereceğiz ! 
                messageOne.textContent = data.error
            } else {
                // mesaj1 değişkenine konumu
                messageOne.textContent = data.location
                // mesaj2 değişkenine ise hava durumunu bilgilerini ekledik
                // Hatırlatma : zaten bize string olarak bir cümle geliyordu !
                messageTwo.textContent = data.forecast
            }
        })
    })
})
}