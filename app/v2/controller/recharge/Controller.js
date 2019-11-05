var db = require('../../config/db/mysqldb');
'use strict'

const Razorpay = require('razorpay')
let rzp = new Razorpay({
  key_id: "rzp_live_G5ffVNm65R2JDe", // your `KEY_ID`
  key_secret:'ztkI5URXgLMpubn1hLJnrPDN' // your `KEY_SECRET`
})


exports.sampleget = function (req, res) {
  console.log("NNNNNNN")
    res.send('Get method calling...')
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