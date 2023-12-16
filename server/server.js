const express = require('express');
const axios = require('axios');
const app = express();
//const sql = require('./db');

// handling CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
			"http://localhost:4200");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// route for handling requests from the Angular client
app.get('/api/message', (req, res) => {
	res.json({ message:
			'Express server works?' });
});

app.get('/', async (req, res) => {
	console.log('QWERTYUIO');
	res.send('Im alive')
 });

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
