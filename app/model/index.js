const { default: mongoose } = require('mongoose')
const { DB_URI } = require('../config/config')

mongoose.connect(`${DB_URI}`).then(() => console.log('Db connection done')).catch(error => console.log('Error>>>>>>', error))

const db = {
    User: require('./user'),
    News: require('./news'),
    Event: require('./event'),
    Offers: require('./offer'),

    Churches: require('./chuches'),

    SportActivity: require('./sportActivity'),
    NearbyPool: require('./nearbyPool'),
    MusicAndParty: require('./musicAndParty'),


}

module.exports = db