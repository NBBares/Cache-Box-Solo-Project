--
--
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"email" varchar(100) UNIQUE DEFAULT null,
	"user_type" varchar(100) NOT NULL DEFAULT 'normal_user',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "user" VALUES(DEFAULT) RETURNING "id", "username", "password", "email", "user_type";
--
--
CREATE TABLE "projects" (
	"id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"project_description" TEXT NOT NULL,
	"entry_date" DATE NOT NULL,
	"edit_date" DATE NOT NULL,
	"type_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "projects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "projects" VALUES(DEFAULT) RETURNING "id", "title", "project_description", "entry_date", "edit_date", "type_id", "user_id";
--
--
CREATE TABLE "types" (
	"id" serial NOT NULL,
	"type_name" varchar(255) NOT NULL,
	CONSTRAINT "types_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "types" VALUES(DEFAULT) RETURNING "id", "type_name";
--
--
CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"tag_name" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "tags" VALUES(DEFAULT) RETURNING "id", "tag_name", "user_id";
--
--
CREATE TABLE "images" (
	"id" serial NOT NULL,
	"image_name" varchar(500) NOT NULL,
	"image_description" varchar(100) NOT NULL,
	"fav_image" BOOLEAN NOT NULL DEFAULT 'false',
	"project_id" integer NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "images" VALUES(DEFAULT) RETURNING "id", "image_name", "image_description", "fav_image", "project_id";
--
--
CREATE TABLE "project_tags" (
	"project_id" integer NOT NULL,
	"tag_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);

INSERT INTO "project_tags" VALUES(DEFAULT) RETURNING "project_id", "tag_id";
--
--
ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("type_id") REFERENCES "types"("id");
ALTER TABLE "projects" ADD CONSTRAINT "projects_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "tags" ADD CONSTRAINT "tags_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");

ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");
ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_fk1" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

