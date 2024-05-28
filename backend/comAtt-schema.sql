CREATE TYPE user_role AS ENUM ('admin', 'teacher');

CREATE TABLE users(
username VARCHAR(25) PRIMARY KEY,
password TEXT NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email TEXT NOT NULL 
    CHECK (POSITION ('@' IN email) >1),
role user_role NOT NULL
);

CREATE TABLE groups(
group_id SERIAL PRIMARY KEY,
group_name VARCHAR(255)  NOT NULL
);

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  group_id INT REFERENCES groups(group_id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT,
  parent_first_name TEXT NOT NULL,
  parent_last_name TEXT NOT NULL,
  parent_phone VARCHAR(15) NOT NULL,
  parent_email TEXT NOT NULL
);


CREATE TABLE terms (
  term_id SERIAL PRIMARY KEY,
  term_name VARCHAR(50) UNIQUE NOT NULL,
  start_date DATE,
  end_date DATE
);