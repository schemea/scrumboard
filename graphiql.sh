#!/usr/bin/env bash

docker run --rm --name graphiql -p 4000:4000 -e API_URL=http://localhost:8080 npalm/graphiql

