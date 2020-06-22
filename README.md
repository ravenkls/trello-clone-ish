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
cd ./backend && yarn install && cd ../frontend & yarn install & cd ..
```

2. Start up the docker containers

```bash
docker-compose up -d
```

Alright, you should be good to go now. You can view the website @ http://localhost:3000
