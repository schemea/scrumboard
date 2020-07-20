CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

DROP SCHEMA IF EXISTS scrum CASCADE;

CREATE SCHEMA IF NOT EXISTS scrum;

ALTER USER postgres SET SEARCH_PATH = scrum, public;

SET SEARCH_PATH = scrum;

CREATE TABLE IF NOT EXISTS stories
(
    id          uuid UNIQUE DEFAULT public.uuid_generate_v4(),
    title       varchar(100) NOT NULL UNIQUE,
    description text,
    effort      int2,
    value       int2
);

CREATE TABLE IF NOT EXISTS persons
(
    id        uuid UNIQUE DEFAULT public.uuid_generate_v4(),
    firstname varchar(100) NOT NULL,
    lastname  varchar(100) NOT NULL,
    UNIQUE (firstname, lastname)
);

CREATE TABLE IF NOT EXISTS roles
(
    id          uuid UNIQUE DEFAULT public.uuid_generate_v4(),
    name        varchar(10) NOT NULL UNIQUE,
    description text,
    score       int2        NOT NULL
);

CREATE TABLE IF NOT EXISTS person_role
(
    person_id uuid,
    role_id uuid,
    PRIMARY KEY (person_id, role_id),
    FOREIGN KEY (person_id) REFERENCES persons (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);


BEGIN;

INSERT INTO stories(title)
VALUES ('something to do');

INSERT INTO scrum.persons (id, firstname, lastname)
VALUES ('93cf8790-978f-4f97-9639-b75c9c7be61d', 'i am', 'admin?');

INSERT INTO scrum.roles (id, name, description, score)
VALUES ('53c5f0b0-eeaf-4c26-aeb2-d1670261430e', 'admin', 'the almighty', 32767);

INSERT INTO person_role (person_id, role_id)
VALUES ('93cf8790-978f-4f97-9639-b75c9c7be61d', '53c5f0b0-eeaf-4c26-aeb2-d1670261430e');

COMMIT;
