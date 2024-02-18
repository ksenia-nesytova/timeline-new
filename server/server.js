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
      entities.start_date as start_date, 
      entities.end_date as end_date from actors
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


app.get('/find-entry', async (req, res) => {
  const { name, start_date, end_date } = req.query;
  let conditions = [];
  let params = [];


  if (name) {
    conditions.push('name = $1');
    params.push(name);
  }
  // if (start_date) {
  //   conditions.push('start_date = $' + (params.length + 1));
  //   params.push(start_date);
  // }
  // if (end_date) {
  //   conditions.push('end_date = $' + (params.length + 1));
  //   params.push(end_date);
  // }

  let query = `
    SELECT * FROM entities`;
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
    console.log(query, 'QUERY');
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

})

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
