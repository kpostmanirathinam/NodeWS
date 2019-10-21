
var mysql = require('mysql');
//var settings = require('./settings.json');

var settings = {
    host: '192.168.2.212',
    user: 'root',
    password: 'Iot@369!4',
    database: 'socket',
    multipleStatements: true
}

// var settings = {
//     host: '182.50.133.84',
//     user: 'pravallika',
//     password: '1Ff12*bd',
//     database: 'recharge',
//     multipleStatements: true
// }
var db;
exports.connect = function () {
   
     db = mysql.createConnection(settings);
     
    
        db.connect(function (err,result) {
            if (!err) {
                console.log('Database is connected!');
               
            } else {
                console.log('Error connecting database!'+err.message);
            }
           
        });
        return db;
}

exports.close = function () {

    db.end(function (err) {
        if (err) {
             console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });


}

