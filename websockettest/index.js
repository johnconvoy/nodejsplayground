var app = require('express')();
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', indexHandler);
app.get('/geosubmit', geosubmitHandler);
app.get('/geosubscribe', geosubscribeHandler);

app.post('/geosubmit/insert', geosubmitInsertHandler);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// html handlers
function indexHandler(req, res) {
    res.sendFile(__dirname + '/index.html');
}
function geosubmitHandler(req, res) {
    res.sendFile(__dirname + '/geosubmit.html');
}
function geosubscribeHandler(req, res) {
    res.sendFile(__dirname + '/geosubscribe.html');
}

// services
function geosubmitInsertHandler(req, res) {
    console.log("latitude", req.body.latitude);
    console.log("longitude", req.body.longitude);
    console.log("user", req.body.user);
    res.json({success: true});

    io.emit('geosubmitInsert_' + req.body.user, JSON.stringify(req.body));
    io.emit('geosubmitInsert_all', JSON.stringify(req.body));
}