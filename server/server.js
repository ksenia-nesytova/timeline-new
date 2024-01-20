const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: 'timeline_db',
  user: 'admin',
  password: 'admin',
});

// handling CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
			"http://localhost:4200");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

 app.get('/', async (req, res) => {
   console.log('DB ALIVE');
   try {
     const result = await pool.query('SELECT * FROM entities');
     res.json(result.rows);
   } catch (error) {
     console.error('Error executing query', error);
     res.status(500).send('Internal Server Error');
   }
 });



app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
