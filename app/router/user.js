const { users } = require('../controller');

var router = require('express').Router();

module.exports = app => {
    
    router.post('/register', users.create)
    router.get('/users', users.find)
    router.get('/users/:id', users.findOne)

    router.patch('/users/:id',users.update)
    router.delete('/users/:id', users.delete)

    router.get('/getTotalUsers', users.getTotalUsers)

    app.use('/api', router);
}