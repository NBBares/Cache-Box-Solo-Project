const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/project', (req, res) => {
  const query = `SELECT * FROM "projects" 
  JOIN "types" ON "types"."id" = "projects"."type_id";`
  pool.query(query)
      .then(result => {
          res.send(result.rows);
      })
      .catch(err => {
          console.log('ERROR: Get all items', err);
          res.sendStatus(500)
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
