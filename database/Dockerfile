# Use the official PostgreSQL image
FROM postgres:latest

# Set the working directory
# WORKDIR /app

# Copy the SQL script into the Docker image
COPY init.sql /docker-entrypoint-initdb.d

# Set environment variables
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=timelinedb

# Expose PostgreSQL port
EXPOSE 5432
