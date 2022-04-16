const http = require('http'); // Http modülünün yüklenmesi

// Http modülü ile HTTP server oluşturulması
http.createServer( (request, response) => {

    // 1. Tarayıcıya her şeyin yolunda olduğunu (Status code: 200)
    // ve verilerin düz metin olduğunu söyleyin
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 2. Görüntülenmesini istediğiniz metni sayfanın gövdesine (body) yazın
    response.write('Hello Node.js with HTTP Server! \n');

    // 3. Sunucuya tüm yanıt başlıklarının (header) ve gövdesinin (body) gönderildiğini söyleyin.
    response.end();

}).listen(1337); // 4. Sunucuya hangi bağlantı noktasında (PORT) olacağını söyleyin