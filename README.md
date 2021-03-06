![Server](https://github.com/andrinmeier/romme/actions/workflows/server.yml/badge.svg)
![Webapplication](https://github.com/andrinmeier/romme/actions/workflows/webapp.yml/badge.svg)
![Documentation](https://github.com/andrinmeier/romme/actions/workflows/docs.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/andrinmeier/romme](https://badges.gitter.im/andrinmeier/romme.svg)](https://gitter.im/andrinmeier/romme?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/organizations/andrinmeier/projects?search=romme)

[Play now!](https://playromme.com)

# Rommé
The popular card game romme (also known as rummy) implemented as a web application with multiplayer support.

## Server
The server uses NodeJS and exposes a REST API for basic authentication and bootstrapping purposes.
The actual game state is synchronized by using a mix of web sockets and redis streams.

You can run the server locally by issuing the following command:

`npm run dev`

## Webapp
The web application uses [Remix](https://remix.run/) and [tailwindcss](https://tailwindcss.com/).
The color palette was generated by an AI using [Huemint](https://huemint.com/).

To run the web application locally, run:

`npm run dev`

## Docs
The documentation site uses [Antora](https://antora.org/). The current stable version is available at [Documentation](https://docs.playromme.com/main/stable).
To debug and test the documentation site locally, you can build the docker container and view the website on your device. Follow these steps:

1. Make sure you have Docker installed and running
1. `cd docs`
1. `docker build --no-cache -t testantora .`
1. `docker run --rm -p 80:8043 -it testantora`
1. Open your browser at http://localhost/main/stable
1. Done!

## Database
The architecture uses a variant of event sourcing and stores the events in redis streams. There is no *current* state.
There are only events leading to a current state.

## Server infrastructure
The entirety of playromme.com including the documentation site and web application is hosted on [Fly](https://fly.io/).
There are interesting ramifications due to this choice of hosting provider. Since fly.io automatically scales containers up and down depending on demand,
we can't assume that all players are connected to the same server for relaying messages using websockets. That's why we're using redis streams.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/andrinmeier)
