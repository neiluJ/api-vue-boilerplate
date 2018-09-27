#!/bin/bash

groupadd -g $SITE_GID site
useradd --uid $SITE_UID --gid $SITE_GID --groups $SITE_GID -s /bin/bash site

if [ "$1" = 'php-fpm' ]; then
    # do composer stuff
    mkdir ~/bin/
    cd ~/bin/
    wget https://getcomposer.org/composer.phar
    mv composer.phar /usr/local/bin/composer
    chmod +x /usr/local/bin/composer
fi

php-fpm -F