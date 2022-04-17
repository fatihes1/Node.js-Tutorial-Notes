// Express modülünün üst düzey işlevini içeri aktarın
const express = require('express');

// Az önce içeri aktarılan üst düzey işlevden bir Express uygulaması oluşturun.
const app = express();

// Port numarasını 3000 olarak atayın
const PORT = 3000;

// Belirtilen callback (geri arama) işleviyle HTTP GET isteklerini belirten "/" yoluna yönlendirir
app.get("/", function(request, response) {
    response.send("Hello Node.js with Express ! \n");
});

// Uygulamanın 3000 nolu portu dinlemesini sağlayın.
app.listen(PORT, function() {
    console.log("Sunucu http://localhost:"+ PORT + " adresini dinliyor.")
});