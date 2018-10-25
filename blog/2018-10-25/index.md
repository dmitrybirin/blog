---
date: "2018-10-25"
title: "Auth part 0"
category: "Codectober"
---

I used [Auth0](https://auth0.com) before. But everytime this service not working from the first attempt.
They doing great job, a lot of tutorials and examples ans yet somehow, I can't manage it from the first time. Probably because configuration has a lot of different things that you can forget about - and I forget:)

Nevertheless, it's working now. Here is my main Auth file:
```javascript
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-config'
import EventEmitter from 'EventEmitter'
import router from '../router'

class AuthService {

  constructor () {
	this.authenticated = this.isAuthenticated()
	this.authNotifier = new EventEmitter()
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login = () => {
	this.auth0.authorize()
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.push('/')
      } else if (err) {
        router.push('/')
        console.log(err)
      }
    })
  }

  setSession = authResult => {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
	)
	
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout = () =>  {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.push('/')
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

const auth = new AuthService();

export default auth;
```

Tomorrow will be refactoring with models + server.

[Source Code UI](https://github.com/dmitrybirin/coffee-vueel/tree/modeling-sending)

