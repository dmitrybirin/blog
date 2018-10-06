---
date: "2018-10-06"
title: "Mobx state tree continues"
category: "Codectober"
---

Lazy Friday, but got the prototype with mobx-state-tree working further.

The more I playing with it, the more I like it.

When Model is growing you can always split it in files and then bring together in one store - the same with Redux.
But convinient part - your actions right with you.

Tricky part is with the loading from server and lifecycles.
Cuase all your data changes handled by mobx, you don't need to do it with react.
But still, if you need to load image, for example, only after you load list with the names, upon loading image relate.

For now I can only do this:

```javascript
onPatch(store, patch => {
	if (patch.op === 'replace' && patch.path === '/list/current') {
		store.list.current.loadImage()
	}
})
```

But in the tree itself should be lifecycles, so it will be my tomorrow task.

![Alt Text](https://media0.giphy.com/media/8IZCR0wzEIQms/giphy.gif)

[dumb site still there](https://unruffled-nobel-eebf7f.netlify.com/) and [Source code](https://github.com/dmitrybirin/swapiti)

