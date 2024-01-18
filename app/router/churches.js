const { churches } = require('../controller');
const { authJWT } = require('../middleware/auth');
const { fileUploader } = require('../middleware/fileUpload');

var router = require('express').Router();

module.exports = app => {

    router.post('/churches',fileUploader,authJWT, churches.create)
    router.get('/churches', churches.find)
    router.get('/churches/:id', churches.findOne)

    router.put('/churches/:id', churches.update)


    app.use('/api', router);
}