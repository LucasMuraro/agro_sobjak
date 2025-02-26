// controllers/eventController.js
const { Pool } = require('pg');
const axios = require('axios');

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: 'postgres', // Docker service name
  database: process.env.POSTGRES_DB || 'db_tac',
  password: process.env.POSTGRES_PASSWORD || '1234',
  port: 5432
});

exports.createEvent = async (req, res) => {
  const { person, deviceId, description, type, additionalDetails } = req.body;

  try {
    // Check if person exists in tb_pessoa or create it
    let personId;
    const pessoaCheck = await axios.get('http://backend:8080/pessoa');
    const pessoas = pessoaCheck.data;
    const existingPessoa = pessoas.find(p => p.nome === person.name);

    if (!existingPessoa) {
      const pessoaResponse = await axios.post('http://backend:8080/pessoa', {
        nome: person.name,
        email: `${person.id}@event.com`,
        senha: 'event123'
      });
      personId = pessoaResponse.data.id;
    } else {
      personId = existingPessoa.id;
    }

    // Insert event into PostgreSQL
    const query = `
      INSERT INTO events (person_id, device_id, description, type, additional_details)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [personId, deviceId, description, type, additionalDetails || null];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const query = 'SELECT * FROM events';
    const result = await pool.query(query);

    // Enrich with person data from backend
    const pessoaResponse = await axios.get('http://backend:8080/pessoa');
    const pessoas = pessoaResponse.data;

    const enrichedEvents = result.rows.map(event => ({
      ...event,
      person: pessoas.find(p => p.id === parseInt(event.person_id)) || { id: event.person_id, name: 'Unknown' }
    }));

    res.status(200).json(enrichedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const query = 'SELECT * FROM events WHERE id = $1';
    const result = await pool.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const event = result.rows[0];
    const pessoaResponse = await axios.get(`http://backend:8080/pessoa/${event.person_id}`);
    const person = pessoaResponse.data;

    res.status(200).json({ ...event, person });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { person, deviceId, description, type, additionalDetails } = req.body;

  try {
    // Update person in backend if changed
    let personId;
    if (person) {
      const pessoaCheck = await axios.get('http://backend:8080/pessoa');
      const pessoas = pessoaCheck.data;
      const existingPessoa = pessoas.find(p => p.nome === person.name);

      if (!existingPessoa) {
        const pessoaResponse = await axios.post('http://backend:8080/pessoa', {
          nome: person.name,
          email: `${person.id}@event.com`,
          senha: 'event123'
        });
        personId = pessoaResponse.data.id;
      } else {
        personId = existingPessoa.id;
        await axios.put(`http://backend:8080/pessoa/${personId}`, {
          nome: person.name,
          email: existingPessoa.email,
          senha: existingPessoa.senha
        });
      }
    }

    // Update event in PostgreSQL
    const query = `
      UPDATE events
      SET person_id = $1, device_id = $2, description = $3, type = $4, additional_details = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [
      personId || null,
      deviceId,
      description,
      type,
      additionalDetails || null,
      req.params.id
    ];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};