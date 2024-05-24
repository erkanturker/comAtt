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