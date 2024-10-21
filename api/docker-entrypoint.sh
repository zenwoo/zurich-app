#!/bin/sh

if [ -z "$DATABASE_HOST" ]; then
  echo "Error: DATABASE_HOST environment variable is not set."
  exit 1
fi

if [ -z "$DATABASE_PASSWORD" ]; then
  echo "Error: DATABASE_PASSWORD environment variable is not set."
  exit 1
fi

if [ -z "$JWT_SECRET" ]; then
  echo "Error: JWT_SECRET environment variable is not set."
  exit 1
fi

npm run typeorm:prod migration:run

echo "Starting the application..."
exec "$@"
