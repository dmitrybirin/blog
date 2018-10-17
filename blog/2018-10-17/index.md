---
date: "2018-10-17"
title: "Cofferver"
category: "Codectober"
---

Today I decided to move to server side.
We've got nice looking interactive chart, but we need to deal with our data and store it somewhere.
So server time!

I went with Node.js Koa, cause Express not so sexy for me anymore and why not.

So we need a server:
```javascript
    // index.js
    const Koa = require('koa')
    const koaBody = require('koa-body');

    const err = require('./middlewares/error')
    const { routes, allowedMethods} = require('./routes')

    const app = new Koa()
    const port = 3000

    app.use(err);
    app.use(koaBody());
    app.use(routes());
    app.use(allowedMethods());


    console.log(`Listen to the port ${port}`)
    app.listen(port)
```

Some routes for starters:
```javascript
// router.js
const Router = require('koa-router')
const router = new Router()

router
.get('/health', async (ctx) => {
    ctx.body = {
        status: 'ok',
        data: `I'm ok`
    }
})
.post('/coffee/:id', async (ctx) => {
    console.log(ctx.params.id, ctx.request);
    ctx.body = {
        status: 'ok',
        data: `I've got this: ${JSON.stringify(ctx.request.body)}`,
    }

})

module.exports = {
    routes: () => router.routes(),
    allowedMethods: () => router.allowedMethods(),
}

```

And simple middleware for errors:
```javascript
// middlewares/error.js
module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            status: 'error',
            message: err.message || 'unknown have thing just happened, bro:('
        };
    }
}
```

And that's all, our server getting requests and data, we'd sent to it:
```bash
curl -X POST -H 'Content-Type:application/json' http://localhost:3000/coffee/1138 -d '{"test":"ok", "numbers": [1,1,3,8]}'
{"status":"ok","data":"I've got this: {\"test\":\"ok\",\"numbers\":[1,1,3,8]}"}%
```

Today was a short day, I've created account at [DigitalOcean](digitalocean.com) and tomorrow will deploy all this with DB connection.


[Source Code](https://github.com/dmitrybirin/cofferver)