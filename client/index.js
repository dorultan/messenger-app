"use strict";

const socket = io();

const messenger = document.getElementById('messenger');
const message_container = document.getElementById('messages');

// node

const submitForm = function(e) {
	e.preventDefault();
	const formData = new FormData(messenger);

	const user_message = {
		username: formData.getAll('username')[0],
		message: formData.getAll('message')[0]
	}


	socket.emit('new message', user_message);
	formData.delete('username');
	console.log(formData.getAll('username'))
}

messenger.addEventListener('submit', submitForm);

socket.on('message received', function(data) {
	const message_node = document.createTextNode(data.message);
	const username_node = document.createTextNode(data.username);
	
	const message_label_node = document.createTextNode('Message');
	const username_label_node = document.createTextNode('User');

	const message_label_elem = document.createElement('span');

	message_label_elem.classList.add('message-label');

	message_label_elem.appendChild(message_label_node);

	// The wrapper
	const user_message_elem = document.createElement('div');
	user_message_elem.classList.add('message-w');
	// span for both	
	const username_elem = document.createElement('span');
	const message_elem = document.createElement('span');
	username_elem.classList.add('user-name');
	message_elem.classList.add('user-message');

	message_elem.appendChild(message_label_elem);
	// append the text nodes
	username_elem.appendChild(username_node);
	message_elem.appendChild(message_node);

	// append text to the span elem.
	user_message_elem.appendChild(username_elem);
	user_message_elem.appendChild(message_elem);

	message_container.appendChild(user_message_elem);

})