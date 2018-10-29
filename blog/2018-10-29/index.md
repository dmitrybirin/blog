---
date: "2018-10-29"
title: "Aftermath"
category: "Codectober"
---

So after some code alive, you start to notice various bugs.
One of them was when you clicked on the save button and everything going to server, our beloved graph not reseting.

So fix was simple - implement reset in the model:

```javascript
const Wheel = types
	.model({
		...
	})
	.actions(self => ({
		...
		reset() {
			for (let key of Object.keys(self.toJSON())) {
				self[key] = 1
			}
		},
	}))
```

And it's parent too for clarity:

```javascript
const Cup = types
	.model({
		...
		title: types.string,
		description: types.string,
		loading: types.boolean,
		wheel: types.maybe(Wheel),
	})
	.actions(self => ({
...
		reset() {
			self.title = ''
			self.description = ''
			self.loading = false
			self.wheel.reset()
		},
	}))
```

So now it's looking really great! 
![Alt Text](./whoop.gif)

Need to implement list and make it pretty then.

[Source Code UI](https://github.com/dmitrybirin/coffee-vueel)

[Source Code Backend](https://github.com/dmitrybirin/cofferver)