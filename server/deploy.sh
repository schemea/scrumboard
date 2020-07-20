#!/usr/bin/env bash

cd "$(dirname "$0")" || exit

docker build -t scrumboard-api -f kube/Dockerfile.dev .
kubectl apply -f kube
