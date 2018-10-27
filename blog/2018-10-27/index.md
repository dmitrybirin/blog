---
date: "2018-10-27"
title: "JWTs"
category: "Codectober"
---

[JWT](https://jwt.io/) is the best
The feeling when you delete a lot of code that provide id through your client application is really cool.

All you need on server:


```javascript
const AUTH_CONFIG = require('../config')
const jwksRsa = require('jwks-rsa')
const jwt = require('koa-jwt')

const checkJwt = jwt({
	audience: AUTH_CONFIG.clientId,
	issuer: `${AUTH_CONFIG.domain}/`,
	algorithms: ['RS256'],
	secret: jwksRsa.koaJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${AUTH_CONFIG.domain}/.well-known/jwks.json`,
	}),
})

...

```

As a bonus, we can implement errorHandling for Jwt: 

```javascript
const jwtError = (ctx, next) =>
	next().catch(err => {
		if (401 == err.status) {
			throw new Error(
				'Authorization error on protected resource, use Authorization header or check server configuration'
			)
		} else {
			throw err
		}
	})
```

and then in routes:

```javascript
...
router
	.use(jwtError)
	.use(checkJwt)
...
```

Note, that jwt middlewares should be implemented on router level, not the app level.
Because if you'd done it on the app level - no preflight request could pass your defense. That's not what we need right now. 

On the client side:

```javascript
	...
	const idToken = await getItemAsync('id_token')
	const headers = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		'Authorization': `Bearer ${idToken}`
	});
	...
	fetch(endpoint, { headers })...

```

To obtain the token info - there is special `user` object expose for the `ctx`:

```javascript
...
.post('/coffee', async ctx => {
const userId = ctx.state.user.id
...
})
```

[Source Code UI](https://github.com/dmitrybirin/coffee-vueel/tree/modeling-sending)

[Source Code Backend](https://github.com/dmitrybirin/cofferver)