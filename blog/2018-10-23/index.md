---
date: "2018-10-23"
title: "Small issue can lead to big understanding"
category: "Codectober"
---

[Yesterday](./async-and-generators) I've got an issue with generators and not changing title.

So, first solution:

**Error with generators**: 

I've got flow and generators in my `MST` model - I've got `setImmediate not defined` error in console. Well, because there is no such thing as setImmediate in latest [Chrome](https://caniuse.com/#feat=setimmediate).

Simple solution is direct - insall the polyfill: [`setImmediate`](https://github.com/YuzuJS/setImmediate) will do. And don't forget to require it in your model file, or prior its load and you'll be fine.

**Title not clearing up**: 

Yesterday, I've got all set up, but as I understand now, I've got a mess in my Vue template:

```html
<template>
    ...
			<input 
				id="title"
				placeholder="name your coffee"
				type="text" 
				@value="cup.title"
				@input="e => cup.changeTitle(e.target.value)"
			/>
	...
</template>
```

So the value in the model was updated from input, but not actually readed from model.

After [RTFM](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) there is the right thing to do calue binding in vue and mobx-state-tree
```html
<template>
    ...
            <input 
                id="title"
                placeholder="name your coffee"
                type="text" 
                v-bind:value="cup.title"
                v-on:input="onValueChange"
            />
	...
</template>
<template>
    <div id='container'>
        <div id="title-container">

            <label for="title">Name your coffee</label>
        </div>
        <button @click="this.sendCup">Send!</button>
    </div>
</template>
```

So if you've got reproducable small isue, it could lead you to a better understanding of your code:)

[Source Code still there](https://github.com/dmitrybirin/coffee-vueel/tree/modeling-sending)