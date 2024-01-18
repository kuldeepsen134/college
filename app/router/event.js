const { events } = require('../controller');
const { authJWT } = require('../middleware/auth');
const { fileUploader } = require('../middleware/fileUpload');

var router = require('express').Router();

module.exports = app => {

    router.post('/events', fileUploader, authJWT, events.create)
    router.get('/events', events.find)
    router.get('/events/:id', events.findOne)

    router.put('/events/:id', fileUploader, events.update)


    app.use('/api', router);
}