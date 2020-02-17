//------------------------------------- CONNECTION PARAMS ----------------
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:Postgres3642!@192.168.65.3:5432/heroes'
const pool = new Pool({
  connectionString: connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  connectionString: connectionString,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

//----------------------


const getHeroes = (request, response) => {
  pool.query('SELECT * FROM heries ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log("yo les bitchies");
  })
};

const getHero = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const addHero = (request, response) => {
  const { id, name, skill, pictures, type } = request.body

  pool.query('INSERT INTO users (hero_id, name, skill, pictures, types) VALUES ($1, $2, $3, $4, $5)',
  [id, name, skill, pictures, type],
  (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Hero added with ID: ${result.insertId}`);
  });
};

const updateHero = (request, response) => {
  
    const id = parseInt(request.params.id);
    const { name, skill, pictures, type } = request.body;

  pool.query(
    'UPDATE users SET name = $2, skill = $3, pictures = $4, types = $5 WHERE id = $1',
    [id, name, skill, pictures, type],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Hero modified with ID: ${id}`)
    }
  );
};

const deleteHeroes = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Hero deleted with ID: ${id}`)
  });
};

module.exports = {
  getHeroes,
  getHero,
  addHero,
  updateHero,
  deleteHeroes,
}