var db = require('../../config/db/mysqldb');
'use strict'

const Razorpay = require('razorpay')
let rzp = new Razorpay({
  key_id: "rzp_live_G5ffVNm65R2JDe", // your `KEY_ID`
  key_secret:'ztkI5URXgLMpubn1hLJnrPDN' // your `KEY_SECRET`
})


exports.sampleget = function (req, res) {
  console.log("NNNNNNN")
 //   res.send('Payments Get method calling...')
    // Fetch a particular payment
rzp.payments.fetch('pay_DakLT4gw8izAmv').then((data) => {
  res.send(data);  
  //insertdbmethodcall(data);
  }).catch((error) => {
    // failure
  })
 
}


exports.paymentdetailspayid = function (req, res) {
console.log("TEST")
rzp.payments.fetch(req.body.pay_id).then((data) => {
  const temp={
      status:"success",
      value:data
  }
  res.json(temp)
}).catch((error) => {
  const temp={
      status:"failure",
      value:null,
      error:error.error
  }
  res.json(temp)
  // failure
})
// Fetch a particular payment
// rzp.payments.fetch('pay_DakLT4gw8izAmv').then((data) => {
//   res.send(data);  
//   }).catch((error) => {
//     // failure
//   })
 


}
exports.userpaymentHistory = function (req, res) {
  var dbcon=db.connect();
  const data = req.body;
  console.log(data)
  var obj;
  var sql = "select * from payment_information WHERE usermailid='"+data.mailId+"';select sum(AMOUNT) as 'add' from payment_information where TYPE='add' and usermailid='"+data.mailId+"';select sum(AMOUNT) as 'buy' from payment_information where TYPE='buy'  and usermailid='"+data.mailId+"'";
  dbcon.query(sql, function (err, result) {
      console.log("History Get Success");
     
     var resultval = JSON.parse(JSON.stringify(result));
     console.log(resultval[0]);

    if (err)
    {
      console.log("Something Error");
      console.log(err);
      return false;
    } 
    var datalength = result.length;
    console.log("===============");
    console.log(datalength);
    console.log("===============");

    
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

exports.addpaymentHistory = function (req, res) {
    var dbcon=db.connect();
    const data = req.body;
    var obj;
    var errormsg;
    var sql = "INSERT INTO payment_information (usermailid, type, information, status, transactiondetails, amount)"+ 
    "VALUES ('"+data.mailId+"','"+data.type+"','"+data.information+"','success','"+data.paymentdetails+"','"+data.amount+"')";
     console.log(sql);
    dbcon.query(sql).on('result', function (result) {
        if(result.affectedRows==1)
        {
            obj={
                "status":"success"
            }
        }
    }).on('error', function (err) {
        //console.log(err);
        if(err.code=='ER_DUP_ENTRY')
        {
          //  console.log(err.sqlMessage)
            let errorindex  = err.sqlMessage.split("for key");
            let errorindex1 = errorindex[1].split("UNIQUE");
            let errorcolumn = errorindex1[0].split("'")

            console.log(errorindex1);
            console.log(errorcolumn[1]);


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