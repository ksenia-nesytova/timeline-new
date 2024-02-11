const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM entities');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/actors', async (req, res) => {
  try {
    const actors = await pool.query(`
      select entities_id, entities.name AS name, entities.description as description, 
      entities.start_day as start_day, 
      entities.start_month as start_month, 
      entities.start_year as start_year,
      entities.end_day as end_day, 
      entities.end_month  as end_month , 
      entities.end_year  as end_year  from actors
      left join entities on actors.entities_id = entities.id;

    `);
    console.log(actors, actors.rows)
    res.json(actors.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/create-entry', async (req, res) => {
  console.log('DB ALIVE req', req.body);
  const { name } = req.body;
  const query = `
    INSERT INTO entities (name)
    VALUES ($1)
    RETURNING *;
  `;
  try {
    const { rows } = await pool.query(query, [name]);
    res.json(rows);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }
});


app.get('/check-if-exists', async (req, res) => {
  const { name } = req.query;
  const query = 'SELECT EXISTS (SELECT 1 FROM entities WHERE name = $1) AS "exists";';
  try {
    const { rows } = await pool.query(query, [name]);
    res.json(rows[0].exists);
  } catch (error) {
    console.error('Error checking duplicate:', error);
    res.status(500).send('Error checking duplicate');
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
