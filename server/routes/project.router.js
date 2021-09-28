const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/project', (req, res) => {
  const query = ` SELECT "projects"."id", "projects"."title", "projects"."project_description", "projects"."entry_date", "projects"."edit_date", "projects"."type_id", "projects"."user_id", "types"."type_name", "user"."id", jsonb_agg("tags") as "tags" ,jsonb_agg("images") as "images" FROM "projects" 
  JOIN "types" ON "types"."id" = "projects"."type_id"
  JOIN "images" ON "projects"."id" = "images"."project_id"
  JOIN "user" ON "user"."id" = "projects"."user_id"
  JOIN "project_tags" ON "project_tags"."project_id" = "projects"."id"
  JOIN "tags" ON "project_tags"."tag_id" = "tags"."id"
  WHERE "projects"."user_id" = $1
  GROUP BY "projects"."id", "types"."id", "user"."id", "project_tags"."project_id";`
 
  console.log('req.user:', req.user.id);
  if (req.isAuthenticated()) {
  pool.query(query,[req.user.id])
      .then(result => {
          res.send(result.rows);
      })
      .catch(err => {
          console.log('ERROR: Get all items', err);
          res.sendStatus(500)
      })
    }else {
        res.sendStatus(403);
      }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
