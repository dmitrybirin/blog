---
date: '2018-10-08'
title: 'Vue lives'
category: 'Codectober'
---

Well, yesterday I though that mobx-state-tree and Vue not friends, but I was mistaken.
I just didn't know how to deal with Vue. It's marvelous how you can just push the model instance in Vue data object and everything will be working and updating reactively.

Below javascript part.

```html
<script>
import Volume from './Volume.vue'
//that's our model import
import { counter } from './models/counter'

export default {
	name: 'app',
	components: {
        Volume,
	},
	data: () => ({
        //that's our model using
        counter,
	}),
}
</script>
```

Template part:

```html
<template>
  <div>
    <h1>Count your beans!</h1>
    <div id="row">
      <div>
        <h3 id="subtitle">ratio</h3>
          <div id="fraction">{{  `1/${counter.ratio}` }}</div>
	  </div>
      <Volume />
    </div>
    <h3 id="subtitle">gramms</h3>
    <p id="result">{{ `${Math.floor(counter.gramms)}` }}</p>
  </div>
</template>
```

Frankly I missed jsx, and I hate to use directive like `v-for` instead of just doing it with javascript 'map', but vue is simplier, that it seems, and thats a good thing. I'll try next idea in Vue and share my thought, when I'll be familiar with tech more.

[Source code](https://github.com/dmitrybirin/coffee-counter/tree/vue)

