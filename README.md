![Server](https://github.com/andrinmeier/romme/actions/workflows/server.yml/badge.svg)
![Webapplication](https://github.com/andrinmeier/romme/actions/workflows/webapp.yml/badge.svg)
![Documentation](https://github.com/andrinmeier/romme/actions/workflows/docs.yml/badge.svg)


# Rommé

[![Join the chat at https://gitter.im/andrinmeier/romme](https://badges.gitter.im/andrinmeier/romme.svg)](https://gitter.im/andrinmeier/romme?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The popular card game romme (also known as rummy) implemented as a web application with multiplayer support. See: playromme.com.

## Docs
To debug and test the documentation site locally, you can build the docker container and view the website on your device. Follow these steps:

1. Make sure you have Docker installed and running
1. `cd docs`
1. `docker build --no-cache -t testantora .`
1. `docker run --rm -p 80:8043 -it testantora`
1. Open your browser at http://localhost/main/stable
1. Done!
