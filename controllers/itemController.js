const pool = require('../database');

const getItems = async (req, res) => {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const offset = (page - 1) * limit;
    try {
      let query = 'SELECT * FROM items WHERE name ILIKE $1';
      const queryParams = [`%${search}%`, limit, offset];
      if (status) {
        query += ' AND status = $2';
        queryParams.splice(1, 0, status);
      }
      query += ' LIMIT $2 OFFSET $3';
      const result = await pool.query(query, queryParams);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const image_url = req.file ? req.file.path : null;
    try {
      const result = await pool.query(
        'INSERT INTO items (name, description, starting_price, end_time, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, starting_price, end_time, image_url]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, current_price, end_time } = req.body;
  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2, starting_price = $3, current_price = $4, end_time = $5 WHERE id = $6 RETURNING *',
      [name, description, starting_price, current_price, end_time, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
