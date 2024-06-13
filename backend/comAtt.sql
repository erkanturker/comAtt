\echo 'Delete and recreate comAtt db?'
\prompt 'Return for yes or control-c to cancel > ' user_confirmation 
\echo 'Dropping and recreating the comAtt database...'

DROP DATABASE IF EXISTS comatt;
CREATE DATABASE comatt;

-- Connect to the newly created database
\connect comatt
\i comAtt-schema.sql

\i comAtt-seed.sql

\echo 'Delete and Recreate comAtt db'
\prompt 'Return for yes or control-c to cancel >' user_input 
\echo 'Dropping and recreating the comAtt database...'

DROP DATABASE IF EXISTS comatt_test;
CREATE DATABASE comatt_test;

\connect comatt_test 
\i comtAtt-schema.sql