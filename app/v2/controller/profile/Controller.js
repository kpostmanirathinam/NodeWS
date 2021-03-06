var db = require('../../config/db/mysqldb');

exports.sampleget = function (req, res) {
    res.send('Get method calling...')
}
exports.addprofile = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    var errormsg;

    var sql = "INSERT INTO profile (firstname, lastname, email, mobilenumber,dateofbirth,aboutyourself)" + 
    "VALUES ('"+data.firstName+"','"+data.lastName+"','"+data.mailId+"','"+data.mobile+"','"+data.dateOfBirth+"','"+data.aboutMe+"')";
    dbcon.query(sql).on('result', function (result) {
        if(result.affectedRows==1)
        {
            obj={
                "status":"success",
                "errorMessage":"Profile Created Successfully"
            }
        }
    }).on('error', function (err) {
        //console.log(err);
        if(err.code=='ER_DUP_ENTRY')
        {
            let errorindex  = err.sqlMessage.split("for key");
            let errorindex1 = errorindex[1].split("UNIQUE");
            let errorcolumn = errorindex1[0].split("'")
            errormsg=errorcolumn[1] + "is Exit";
        }
        else{
            errormsg = err.sqlMessage
        }
        obj={
            "status":"fail",
            "errorMessage":errormsg
        }
    }).on('end', function (data) {
        //Result return to request respons 
        res.send(obj);
    });
}

exports.updateprofile = function (req, res) {
  var dbcon=db.connect();
    const data = req.body;
    var obj;
    var errormsg;
    var sql = "UPDATE profile SET DATEOFBIRTH='"+data.dob+"',GENDER='"+data.gender+"',TWITTER='"+data.twitter+"',SKYPE='"+data.skype+"',LOCATION='"+data.location+"',WEBSITE='"+data.website+"' WHERE email='"+data.mailId+"'"; 
console.log(sql);
    dbcon.query(sql).on('result', function (result) {
        if(result.affectedRows==1)
        {
            obj={
                "status":"success",
                "Message":"Profile Updated Successfully"
            }
        }
    }).on('error', function (err) {
            errormsg = err.sqlMessage
        obj={
            "status":"fail",
            "errorMessage":errormsg
        }
    }).on('end', function (data) {
        //Result return to request respons 
        res.send(obj);
    });
}

exports.getprofile = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    
    var sql = "select * from profile where email='"+data.mailId+"'";
//var sql = "select * from profile";
    console.log(sql);
    dbcon.query(sql, function (err, result, fields) {
        console.log(result)
      if (err)
      {
        console.log("Something Error");
        console.log(err);
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