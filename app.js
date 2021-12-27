const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
var cmd=require('node-cmd');
var ip =require('./static/js/cmdbutton')
var app = express();
app.set('view engine', 'pug')
//static files
const static_path = path.join(__dirname, "/static")
app.use(express.static(static_path))

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    console.log("Its come here");
    const parseIps = req.socket.remoteAddress
    console.log(parseIps)
    const parseIp = '172.25.235.75';
    ip.getIp(parseIp);

    const syncDir=cmd.runSync('cd ./static/js & node cmdbutton.js');

    console.log(`
    
        Sync Err ${syncDir.err}
        
        Sync stderr:  ${syncDir.stderr}

        Sync Data ${syncDir.data}
    
    `);

    cmd.run(`node cmdbutton.js`,
        function(err, data, stderr){
            console.log('the node-cmd dir contains : ',data)
        }
    );


    res.render('index', { title: 'NODESSH', message: 'Please click the button to run DIR Command' , paragraph: `${syncDir.data}`})
    

  })

  var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})