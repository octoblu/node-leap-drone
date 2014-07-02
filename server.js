var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')
  , arDrone = require('ar-drone')
  , skynet = require('skynet');
  // , skynet = require('./../skynet/npm')

var client  = arDrone.createClient();
var publicDir = __dirname + '/public';

// app.use(express.bodyParser()) ;
// app.use(app.router);
// app.use(express.methodOverride());
app.use(express.static(publicDir));

app.get('/', function(req, res) {
  res.sendfile(path.join(publicDir, 'index.html'))
})

var server = http.createServer(app)
server.listen(process.env.PORT || 3001);

var conn = skynet.createConnection({
  "uuid": "2f3113d0-2796-11e3-95ef-e3081976e170",
  "token": "uvgawgfv5597lditx8gp3ua2izilik9",
  // "protocol": "mqtt",
  // "qos": 0
  "protocol": "websocket"
});

conn.on('ready', function(data){
  console.log('Connected to Skynet');

  conn.subscribe({
    "uuid": "f0af1a01-fd5d-11e3-a290-ef9910e207d9"
  }, function (data) {
    console.log(data);
  });

  conn.on('message', function(data){

      console.log(data);
      data = data.payload;
      // var data = JSON.parse(databits);

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

      } else if(data.fly == 'spin'){
        console.log("spin");
        if(data.x == 'left') {
          client.counterClockwise(0.6)
        } 
        else if(data.x == 'right') {
          client.clockwise(0.6)
        } else {
          client.counterClockwise(0.0)
        } 

      } else if(data.fly == 'flip'){
        console.log("flip");
        if(data.x == 'left') {
          client.animate('flipLeft', 1000);
        } 
        else if(data.x == 'right') {
          client.animate('flipRight', 1000);
        } else {
          client.animate('flipLeft', 1000);
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
