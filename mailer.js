const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Length, X-Requested-With');
  next();
});

app.post('/send_email', function (req, res) {
  res.send(req.body)
})

app.listen(8080, function () {
  console.log('Listenting on 8080!')
})
