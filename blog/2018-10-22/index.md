---
date: "2018-10-22"
title: "Async and generators"
category: "Codectober"
---

Today will be even smaller one. Regarding the model.

I decided, that fetching stuff should be closer to model, so I refactored the model to use async actions inside.
Mobx-state-tree have good `flow` mechanism to use generators. You can also use the `async/await` (that's I did today), but it's [`not recommended`](https://github.com/mobxjs/mobx-state-tree/blob/master/docs/async-actions.md#what-about-async--await)

So now the model to send good cup of coffee look like that:

```javascript
import { types } from 'mobx-state-tree';
import Wheel from './wheel'


const postOptions = {
	method: 'POST',
	mode: 'cors',
	credentials: 'same-origin'
}

const serverEndpoint = `${process.env.serverEndpoint || 'http://localhost:3000'}`

const request = async (url, options) => {
	try {
		const res = await window.fetch(url, {	headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}, ...options})
		return res
	} catch (err) {
		throw new Error('Error while fetching:\n', err.message)
	}
}

const Cup = types.model({
	id: types.identifier,
	title: types.string,
	timestamp: types.string,
	description: types.string,
	loading: types.boolean,
	wheel: Wheel,
}).actions(self => ({
	send: async () => {
		self.beginLoading()
		const res = await request(`${serverEndpoint}/coffee`, {...postOptions, body: JSON.stringify(self)})
		if (res.status !== 204) {
			self.endLoading()
			throw new Error(`Error while posting: status code was ${res.status} not 204`)
		} 
		if (res.status === 204) {
			self.changeTitle('')
		}
		self.endLoading()
	},
	changeTitle(newTitle) {
		self.title = newTitle
	},
	changeDate(newDate) {
		self.timestamp = newDate
	},
	changeDescription(newDesc) {
		self.description = newDesc
	},
	beginLoading(){
		self.loading = true
	},
	endLoading(){
		self.loading = false
	}
}))

export default Cup;
```

the problem is, even I do `self.changeTitle('')`, title is not changing at all.
Tomorrow I'll rewrite it, and we can see the difference.

[Source Code still there](https://github.com/dmitrybirin/coffee-vueel/tree/modeling-sending)