---
date: "2018-10-04"
title: "Coffee Counter (where counter is a model)"
category: "Codectober"
---

So, because today is Friday I have got a lot of time really, but this will not stop me to do something.

I decided to take timeout with the coffee theme, but still tinker with `mobx-state-tree`.

Today, I've created yet another site on [SWAPI](https://swapi.co).

It just fetching the first 10 characters from Star Wars and show you the random one.

Interesting thing, that everything, related to data is in mobx-state-tree.

Loading the data with the help of generators - is cool and simplier, then redux-saga, for example.

This is the whole data model with fetching and get random

```javascript
import { types, flow } from 'mobx-state-tree'
import { v4 } from 'uuid'

const Character = types.model('Character', {
	id: types.identifier,
	name: types.string,
	height: types.number,
})

const CharacterList = types
	.model('CharacterList', {
		items: types.array(Character),
		current: types.maybeNull(types.reference(Character), null),
		loading: types.boolean,
	})
	.actions(self => ({
		load: flow(function* load() {
			try {
				self.loading = true
				const res = yield window.fetch('https://swapi.co/api/people/')
				const json = yield res.json()
				self.items.push(
					...json.results.map(c => ({
						id: v4(),
						height: parseInt(c.height),
						name: c.name,
					}))
				)
			} catch (e) {
				throw ('Error, while loading:\n', e)
			} finally {
				self.loading = false
			}
		}),
		getRandomCharacter() {
			self.current = self.items[Math.floor(Math.random() * self.items.length)]
		},
	}))

export const list = CharacterList.create({ items: [], loading: false })

```

Trick is with the reference type. You cannot put leaf from the tree somewhere in the tree again, but reference is ok. With it you'll need identifier and somehow generate them. I've got uuid for it.


Next time - will try to create simple trivia with it.

Here is [dumb site](https://unruffled-nobel-eebf7f.netlify.com/) and [Source code](https://github.com/dmitrybirin/swapiti)