---
date: "2018-10-30"
title: "Aftermath"
category: "Codectober"
---

Internet is a dangerous place.
I have my server on internet for a day, and already got a lot of requests from China IPs trying to get index.php from my api.

So, today I've done security audit of my coffee api and see one big hole:)

To cover it a bit, firstly I've enabled firewall on server:
Its [ufw](https://en.wikipedia.org/wiki/Uncomplicated_Firewall). Easy to use firewall.
Here is a good [tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-16-04) from Digital Ocean.

Secondly, I limit my nginx to answer only from the frontend IP and from my home.
If is [evil](https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/), but whatever, I'm a teapot.
```
...
map $remote_addr $deny {
    default 1;
    11.11.111.11 0;
    222.22.222.22 0;
}

server {
    listen      80;
    listen [::]:80;
    server_name api.coffeewheel.xyz;
    if ($deny) { 
        return 418;
    }
	...
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name api.coffeewheel.xyz;

    if ($deny) { 
        return 418;
    }
	...
}
```

Also I generated more complex then 'testdev' passwords for the DB:)

But server improvements is not stopping there.

There is also [pm2](http://pm2.keymetrics.io/)
That's really useful and got docker containers ready.
This tool can restart the processes inside container and scale it if needed.

One more thing, it's better to use volumes for docker to not to lose the data from the db everytime:)

My docker-compose deploy is looking like this today:
```YAML
version: "3.3"
services:
  nginx:
    ...
  mysql:
    image: mysql:5.7.23
    ports:
      - "3306:3306"
	volumes:
	  # volume mount
      - coffeedata:/var/lib/mysql
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      - MYSQL_ROOT_PASSWORD=lalalalala

  cofferver:
	# useful docker image
    image: keymetrics/pm2:latest-alpine
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
	working_dir: "/app"
	# now I use pm2, in ecosystem all information needed image
    command: "pm2-runtime ecosystem.config.js"
    depends_on: 
      - mysql
    environment:
      - DB_HOST=mysql
      - DB_USER=lalalalala
      - DB_PASS=lalalalala
      ...
# volume defined!
volumes:
  coffeedata:
```

[Source Code UI](https://github.com/dmitrybirin/coffee-vueel)

[Source Code Backend](https://github.com/dmitrybirin/cofferver)