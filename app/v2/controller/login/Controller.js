var db = require('../../config/db/mysqldb');

exports.post = function (req, res) {
  var dbcon=db.connect();
  // const data = req.body;
  // var obj;
  let sql = "CALL login('" + req.body.mailId + "','" + req.body.password + "')";
    console.log(sql)
    
    dbcon.query(sql, function(err, rows, fields) {
        if (err == null) {
            console.log(rows[0])
            var datalength = rows.length;
            console.log(datalength);
            const vals = rows[0];
            if(datalength > 0)
            {

            
            if(vals[0].ACTIVESTATUS=='yes')
            {
              var obj = {
                "message": "success",
                "value":vals[0]
            }
            res.send(obj)
            }
            else{
              var obj = {
                "message": "fail",
                "errmsg":"Your Account not still Active",
                "value":"notactive"
            }
            res.send(obj)
            }
          }
         }
         else {
            res.send({
                "message ": "failure",
                "value": err.sqlMessage,
            })
        }
    })
}

// exports.post = function (req, res) {
//     var dbcon=db.connect();
//     const data = req.body;
//     var obj;
    
//     var sql = "select * from signup where mailid='"+data.mailId+"' and password='"+data.password+"'";
//     dbcon.query(sql, function (err, result, fields) {
//       if (err)
//       {
//         console.log("Something Error");
//         return false;
//       } 
//       var datalength = result.length;
//       if(datalength > 0)
//       {
//         obj={
//             "status":"success",
//             "value":result
//             }
//       }
//       else{
//         obj={
//             "status":"fail",
//             "value":result
//             }
//       }
//       res.send(obj);
//     });
// }