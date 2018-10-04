---
date: "2018-10-04"
title: "Coffee Counter (where counter is a model)"
category: "Codectober"
---

Finally today, on the forth day, I've reach some new tech.

I've always used native state/Context or Redux for react state management.

But in complex applications changes in Redux could be mind bending, and switching between 3 files (reducer, action and component) not adding any convinience.

So today I'm trying [MobX state tree](https://github.com/mobxjs/mobx-state-tree)

For simple application like yesterday bean calculator, it's pretty straightforward:

```javascript
const { types } = require('mobx-state-tree')

// Creating the model
const Counter = types
	.model('Counter', {
		ratio: types.number,
		volume: types.string,
	})
	.actions(self => ({
		changeVolume(newVolume) {
			self.volume = newVolume
		},
		changeRatio(newRatio) {
			self.ratio = newRatio
		},
	}))
	.views(self => ({
		get gramms() {
			return self.volume / self.ratio
		},
    }))
    
// Creating the instance
export const counter = Counter.create({
	ratio: 14,
	volume: '',
	gramms: 0,
})
```

You've got a model, model is read only, but you can create actions and change it.
Also it has views for calculatable fields (like you normally do in reducers).
Model can have instance that you populating with data. 

That's it - you have your 'living tree', standing there, slowly mutating with the wind.

Cool thing, that the instance is could be simply imported anywhere we want it.
Not cool thing, that React doesn't now about any of the changes because of that, so we still need wrapper.

```javascript
import { observer } from 'mobx-react'

...

export default observer(YourNeedToBeReRenderedComponent)
```

But I can live with it for now:)

Next time - do more complex logic with network and try to compare Redux and MobX state tree in one playground.

Here is the new version with the [same dumb funcitonality](https://5bb675e2c965925566d4e650--quirky-wright-a8e210.netlify.com/))

![Alt Text](https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif)

[Source code](https://github.com/dmitrybirin/coffee-counter/tree/mobx-state)