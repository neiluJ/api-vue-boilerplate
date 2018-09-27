#!/usr/bin/env bash
function stack() {
    docker-compose $@
}

function php() {
    docker exec -ti $(docker ps -aqf "name=php") su site -c"php $@";
}

function npm() {
    docker exec -ti $(docker ps -aqf "name=php") su site -c"npm $@";
}

function console() {
    docker exec -ti $(docker ps -aqf "name=php") su site -c"php bin/console $@";
}

function composer() {
    docker exec -ti $(docker ps -aqf "name=php") su site -c"/usr/local/bin/composer $@";
}