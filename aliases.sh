#!/usr/bin/env bash

PROMPT_PREFIX="[api] "

function stack() {
    docker-compose $@
}

function php() {
    docker exec -ti $(docker ps -qf "name=php") su site -c"php $@";
}

function npm() {
    docker exec -ti $(docker ps -qf "name=php") su site -c"npm $@;";
}

function console() {
    docker exec -ti $(docker ps -qf "name=php") su site -c"php bin/console $@";
}

function composer() {
    docker exec -ti $(docker ps -qf "name=php") su site -c"/usr/local/bin/composer $@";
}

function errorlog() {
    docker exec -ti $(docker ps -qf "name=nginx") tail -f /var/log/nginx/project_error.log
}

function accesslog() {
    docker exec -ti $(docker ps -qf "name=nginx") tail -f /var/log/nginx/project_access.log
}

function phplog() {
    docker exec -ti $(docker ps -qf "name=php") tail -f /var/log/fpm-php.www.log
}

function cli() {
    docker exec -ti $(docker ps -qf "name=php") su site
}

export PS1=`echo $PROMPT_PREFIX $PS1' '`