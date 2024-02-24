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
      SELECT entity_id, entities.name AS name, entities.description AS description, 
      entities.start_date AS start_date, 
      entities.end_date as end_date FROM actors
      LEFT JOIN entities ON actors.entity_id = entities.id;

    `);
    console.log(actors, actors.rows)
    res.json(actors.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/events', async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT entity_id, entities.name AS name, entities.description AS description, 
      entities.start_date AS start_date, 
      entities.end_date AS end_date FROM events
      LEFT JOIN entities ON events.entity_id = entities.id;

    `);
    console.log(events, events.rows)
    res.json(events.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/create-entry', async (req, res) => {
  console.log('DB ALIVE req', req.body);
  const { name, start_date, end_date, type } = req.body;

  try {
    // Create an entity and capture its ID
    const entityId = await createEntity(pool, name);


    switch (type) {
      case 'actor':
        console.log('im an actor!');
        await createActorEntry(pool, name);
        break;
      case 'event':
        console.log('im an event!');
        break;
      case 'item':
        console.log('im item');
        break;
      case 'institution':
        console.log('im insitition');
        break;
      default:
        break;
    }


  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }
});


async function createEntity(pool, name) {
  const entitiesQuery = `
    INSERT INTO entities (name)
    VALUES ($1)
    RETURNING id;
  `;
  const { rows } = await pool.query(entitiesQuery, [name]);
  console.log('ENTITY created', rows[0].id)
  return rows[0].id;
}

async function createEventEntry(pool, name) {

  const entityId = await createEntity(pool, name);

  const eventsQuery = `
    INSERT INTO events (entity_id)
    VALUES ($1)
  `;

  await pool.query(eventsQuery, [entityId])
}

async function createActorEntry(pool, name) {

  try {
    //create entity entry for the actor
    const entityIdForActor = await createEntity(pool, name);

    //create actor entry
    const actorsQuery = `
      INSERT INTO actors (entity_id)
      VALUES ($1);
    `;
    await pool.query(actorsQuery, [entityIdForActor]);

    //create entity entry for the actor's birth event
    const actorBirthEventName = `${name} Birth`;
    const entityIdForActorBirth = await createEntity(pool, actorBirthEventName);


    //create birth event for the actor
    const actorBirthEventQuery = `
      INSERT INTO events (entity_id)
      VALUES ($1)
      RETURNING *;
    `;
    await pool.query(actorBirthEventQuery, [entityIdForActorBirth]);
  } catch (error) {
    console.error('Error creating actor entry:', error);
  }

}




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
  const { name, start_date, end_date } = req.query;
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
