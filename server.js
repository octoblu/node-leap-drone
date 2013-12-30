var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')
  , arDrone = require('ar-drone')

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

app.get('/drone/takeoff', function(req, res){
  client.takeoff()
  res.json({success: true})
})

app.get('/drone/land', function(req, res){
  client.stop()
  client.land()
  res.json({success: true})
})

app.get('/drone/y/:y', function(req, res){
  if(req.params.y == 'up') {
    client.up(0.4)
  } 
  else if(req.params.y == 'down') {
    client.down(0.4)
  } else {
    client.up(0.0)
  } 

  res.json({success: true})
})

app.get('/drone/x/:x', function(req, res){
  if(req.params.x == 'left') {
    client.counterClockwise(0.6)
  } 
  else if(req.params.x == 'right') {
    client.clockwise(0.6)
  } else {
    client.counterClockwise(0.0)
  } 

  res.json({success: true})
})

app.get('/drone/z/:z', function(req, res){
  if(req.params.z == 'front') {
    client.front(0.4)
  } 
  else if(req.params.z == 'back') {
    client.back(0.4)
  } else {
    client.front(0.0)
  } 

  res.json({success: true})
})

var server = http.createServer(app)
server.listen(process.env.PORT || 3000);