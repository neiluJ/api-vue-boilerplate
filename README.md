# My API App Boilerplate

Ready-to-use Dockerized API app structure powered by:

* Symfony 4.4
* API Platform 2 (+ swagger for API documentation)
* VueJS + Vuex client structure 
* Frontend toolkit (Webpack ready: SCSS, Icons/SVG sprites)
* Full docker dev stack with PHP 7.2 fpm + xdebug + nginx, node, varnish
* JWT-Ready with login implementation

Clone, Build, Enjoy.

## Usage

```bash
$ . aliases.sh
[api] $ stack up -d
```

## Install

Create and EDIT an ```.env``` file:
```bash
$ cp .env.dist .env
```

```bash
$ . aliases.sh
[api] $ stack up -d
[api] $ composer install -o
[api] $ npm install && npm run dev
```

### Configure JWT

(find/configure passphrase in .env file)
```bash
[api] $ cli
site@php $ openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
site@php $ openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```

Login (users are stored in `config/packages/security.yaml`):
```bash
curl -X POST -H "Content-Type: application/json" http://localhost/login_check -d '{"username":"admin","password":"apiplatform"}'
```

Encode a user password:
```bash
php bin/console security:encode-password
```

> Read more about LexitJWTBundle: https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md 

> Read more about Symfony Security: https://symfony.com/doc/current/security.html

### Upcoming/TODO features

* [ ] JWT-ready (with login form demo)
* [ ] Better http component (ie: understand api-platform responses)
* [x] Form validation component (sync with validation from api-platform)
* [x] CLI aliases 
* [ ] Demo component with Greeting model

## How to use/customize

#### Suggested browser extensions

* VueJS DevTools - [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
* Postman - [Chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
* JSON Viewer - [Chrome](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)

#### PHPStorm Plugins

* Symfony
* .env files support
* VueJS

#### Command Line Aliases

You have to source the ```aliases.sh``` file before using these aliases (on your host computer).

* *stack*: shortcut to docker-compose (ex: ```stack up -d```)
* *php*: runs php in the container (ex: ```php -i```)
* *npm*: runs npm in the container (ex: ```npm --version```)
* *console*: runs the symfony console in the container (ex: ```console ca:cl```)
* *cli*: enters the PHP CLI
* *composer*: runs composer in the container (ex: ```composer install -o```)
* *errorlog*: tails the httpd (nginx) error log
* *accesslog*: tails the httpd (nginx) access log
* *phplog*: tails the PHP-FPM error log

#### API Endpoint

* Swagger/OpenAPI documentation is available at the API root: http://localhost/api
* You can change the API root url by changing the ```prefix``` in ```config/routes/api_platform.yaml```

#### translations

* Translation files are shared with Symfony4
* Translations are stored in ```assets/translations``` in JSON format
* Add a new locale in ```assets/vue/main.js```:

```js 
import messagesEN from '../translations/messages.en.json'

// ...

const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'fr',
  messages: {
    fr: messagesFR,
    en: messagesEN
  }
});
```

use in vue components:
```vue
<template>
    <h1>{{ $t('app.welcome_msg') }}</h1>
</template>
```

use in twig/symfony:
```django
<h1>{{ 'app.welcome_msg'|trans }}</h1>
```
