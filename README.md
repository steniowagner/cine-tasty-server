# CineTasty-Server

This is the back-end of the [CineTasty app](https://github.com/steniowagner/cine-tasty-mobile).

This server is a GraphQL-API that requests data from different REST datasources and return them as graphql-responses to the clients. No data is stored nor generated (for now).

## 🚧 This project is not finished 🚧

This project is still under development, and you can check the Roadmap of planned features [here](https://github.com/steniowagner/cine-tasty-server/blob/development/README.md#roadmap---future-features).

## Features

### Movies, TV-Shows, Actors and Actresses

- Get details
- Search
- Get the latests trends

### Quizes

- Create trivia-questionnaires about Cinema

### News

- Get the latests news about Cinema

## Architecture

![High-level architecture](https://github.com/steniowagner/cine-tasty-server/blob/development/static/architecture-high-level.png)
_High-level architecture_

This server lives in docker containers. The clients will send requests to the server and the server will request this data from one of the REST datasources. At the moment, the app requests data from three different datasources:

- [The Movie DB API](https://developer.themoviedb.org/reference/intro/getting-started): Used to search and get details and trends related to Movies, TV-Shows and Actors/Actresses.
- [Open Trivia DB API](https://opentdb.com/): Used to reate questionnaries about Cinema
- [News API](https://newsapi.org/): Used to get the latests news about Cinema

Depending on the query, the server will resolve the requested data by fetching the proper datasource.

Also, Redis is used to cache some of the responses returned by the datasources.

### Request flow

![Request flow](https://github.com/steniowagner/cine-tasty-server/blob/development/static/request-flow.png)
_Example of request flow - user requesting details about a Movie_

1. The clients will send GraphQL queries to the server
2. The server will fetch the data requested in the step 2 by requesting the data from the proper REST datasource (In this case, TMDB API)
3. The REST datasource will return the data to the server
4. The server will return the data to the user as a graphql-response

### Documentation

You can check the documentation with the possible queries [here](https://steniowagner.github.io/cine-tasty-server/).

This documentation is created using [github-pages](https://pages.github.com/).

Also, you can check how to generate it [here](https://github.com/steniowagner/cine-tasty-server/blob/development/README.md#generating-documentation).

## Getting Started

**Cloning the Repository**

```
$ git clone https://github.com/steniowagner/cine-tasty-server

$ cd cine-tasty-server
```

### Prerequisites

#### Environement

You'll only need to have Docker installed in order to have the server up and running.

#### API Keys

This server uses three environment variables, but only `TMDB API` and `News API` are required in order to run the server.

TMDB and News require that you have a personal key to use their services. You can generate the `TMDB API` key [here](https://developer.themoviedb.org/docs/getting-started) and `News API` key [here](https://newsapi.org/register).

The `STEP_ZEN_KEY` is used by [spectaql](https://github.com/anvilco/spectaql), the tool that is used to generate the GraphQL documentation, also requires that you have a key to use it, but it's not required to run the app. If you're interested in generate the documentation, you'll have to create your key [here](https://dashboard.stepzen.com/).

#### Setup environment variables

The [.env.example](https://github.com/steniowagner/cine-tasty-server/blob/development/.env.example) file shows all the enviroment variables that you'll need to set in order to run the app (except for the `STEP_ZEN_KEY`).

To setup the environment variables, create a new `.env` file and add the mandatory variables (`NEWS_API_KEY` and `THE_MOVIE_DB_API_READ_ACCESS_TOKEN`) with their respectives values.

### Running

To run the app, you just need start the containers using `docker compose`

```
$ docker-compose up -d
```

You'll find the app runing at your [localhost:3000](http://localhost:3000/).

> I'll be using npm as package-manager to run the tasks described below, but you can use yarn or pnpm.

### Starting the dev-server

To start the development server, run:

```
$ npm run start:dev
```

### Building

To build the application, run:

```
$ npm run build
```

### Running prettier

To prettify the code, run:

```
$ npm run prettier:fix
```

### Running eslint

To lint the code, run:

```
$ npm run lint:fix
```

### Testing

The tests are divided in `integration` and `unit`. The unit-tests files are the `.test.ts` files and the integration-test files are the `.spec.ts`.

To only run the unit-tests:

```
$ npm run test:unit
```

To only run the integration-tests:

```
$ npm run test:integration
```

To run all tests:

```
$ npm run test
```

To run all tests in watch mode:

```
$ npm run test:watch
```

To run all tests with code-coverage metrics:

```
$ npm run test:coverage
```

### Generating types

This project uses [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) to generate the static typescript types of the graphql operations.

To initiate the graphql-code-generator (it's already initiated):

```
$ npm run codegen:init
```

To generate the types:

```
$ npm run codegen:generate
```

The generated types will be saved at `src/generated/graphql.ts`. If you want to change this location, just modify the [codegen.yml](https://github.com/steniowagner/cine-tasty-server/blob/development/codegen.yml) file.

### Generating documentation

To generate the documentation (make sure that you have the server running):

```
$ npm run generate:docs
```

The documentation will be generated at the `docs` folder in the root directory. If you want to modify some of the data generated in the generated documentation, please refer to the [spectaql-config.yaml](https://github.com/steniowagner/cine-tasty-server/blob/development/spectaql-config.yaml) file.

## Roadmap - future features

Even with all the interactions with the datasources in place, I would like to add more complexity to this application. At the moment, I'm thinking about the following:

- Add authentication
- Allow the user to create and manage lists of favorite movies/tv-shows/actors/actresses
- Allow the user to create and manage lists of movies/tv-shows to watch-later
- Add reviews of movies and tv-shows
- Keep a track of the results in the questionnaires
- Create a ranking of the scores in the questionnaires

To accomplish this, the project will need to have a database. Due the structure of the data presented by the features, I'll be using [PostgreSQL](https://www.postgresql.org/) as the database.

## About

This project is part of my personal portfolio. So, I would be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

Thank you!
