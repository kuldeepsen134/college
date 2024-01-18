const { musicAndParties } = require('../controller');
const { authJWT } = require('../middleware/auth');
const { fileUploader } = require('../middleware/fileUpload');

var router = require('express').Router();

module.exports = app => {

    router.post('/musicAndParties', fileUploader, authJWT, musicAndParties.create)
    router.get('/musicAndParties', musicAndParties.find)
    router.get('/musicAndParties/:id', musicAndParties.findOne)

    router.put('/musicAndParties/:id', musicAndParties.update)


    app.use('/api', router);
}