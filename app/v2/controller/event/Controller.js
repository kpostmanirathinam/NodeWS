var db = require('../../config/db/mysqldb');

exports.sampleget = function (req, res) {
    res.send('Get method calling...')
}
exports.samplepost = function (req, res) {
    
    res.send('POST method calling...')
}
exports.paymentdetails = function (req, res) {
    
    res.send('paymentdetails method calling...')
}

exports.addEvents = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    var errormsg;

    var sql = "INSERT INTO events (eventtype, subeventtype,eventname, price,prizeamount, totaltokens,starttocken,expiredate)" + 
    "VALUES ('"+data.eventtype+"','"+data.subeventtype+"','"+data.eventname+"','"+data.price+"','"+data.prizeamount+"','"+data.totaltokens+"','"+data.starttocken+"','"+data.expiredate+"')";
    dbcon.query(sql).on('result', function (result) {
        if(result.affectedRows==1)
        {
            obj={
                "status":"success",
                "errorMessage":"Events Add success"
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

exports.updateEvents = function (req, res) {
  var dbcon=db.connect();
    const data = req.body;
    var obj;
    var errormsg;
    // var sql = "INSERT INTO events (eventtype, subeventtype,eventname, price, totaltokens,expiredate)" + 
    // "VALUES ('"+data.eventtype+"','"+data.subeventtype+"','"+data.eventname+"','"+data.price+"','"+data.totaltokens+"','"+data.expiredate+"')";

    var sql = "UPDATE events SET eventtype='"+data.eventtype+"',subeventtype='"+data.subeventtype+"',eventname='"+data.eventname+"',price='"+data.price+"',totaltokens='"+data.totaltokens+"',expiredate='"+data.expiredate+"' WHERE id='"+data.id+"'"; 
console.log(sql);
    dbcon.query(sql).on('result', function (result) {
        if(result.affectedRows==1)
        {
            obj={
                "status":"success",
                "errorMessage":"Events Updated Successfully"
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

exports.getEvents = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    
    // var sql = "select * from events where email='"+data.mailId+"'"; expiredate
    var sql = "select * from events WHERE EXPIREDATE >='"+data.expiredate+"' and EVENTTYPE='"+data.eventtype+"'";
    console.log(sql);
    dbcon.query(sql, function (err, result, fields) {
        console.log(result);
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

exports.alluserbookedEvents = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    
    // var sql = "select * from events where email='"+data.mailId+"'"; expiredate
    var sql = "select tokendetails from user_transaction WHERE EVENTID ='"+data.eventid+"'";
    console.log(sql);
    dbcon.query(sql, function (err, result, fields) {
        console.log(result);
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
exports.userbookedEventsdetails = function (req, res) {
    let data = req.body;
    console.log("req.body");
    console.log(req.body);
    var obj;
    var dbcon=db.connect();

    
    
    // var sql = "select * from events where email='"+data.mailId+"'"; expiredate

 //   var sql = "select tokendetails from user_transaction WHERE USERMAILID ='"+data.usermailid+"'";
console.log("============SQLLLL========");
console.log(data);
 var sql = "select tra.ID,tra.USERMAILID,tra.EVENTID,tra.TOKENDETAILS,tra.BOOKEDDATE,tra.STATUS,tra.WINAMOUNT,"+
 "eve.id,eve.EVENTTYPE,eve.SUBEVENTTYPE,eve.EVENTNAME,eve.PRICE,eve.PRIZEAMOUNT,eve.TOTALTOKENS,eve.STARTTOCKEN,eve.EXPIREDATE "+
 "from user_transaction tra inner join events eve on tra.EVENTID=eve.ID where tra.usermailid='"+data.usermailid+"'";

    console.log(sql);
    dbcon.query(sql, function (err, result, fields) {
        console.log(result);
      if (err)
      {
        console.log("Something Error");
        console.log("hhhhh===="+err);
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
      db.close();
      res.send(obj);
    });
}

exports.userselectEvents = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    var errormsg;

    var sql = "INSERT INTO user_transaction (usermailid, eventid,tokendetails, bookeddate)" + 
    "VALUES ('"+data.usermailid+"','"+data.eventid+"','"+data.tokendetails+"','"+data.bookeddate+"')";
    dbcon.query(sql).on('result', function (result) {
        if(result.affectedRows==1)
        {
            obj={
                "status":"success",
                "errorMessage":"Booked success"
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