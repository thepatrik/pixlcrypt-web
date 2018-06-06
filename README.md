# pixlcrypt-web

[![Build Status](https://travis-ci.org/thepatrik/pixlcrypt-web.svg?branch=master)](https://travis-ci.org/thepatrik/pixlcrypt-web)

Web app for pixlcrypt services.

## Dev

### Scripts

Install node dependencies

    make install

Run app on dev server

    make start

Run tests

    make test

Make a production build

    make build

Build docker image

    make docker-build

Run docker container (served on [http://localhost:8000](http://localhost:8000))

    make docker-run

### Deployment

All successful commits will be deployed through [travis](https://travis-ci.org/thepatrik/pixlcrypt-web)
