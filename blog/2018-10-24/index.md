---
date: "2018-10-24"
title: "List and Router"
category: "Codectober"
---

So finally I added the list in my project.
It's look really ugly, bit it's fetching information from the server with the list model nd Vue Router:

```javascript
import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import Cup from './cup'

import { getData, request } from '../helpers'

const CupList = types.model({
	items: types.array(Cup)
}).actions(self => ({
	getList: flow(function* getList() {
		const res = yield request(`/coffee`)
		const data = yield getData(res)
		self.items = data.map(cup => ({...cup, loading: false, id: String(cup.id)}))
	}),
}))

export default CupList
```
`String(cup.id)` looks really ugly, will change it.

Also [`Vue-router`](https://router.vuejs.org/guide/#javascript) take 5 minutes of my time to run, less then React one:)

Here is the router code:

```javascript
//main.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import App from './App.vue'
import List from './components/List'
import New from './components/New'

Vue.use(VueRouter)

const routes = [
  { path: '/list', component: List },
  { path: '/new', component: New }
]
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

```

```html
<!-- Home template -->
<template>
    <div id='container'>
		<div id='nav'>
			<h1>Welcome back</h1>
			<router-link to="/list">Go to List!</router-link>
			<router-link to="/new">Create New!</router-link>	
		</div>
		<router-view></router-view>
    </div>
</template>
```

And thaks to [Netlify](netlify.com), here is [preview from PR](https://5bd0e62782d3f1724e7b4028--coffewheel.netlify.com/#/)

[Source Code UI](https://github.com/dmitrybirin/coffee-vueel/tree/modeling-sending)

[Source Code Backend](https://github.com/dmitrybirin/cofferver)
