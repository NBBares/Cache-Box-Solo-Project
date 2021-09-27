const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/project', (req, res) => {
  const query = `SELECT "projects"."id", "projects"."title", "projects"."project_description", "projects"."entry_date", "projects"."edit_date", "projects"."type_id", "projects"."user_id", "types"."type_name", jsonb_agg("images") as "images" FROM "projects" 
  JOIN "types" ON "types"."id" = "projects"."type_id"
  JOIN "images" ON "projects"."id" = "images"."project_id"
  GROUP BY "projects"."id", "types"."id";`
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
