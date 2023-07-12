\echo 'Delete and recreate hindsight db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE hindsight;
CREATE DATABASE hindsight;
\connect hindsight

\i hindsight-schema.sql
\i hindsight-seed.sql

\echo 'Delete and recreate hindsight_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE hindsight_test;
CREATE DATABASE hindsight_test;
\connect hindsight_test

\i hindsight-schema.sql