const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const server = require('http').Server(app);

const io = require('socket.io')(server);

app.set('port', port);

server.listen(app.get('port'), function() {
	console.log('The app is listening on port: ' + app.get('port'));
})
app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/', function(req, res) {

	app.sendFile(path.resolve(__dirname, 'client', 'index.html'));
})



io.on('connection', function(socket) {
	socket.on('new message', function(data) {
		io.emit('message received', data);
	})
})