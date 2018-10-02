# My API App Boilerplate

Ready-to-use Dockerized API app structure powered by:

* Symfony 4.1
* API Platform 2 (+ swagger for API documentation)
* VueJS + Vuex client structure 
* Frontend toolkit (Webpack ready: SCSS, Icons/SVG sprites)
* Full docker stack with PHP 7.2 fpm + nginx, node, varnish
* JWT-Ready with login implementation

Clone, Build, Enjoy.

## Usage

```bash
$ . aliases.sh
[api] $ stack up -d
```

## Install

Create and edit an ```.env``` file:
```bash
$ cp .env_dist .env
```

```bash
$ . aliases.sh
[api] $ stack up -d
[api] $ composer install -o
[api] $ npm install && npm run dev
```

Visit http://localhost and start coding! (the varnish-cached version is on http://localhost:81)

### Upcoming/TODO features

* [ ] JWT-ready (with login form demo)
* [ ] Better http component (ie: understand api-platform responses)
* [ ] Form validation component (sync with validation from api-platform)
* [ ] self-signed HTTPS ?
* [x] CLI aliases 
* [ ] Xdebug install option ? 
* [ ] Demo component with Greeting model

## How to use/customize

#### Suggested browser extensions

* VueJS DevTools - [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
* Postman - [Chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

#### PHPStorm Plugins

* Symfony
* .env files
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

* Swagger/API doc is available at the API root: http://localhost/api
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
