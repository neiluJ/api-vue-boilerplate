# My API App Boilerplate

Ready-to-use Dockerized API app structure powered by:

## Features

* Symfony 4.1
* API Platform 2 (+ swagger for API documentation)
* VueJS + Vuex client structure 
* Frontend toolkit (Webpack ready: SCSS, Icons/SVG sprites)
* Full docker stack with PHP 7.2 fpm + nginx, node, varnish

Clone, Build, Enjoy.

## Usage

```bash
$ source aliases.sh
(api) $ stack up -d
```
### Upcoming/TODO features

* [ ] Better http component (ie: understand api-platform responses)
* [ ] Form validation component (sync with validation from api-platform)
* [ ] Letsencrypt HTTPS ?
* [ ] CLI aliases 
* [ ] Xdebug ? 
* [ ] Demo component with Greeting model

## How to use/customize

#### Aliases

You have to source the ```aliases.sh``` file before using these aliases.

* *stack*: shortcut to docker-compose (ex: ```stack up -d```)
* *php*: runs php in the container (ex: ```php -i```)
* *npm*: runs npm in the container (ex: ```npm --version```)
* *console*: runs the symfony console in the container (ex: ```console ca:cl```)

#### API Endpoint

* Swagger/API doc is available at the API root: https://localhost:8443/api
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