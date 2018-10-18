---
date: "2018-10-18"
title: "Compose and mysql"
category: "Codectober"
---

Tyring (good typo!) to remember good old backend days.
Spinning up the docker-compose, with going to [docker docs](https://docs.docker.com/compose/compose-file/) every 2 minutes...
Installing [SQL Pro](https://www.sequelpro.com/) for my Mac...
Giving permission new users...
You know, the usual:) 

In details:

Command to add new users to MySql:
```
GRANT SELECT, INSERT, UPDATE ON myawesomedb TO username@'localhost' IDENTIFIED BY 'secretpassword';
```

Docker-compose file:
```yaml
version: "3.3"
services:
  mysql:
    image: mysql:5.7.23
    ports:
      - "3306:3306"

    environment:
      - MYSQL_ROOT_PASSWORD=dev
      - MYSQL_USER=test
      - MYSQL_PASSWORD=testdev

  cofferver:
    image: node:10.12.0-alpine
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
    working_dir: "/app"
    command: "yarn start"
    depends_on: 
      - mysql
```

Useful graceful shutdown:
```javascript
const server = app.listen(port)

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.')
    server.close(() => {
      console.log('Http server closed.')
    })
})
```

DB connection is not so trivial though, cause if you want to run all with docker, then you need to say your server/web to wait for the database, cuse the last one is sloooow to init.
there is wait for it... [wait-for-it](https://github.com/vishnubob/wait-for-it). But I need to make it work.

Looks like task for tomorrow:)

[Source Code](https://github.com/dmitrybirin/cofferver)