# About

Attempting to make a clone of trello with some of it's core functionality (e.g. users, tasks, teams which share tasks, drag and drop, etc.). Don't really have a plan/ roadmap for any of this, just doing this freestyle/ going as i learn new technologies.

FYI, this is all currently in progress.

FEEL FREE TO MAKE ANY PR'S/ COMMENTS :) !!!

## Dependencies/ Getting Started

Requirements:

- docker & docker-compose
- NodeJS v12.14.1
- yarn

Getting up and running:

(all bash commands executed from project route)

1. Install node modules for frontend and backend:

```bash
cd ./backend && yarn install && cd ../frontend & yarn install
```

2. Start up neccessary 3rd party services (postgres on `localhost:5432` and redis on `localhost:6379`):

```bash
cd ./backend/composure && docker-compose up
```

3. Start up backend express server (in dev mode, this just uses certain env vars from prod mode), this will start up an express server on `localhost:1234`:

```bash
cd ./backend && yarn start:dev
```

4. Start up frontend react app, this will run on `localhost:3000`

```bash
cd ./frontend && yarn start
```

Alright, you should be good to go now
