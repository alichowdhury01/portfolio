#!/bin/bash

echo "Pulling latest changes from repository"
git pull origin main

# Update Browserslist database
npx update-browserslist-db@latest

# Clean up Docker build cache
docker builder prune -f

# Stop and remove existing containers if they exist
if [ "$(docker ps -q -f name=nextjs-app)" ]; then
    docker stop nextjs-app
    docker rm nextjs-app
fi

if [ "$(docker ps -q -f name=caddy-service)" ]; then
    docker stop caddy-service
    docker rm caddy-service
fi

echo "Building and starting Docker containers"
docker-compose up --build --no-cache -d

echo "Verifying deployment"
docker-compose logs
