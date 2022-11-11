#!/bin/sh

DEV_CONTAINER_DIR="./.devcontainer"
SERVER_DIR="./packages/server"

cp ${DEV_CONTAINER_DIR}/.env.example ${DEV_CONTAINER_DIR}/.env \
    && cp ${SERVER_DIR}/.env.example ${SERVER_DIR}/.env.development \
    && rm ./make_env.sh
