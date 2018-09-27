#!/bin/bash

# groupadd -g $SITE_GID site
useradd --uid $SITE_UID --gid $SITE_GID --groups $SITE_GID -s /bin/bash site

# do composer stuff

php-fpm -F