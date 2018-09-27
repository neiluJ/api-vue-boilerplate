ARG PHP_VERSION

FROM php:${PHP_VERSION}-fpm-stretch

RUN apt-get -y update \
    && apt-get -y install curl less vim libicu-dev zlib1g-dev libc-client-dev

RUN docker-php-ext-install -j$(nproc) intl mbstring pdo pdo_mysql zip iconv

# to enable xdebug, uncomment this
# RUN (pecl install xdebug || pecl install xdebug-2.5.5) && docker-php-ext-enable xdebug

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]