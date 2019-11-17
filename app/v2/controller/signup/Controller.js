var db = require('../../config/db/mysqldb');

exports.sampleget = function (req, res) {
    res.send('Get method calling...')
}

exports.samplepost = function (req, res) {
    var dbcon = db.connect();
   
    let sql = "CALL signup('" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.mailId + "','" + req.body.mobile + "','" + req.body.password + "')";
    //console.log(sql)
    
    dbcon.query(sql, function(err, rows, fields) {
        if (err == null) {
            console.log(rows)
            var obj = {
                "message": "success"
            }
            res.send(obj)
         }
         else {
            res.send({
                "message": "failure",
                "value": err.sqlMessage,
            })
        }
    })
}

// exports.samplepost = function (req, res) {
//     var dbcon=db.connect();
//     const data = req.body;
//     var obj;
//     var errormsg;
//     var sql = "INSERT INTO signup (username, mailid, mobile, password) VALUES ('"+data.userName+"','"+data.mailId+"','"+data.mobile+"','"+data.password+"')";
//     dbcon.query(sql).on('result', function (result) {
//         if(result.affectedRows==1)
//         {
//             obj={
//                 "status":"success",
//                 "errorMessage":"Profile Created Successfully"
//             }
//         }
//     }).on('error', function (err) {
//         //console.log(err);
//         if(err.code=='ER_DUP_ENTRY')
//         {
//           //  console.log(err.sqlMessage)
//             let errorindex  = err.sqlMessage.split("for key");
//             let errorindex1 = errorindex[1].split("UNIQUE");
//             let errorcolumn = errorindex1[0].split("'")

//             console.log(errorindex1);
//             console.log(errorcolumn[1]);


//             errormsg=errorcolumn[1] + "is Exit";
//         }
//         else{
//             errormsg = err.sqlMessage
//         }
//         obj={
//             "status":"fail",
//             "errorMessage":errormsg
//         }
//     }).on('end', function (data) {
//         //Result return to request respons 
//         res.send(obj);
//     });
    
    
   
// }