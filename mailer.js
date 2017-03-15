var http = require('http');
var fs = require('fs'); var mkdirp = require('mkdirp'); 
server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {

        console.log("POST");
        var body = '';
        req.on('data', function (data) {
          body += data;
          console.log("Partial body: " + body);

          var info = JSON.parse(body);
          fs.existsSync('./emails/' + info.email) || fs.mkdirSync('./emails/' + info.email);

          fs.writeFileSync('./emails/' + info.email + '/' + new Date() + '.txt', 
                          info.name + '\n \n' + info.email + '\n \n' + info.subject + '\n \n' + info.content, 
                          'utf-8'); 
          console.log('name: ' + info.name);
        });

        req.on('end', function () {
          console.log("Body: " + body);
        });

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://mitchell-drohan.com');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'POST');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.writeHead(200, {'Content-Type': 'html/text'});
        res.end('post received');
    }

});

port = 3000;
host = '0.0.0.0';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
