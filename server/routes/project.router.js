const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET PROJECT
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
        pool.query(query, [req.user.id])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log('ERROR: Get all items', err);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
});

//GET TAGS
router.get('/tags', (req, res) => {

    const query = `SELECT * FROM "tags"
    WHERE "tags"."user_id" = $1;`
    console.log('req.user:', req.user.id);
    if (req.isAuthenticated()) {
        pool.query(query, [req.user.id])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log('ERROR: Get all tags', err);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST PROJECT
 */
router.post('/post', async (req, res) => {
    console.log(req.body);
    // RETURNING "id" will return project id
    const insertProjectQuery = `
    INSERT INTO "projects" ("title", "project_description", "type_id", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`
    // FIRST QUERY MAKES Project
    const projectresult = await pool.query(insertProjectQuery, [req.body.title, req.body.project_description, req.body.type_id, req.body.user_id])
    console.log('New Project Id:', projectresult.rows[0].id); //ID IS HERE!

    const createdProjectId = projectresult.rows[0].id

    // Now handle the tags reference
    const insertProjectTagQuery = `INSERT INTO "project_tags" ("project_id", "tag_id")
        VALUES  ($1, $2);`
    // SECOND QUERY ADDS TYPE FOR THAT NEW PROJECT
    if (req.body.tag_id != '') {
        await pool.query(insertProjectTagQuery, [createdProjectId, req.body.tag_id]);
    };
    const insertProjectImageQuery = `
        INSERT INTO "images" ("project_id", "image_name", "image_description", "fav_image")
        VALUES  ($1, $2, $3, true);`
    // THIRD QUERY ADDS IMAGE FOR NEW PROJECT
    const imagerows = await pool.query(insertProjectImageQuery, [createdProjectId, req.body.image_name, req.body.image_description]);
    res.send(201);

});


//POST FOR ADDING MORE IMAGES
router.post('/postimage', (req, res) => {
    console.log(req.body);

    const insertProjectImageQuery = `
  INSERT INTO "images" ("project_id", "image_name", "image_description")
  VALUES  ($1, $2, $3);`
    // IMAGE QUERY ADDS IMAGE FOR NEW PROJECT
    pool.query(insertProjectImageQuery, [req.body.project_id, req.body.image_name, req.body.image_description]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
    }).catch(err => {
        // catch for IMAGE query
        console.log(err);
        res.sendStatus(500)
    });
});

//POST FOR TAGS
router.post('/posttag', (req, res) => {
    console.log(req.body);
    const insertTagQuery = `
  INSERT INTO "tags" ("user_id", "tag_name")
  VALUES  ($1, $2);`
    // IMAGE QUERY ADDS TAGS
    pool.query(insertTagQuery, [req.body.user_id, req.body.tag_name]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
    }).catch(err => {
        // catch for TAG query
        console.log(err);
        res.sendStatus(500)
    });
});
//DELETE PROJECT
router.delete('/project/:id', (req, res) => {
    //grab the project id
    const queryText = 'DELETE FROM "projects" WHERE id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        })
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
        .then(() => {
            res.sendStatus(200);
        })
        //success
        .catch((err) => {
            console.log('Error completing SELECT Project query', err);
            //catch for delete
            res.sendStatus(500);
        });
});

//PUT
router.put('/editImage/:id', (req, res) => {
    const updatedImage = req.body;

    console.log("REQ.BODY FOR EDIT,", req.body);

    const queryImage = `UPDATE "images"
            SET "image_name" = $1, 
            "image_description" = $2  
            WHERE id=$3;`;

    const queryImageValues = [
        updatedImage.image_name,
        updatedImage.image_description,
        req.params.id
    ];

    pool.query(queryImage, queryImageValues)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error completing SELECT Image query', err);
            res.sendStatus(500);
        })
        .catch((err) => {
            console.log('Error completing SELECT Project query', err);
            res.sendStatus(500);
        });
});

//PUT
router.put('/editProject/:id', (req, res) => {
    const updatedProject = req.body;

    console.log("REQ.BODY FOR EDIT,", req.body);

    const queryProject = `UPDATE "projects"
            SET "title" = $1, 
            "project_description" = $2  
            WHERE id=$3;`;

    const queryProjectValues = [
        updatedProject.title,
        updatedProject.project_description,
        req.params.id
    ];

    pool.query(queryProject, queryProjectValues)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error completing SELECT Image query', err);
            res.sendStatus(500);
        })
        .catch((err) => {
            console.log('Error completing SELECT Project query', err);
            res.sendStatus(500);
        });
});

module.exports = router;