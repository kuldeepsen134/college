const { sportActivities } = require('../controller');
const { authJWT } = require('../middleware/auth');
const { fileUploader } = require('../middleware/fileUpload');

var router = require('express').Router();

module.exports = app => {

    router.post('/sportActivities', fileUploader, authJWT, sportActivities.create)
    router.get('/sportActivities', sportActivities.find)
    router.get('/sportActivities/:id', sportActivities.findOne)

    router.put('/sportActivities/:id', sportActivities.update)


    app.use('/api', router);
}