## Running docker with contianers rebuilt

sudo docker-compose up --remove-orphans --build

## How to manually copy db initialization script into docker db container

sudo docker cp database/init.sql timeline-pg:/docker-entrypoint-initdb.d

sudo docker exec -it timeline-pg psql -U admin -d timeline_db -f docker-entrypoint-initdb.d/init.sql

## How to connect to the default pg database inside the container in order to recreate timeline_db

sudo docker exec -it timeline-pg psql -U admin -d postgres

CREATE DATABASE timeline_db;

## How to drop every table without deleting the database itself

sudo docker exec -it timeline-pg psql -U admin -d timeline_db

SELECT
  'DROP TABLE IF EXISTS "' || tablename || '" CASCADE;' 
from
  pg_tables WHERE schemaname = 'public';