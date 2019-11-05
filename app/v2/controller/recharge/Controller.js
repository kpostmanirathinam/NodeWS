var db = require('../../config/db/mysqldb');
'use strict'
const https = require('https')
var rp = require('request-promise')

exports.sampleget = function (req, res) {
  console.log("NNNNNNN")
}
exports.samplepost = function (req, res) {
  const data = req.body;

 var ss = "https://www.pay2all.in/web-api/paynow?api_token=4gQWeK1xZes3m3eQKjUjSZfjvNCeeD8ZniN8d8wN7vyrmqYk5ru7M0wGPCKB"
 var ss1 = "&number="+data.number+"&provider_id="+data.provider_id+"&amount="+data.amount+"&client_id=sskk";
  
 const httval = ss+ss1;
 console.log(httval);

 const request = require('request')
let resu ;
request.get('https://www.pay2all.in/web-api/paynow?api_token=4gQWeK1xZes3m3eQKjUjSZfjvNCeeD8ZniN8d8wN7vyrmqYk5ru7M0wGPCKB&number=7200447673&provider_id=112&amount=1&client_id=sskk',
 (error, result, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${result.statusCode}`)
  console.log(body)
//return body;  
res.send(body);

})

}

