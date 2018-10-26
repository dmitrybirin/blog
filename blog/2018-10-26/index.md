---
date: "2018-10-26"
title: "Auth0 with models"
category: "Codectober"
---

So today I refactored my service to use model.
Still I've got service file with auth0 instance, but now app state is in the mobx model.

```javascript
import { types, flow } from 'mobx-state-tree'

...

const Auth = types
	.model({
		authenticated: types.boolean,
		userName: types.string,
	})
	.actions(self => ({
		...
		async rehydrate() {
			self.changeUser(await self.getUser())
			self.changeAuthenticated(await self.isAuthenticated())
		},
	}))

export default Auth
```

`rehydrate` is for the `mounted` method to get all the possible state from the local storage.
[The whole code here](https://github.com/dmitrybirin/coffee-vueel/tree/modeling-sending)

About the local storage - sometimes, you're in the situation, when you're not have null, while getting the existing item.

So, I wrote this as a workaround.
```javascript
const getItemAsync = async (key, count = 0) => {
	if (count > 9) throw new Error(`Cannot get the item '${key}'`)
	else if (!localStorage.getItem(key)) {
		await new Promise(res => setTimeout(res, 100))
		count += 1
		await getItemAsync(key, count)
	}
	return localStorage.getItem(key)
}
```

Tomorrow will be final deploy and using and I finally change subject to something else.


