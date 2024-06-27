DROP DATABASE IF EXISTS dir_db;

CREATE DATABASE dir_db;

\c dir_db;

CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  avatar TEXT,  /* at 4.2.3 added avatar field, accomodates avatar update in Person.js model */
  github_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
  id SERIAL PRIMARY KEY,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  person_id INTEGER REFERENCES people(id) ON DELETE CASCADE
);
