---
date: "2018-10-28"
title: "Dockerize everything"
category: "Codectober"
---

It's [alive](https://coffeewheel.xyz)

DevOps expirience was never my best part, but this part should be done.

### Architecture


I'm hosting frontend on [Netlify](https://netlify.com) and backend on [Digital Ocean](digitalocean.com) droplet. It'll cost me 5$ a month. If there will not be a lot of user, that I, frankly hope, in current state :)

I'm using domain from [NameCheap](https://namecheap.com/‎). But all domain setup is on Netlify.
I've got subdomain for the backend.

For digital ocean droplet I've chosen the [Docker One-Click Application](https://www.digitalocean.com/docs/one-clicks/docker/). It's just Ubuntu with docker-compose installed.

As HTTP server for backend I'm using Nginx. Main problem with all this setup - `https`.

Cause I want to (and should) use https on my frontend, I should (and want) use https for the backend.
Https on frontend is easy done with Netlify, but for the backend, some brain needed.

Fortunately, there is a good [article](https://www.humankode.com/ssl/how-to-set-up-free-ssl-certificates-from-lets-encrypt-using-docker-and-nginx) on Internet, how to setup https with Nginx and dockerized Certbot.


So, final `docker-compose.deploy.yml`

```YAML
version: "3.3"
services:
  nginx:
    image: nginx:1.15.5-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/ngnix.conf:/etc/nginx/conf.d/default.conf
      - /etc/nginx/logs/access.log:/etc/nginx/access.log
      - /etc/nginx/logs/error.log:/etc/nginx/error.log
      - /docker-volumes/etc/letsencrypt/live/api.coffeewheel.xyz/fullchain.pem:/etc/letsencrypt/live/api.coffeewheel.xyz/fullchain.pem
      - /docker-volumes/etc/letsencrypt/live/api.coffeewheel.xyz/privkey.pem:/etc/letsencrypt/live/api.coffeewheel.xyz/privkey.pem      
    depends_on:
      - cofferver
```

and not final nginx:

```
server {
    listen      80;
    listen [::]:80;
    server_name api.coffeewheel.xyz;

    #for certbot challenges (renewal process)
    location ~ /.well-known/acme-challenge {
        allow all;
        root /data/letsencrypt;
    }

    access_log /etc/nginx/access.log;
    error_log  /etc/nginx/error.log;

}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name api.coffeewheel.xyz;

    access_log /etc/nginx/access.log;
    error_log  /etc/nginx/error.log;

    ssl_certificate      /etc/letsencrypt/live/api.coffeewheel.xyz/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/api.coffeewheel.xyz/privkey.pem;

    ...

    # proxy to the nodejs application
    client_max_body_size 64G;
    proxy_pass   http://cofferver:3000;
	...
  }
}
```

[Source Code UI](https://github.com/dmitrybirin/coffee-vueel)

[Source Code Backend](https://github.com/dmitrybirin/cofferver)