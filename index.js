const express = require('express')
const app = express();
require('dotenv').config();

const cors = require('cors')
const bodyParser = require('body-parser');
const { PORT } = require('./app/config/config');
const port = PORT

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(bodyParser.json())
// const HOST = '192.168.0.23';


require('./app/router/media')(app);
// app.use(authJWT)

require('./app/router/user')(app);
require('./app/router/auth')(app);
require('./app/router/news')(app);
require('./app/router/event')(app);
require('./app/router/offer')(app);

require('./app/router/nearbyPool')(app);
require('./app/router/musicAndParty')(app);
require('./app/router/sportActivity')(app);
require('./app/router/churches')(app);



app.get('*', (req, res) => {
    res.status(400).send({
        message: 'Hunn smart!',
        error: true
    })
});



app.listen(port, () => console.log(`Server is running port  on ${PORT}`))