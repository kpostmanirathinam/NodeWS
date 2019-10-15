let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
let cors = require('cors');
var io = require('socket.io').listen(server);
//let db = require('./app/v1/config/db/mongodb');
//var routes = require('./app/socket/socket')(io);

const port = process.env.PORT || 4001;
const host = process.env.HOST || `0.0.0.0`;

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded expressparser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());
// a Connect/Express middleware
app.use(cors());
// Route path
var mongodbroutes = require('./app/v1/routes/routes');
var mysqlroute = require('./app/v2/routes/routes');


//Access Mongodb 
app.use('/NodeWSAcess', mongodbroutes);
//Access Mysql 
app.use('/NodeAcess', mysqlroute);
//app.use('/Socket', routes);


server.listen(port, host, () => {
    console.log(`started on port: ${port}`);
    console.log(`started on host: ${host}`);
});

