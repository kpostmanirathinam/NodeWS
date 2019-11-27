var db = require('../../config/db/mysqldb');
const authconfig = require('../../config/authconfig');

'use strict'
const https = require('https')
var rp = require('request-promise')

exports.sampleget = function (req, res) {
  console.log("NNNNNNN")
}
exports.samplepost = function (req, res) {
  const data = req.body;

 var temp1 = "https://www.pay2all.in/web-api/paynow?api_token=4gQWeK1xZes3m3eQKjUjSZfjvNCeeD8ZniN8d8wN7vyrmqYk5ru7M0wGPCKB"
 var temp2 = "&number="+data.number+"&provider_id="+data.provider_id+"&amount="+data.amount+"&client_id="+data.clientid+"&liv="+data.live+"";
 const httpval = temp1+temp2;
 console.log(httpval);
 const request = require('request')
// request.get('https://www.pay2all.in/web-api/paynow?api_token=4gQWeK1xZes3m3eQKjUjSZfjvNCeeD8ZniN8d8wN7vyrmqYk5ru7M0wGPCKB&number=7200447673&provider_id=112&amount=1&client_id=sskk',
request.get(httpval,(error, result, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${result.statusCode}`)
  console.log(body)
res.send(body);
})

}

