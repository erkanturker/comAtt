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
  group_id INT REFERENCES groups(group_id) ON DELETE SET NULL,
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

CREATE TABLE subjects(
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    teacher_id VARCHAR(50) REFERENCES users(username) ON DELETE SET NULL
);

CREATE TABLE periods (
    period_id SERIAL PRIMARY KEY,
    period_number INT NOT NULL,
    subject_id INT REFERENCES subjects(subject_id),
    group_id INT REFERENCES groups(group_id),
    term_id INT REFERENCES terms(term_id),
    date DATE NOT NULL,
    CONSTRAINT unique_period UNIQUE (group_id, subject_id, term_id, date, period_number)
);

CREATE INDEX idx_period_group_id ON periods (group_id);
CREATE INDEX idx_period_subject_id ON periods (subject_id);
CREATE INDEX idx_period_term_id ON periods (term_id);
CREATE INDEX idx_period_date ON periods (date);


CREATE TABLE attendances (
  attendance_id  SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(student_id),
  period_id  INT REFERENCES periods(period_id),
  date DATE,
  status BOOLEAN NOT NULL
);