module.exports = function startServer(io) {
	io.on('connection', socket => {
		const surveyId = socket.handshake.query.surveyId
		console.log('a user connected', surveyId);
		socket.join(surveyId)

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});

		socket.on('event', msg => {
			console.log(`message: ${msg}`);
			io.to(surveyId).emit('event', msg);
		});
	});
};
