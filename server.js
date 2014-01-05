var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')
  , arDrone = require('ar-drone')
  , skynet = require('skynet')

var client  = arDrone.createClient()
var publicDir = __dirname + '/public'

app.configure(function() {
  app.use(express.cookieParser())
  app.use(express.session({secret: 'B1ue.0c3an'}))
  app.use(express.bodyParser()) 
  app.use(app.router)
  app.use(express.methodOverride())
  app.use(express.static(publicDir))
  app.locals.pretty = true
})

app.get('/', function(req, res) {
  res.sendfile(path.join(publicDir, 'index.html'))
})

var server = http.createServer(app)
server.listen(process.env.PORT || 3000);

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('ready', function(data){
  console.log('Connected to Skynet');
  conn.on('message', function(channel, databits){

      console.log(databits);
      data = JSON.parse(databits);

      if(data.fly == 'takeoff'){
        console.log("takeoff");
        client.takeoff()

      } else if(data.fly == 'land'){
        console.log("land");
        client.stop()
        client.land()

      } else if(data.fly == 'yaxis'){
        console.log("yaxis");
        if(data.y == 'up') {
          client.up(0.4)
        } 
        else if(data.y == 'down') {
          client.down(0.4)
        } else {
          client.up(0.0)
        } 

      } else if(data.fly == 'xaxis'){
        console.log("xaxis");
        if(data.x == 'left') {
          client.counterClockwise(0.6)
        } 
        else if(data.x == 'right') {
          client.clockwise(0.6)
        } else {
          client.counterClockwise(0.0)
        } 

      } else if(data.fly == 'zaxis'){
        console.log("zaxis");
        if(data.z == 'front') {
          client.front(0.4)
        } 
        else if(data.z == 'back') {
          client.back(0.4)
        } else {
          client.front(0.0)
        } 
      } 

  });
    
});
