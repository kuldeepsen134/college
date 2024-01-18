const { nearbyPools } = require('../controller');
const { authJWT } = require('../middleware/auth');
const { fileUploader } = require('../middleware/fileUpload');

var router = require('express').Router();

module.exports = app => {

    router.post('/nearbyPools',fileUploader,authJWT, nearbyPools.create)
    router.get('/nearbyPools', nearbyPools.find)
    router.get('/nearbyPools/:id', nearbyPools.findOne)

    router.put('/nearbyPools/:id', nearbyPools.update)


    app.use('/api', router);
}