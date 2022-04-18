const express = require('express');

module.exports = (options = {}) => {
    const router = express.Router();

    const { service } = options;
    // router. use/get/all ilk parametre olarak path
    // ikinci parametre olarak bir işlev alır.
    router.get('/greet', (req, res, next) => {
        // res.end(options.greeting);
        res.end(service.createGreeting( req.query.name || 'Stranger'));
    });

    return router;
}