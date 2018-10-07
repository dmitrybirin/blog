---
date: "2018-10-07"
title: "Mobx is "
category: "Codectober"
---

Well, yesterday I've got a question, where to pu my `onPatch` function:

```javascript
onPatch(store, patch => {
	if (patch.op === 'replace' && patch.path === '/list/current') {
		store.list.current.loadImage()
	}
})
```

After digging a bit, mobx-state-tree model has [lifecycles](https://github.com/mobxjs/mobx-state-tree#lifecycle-hooks-for-typesmodel)!

So, it's better to put hooks in afterCreate action:

```javascript
const CharacterList = types
	.model('CharacterList', {
		items: types.array(Character),
		...
	})
	.actions(self => ({
		...
		afterCreate() {
			onPatch(self, patch => {
				if (patch.op === 'replace' && patch.path === '/current') {
					self.current.loadImage()
				}
			})
		},
	}))
```

[dumb site still there](https://unruffled-nobel-eebf7f.netlify.com/) and [Source code](https://github.com/dmitrybirin/swapiti)


Episode II

Well, I've got myself into [Vue.js](https://vuejs.org/).
And decided to change my coffee-counter simple app to use Vue instead of React.

First impression: easy to setup framework. No webpack config etc. Hot Reload form the box.
Second impression: well, that's how Angular should be loking from the beggining.
Plus kudos for styled components - relatively easy to put them into simple css styling.

Third impression: well, I've got Vue, I've got Mobx - bum - no, not VueX yet:) 
But these too not really friends.

And my MobX view don't wanna to be observed automatically, that sad, but there should be a way.
[Source code](https://github.com/dmitrybirin/coffee-counter/tree/vue)

Will continue to tinkering with Vue.js tomorrow!

Happy next week everyone!


