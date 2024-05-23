#!/bin/bash

# Navigate to the project directory
cd /root/var/www/portfolio

# Pull the latest changes from the repository
git pull origin main

# Clean up Docker build cache
docker builder prune -f

# Stop and remove existing containers
docker stop nextjs-app backend caddy-service
docker rm nextjs-app backend caddy-service

# Build and start the Docker containers
docker compose up --build --no-cache -d

# Verify the deployment
docker compose logs
