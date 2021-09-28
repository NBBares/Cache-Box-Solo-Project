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
 router.post('/post', (req, res) => {
    console.log(req.body);
    // RETURNING "id" will return project id
    const insertProjectQuery = `
    INSERT INTO "projects" ("title", "project_description", "type_id", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`
  
    // FIRST QUERY MAKES Project
    pool.query(insertProjectQuery, [req.body.title, req.body.project_description,req.body.type_id,req.body.user_id])
    .then(result => {
      console.log('New Project Id:', result.rows[0].id); //ID IS HERE!
      
      const createdProjectId = result.rows[0].id
  
      // Now handle the tags reference
      const insertProjectTagQuery = `
        INSERT INTO "project_tags" ("project_id", "tag_id")
        VALUES  ($1, $2);
        `
        // SECOND QUERY ADDS TYPE FOR THAT NEW PROJECT
        pool.query(insertProjectTagQuery, [createdProjectId, req.body.tag_id]).then(result => {
          //Now that both are done, send back success!
          const insertProjectImageQuery = `
        INSERT INTO "images" ("project_id", "image_name", "image_description", "fav_image")
        VALUES  ($1, $2, $3, $4);
        `
            // THIRD QUERY ADDS IMAGE FOR NEW PROJECT
            pool.query(insertProjectImageQuery, [createdProjectId, req.body.image_name, req.body.image_description, req.body.fav_image ]).then(result => {
                //Now that both are done, send back success!
                res.sendStatus(201);
            }).catch(err => {
                // catch for third query
                console.log(err);
                res.sendStatus(500)
            })
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        });
  // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
  })

  //DELETE PROJECT
  router.delete('/project/:id', (req, res) => {
    //grab the project id
    const queryText = 'DELETE FROM "projects" WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      //success
      .catch((err) => {
        console.log('Error completing SELECT Project query', err);
        //catch for delete
        res.sendStatus(500);
      });
  });

    //DELETE PROJECT
    router.delete('/images/:id', (req, res) => {
        //grab the project id
        const queryText = 'DELETE FROM "images" WHERE id=$1';
        pool.query(queryText, [req.params.id])
          .then(() => { res.sendStatus(200); })
          //success
          .catch((err) => {
            console.log('Error completing SELECT Project query', err);
            //catch for delete
            res.sendStatus(500);
          });
      });
module.exports = router;
