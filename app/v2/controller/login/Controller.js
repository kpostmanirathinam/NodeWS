var db = require('../../config/db/mysqldb');

// exports.sampleget = function (req, res) {
//     res.send('Get method calling...')
// }
exports.post = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    
    var sql = "select * from signup where mailid='"+data.mailId+"' and password='"+data.password+"'";
    dbcon.query(sql, function (err, result, fields) {
      if (err)
      {
        console.log("Something Error");
        return false;
      } 
      var datalength = result.length;
      if(datalength > 0)
      {
        obj={
            "status":"success",
            "value":result
            }
      }
      else{
        obj={
            "status":"fail",
            "value":result
            }
      }
      res.send(obj);
    });
}