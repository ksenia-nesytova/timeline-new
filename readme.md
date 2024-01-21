## Running docker with contianers rebuilt

sudo docker-compose up --remove-orphans --build

## How to manually copy db initialization script into dcoker db container

sudo docker cp database/init.sql timeline-pg:/docker-entrypoint-initdb.d

sudo docker exec -it timeline-pg psql -U admin -d timeline_db -f docker-entrypoint-initdb.d/init.sql
