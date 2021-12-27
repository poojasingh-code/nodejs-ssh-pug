const SSH = require('simple-ssh');
//so I am able to get the ip's till here however it is locally available
function getIp (host){
  global["host"] = host;
  console.log("inside function",global["host"])
  return host;
}
console.log("outside function", global["host"])
//trying to access it outside so that I can send host : host like this in the below code instead of hardcoding.

var ssh = new SSH({
    host: '172.25.235.75',
    user: 'cssdesk',
    pass: 'intel123'
});
ssh
  .exec('dir', { out: function (stdout) { console.log("output cmd: ", stdout) } })
  .start();
  module.exports ={getIp}


