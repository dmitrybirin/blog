---
date: "2018-10-14"
title: "Drag & Wheel"
category: "Codectober"
---

Yesterday I decided to implement dragging function for Chart.js radial `Radar` chart.
So, after all temptations to use plugin, I decided to go deeper and use only libraries I already had.

The best answers in stack overflow about implementing this was to use `getValueForPixel` on the scale object.
But guess what? There is no such function for radial graphs!
After trying to implement it I had to remember all geometry lessons from my school level 10:) 

But I did it! Tomorrow try to PR chartJs with it.

Code for dragging part:
```javascript
	data: () => ({
		...
		chart: null,
		drag: {
			status: false,
			label: null,
		},
	}),
	methods:{
	...
    getValueFromPoint(x,y){
        const scale = this.chart.scale
        const dist = Math.sqrt(Math.pow(scale.xCenter-x, 2) + Math.pow(scale.yCenter-y, 2))
        const scalingFactor = scale.drawingArea / (scale.max - scale.min)
        return (dist/scalingFactor ) + scale.min   
    },
    handleClick(e, arr){
    
        if (e.type === 'mousedown' && arr.length!==0) {
            this.drag.status = true;
            const scale = this.chart.scale
            
            const chartData = arr[0]['_chart'].config.data;
            const idx = arr[0]['_index'];
            this.drag.label = chartData.labels[idx];
        }
        if (e.type === 'mousemove' && this.drag.status) {
            wheel.changeItem(this.drag.label, String(this.getValueFromPoint(e.layerX, e.layerY)))
        }

        if (e.type === 'mouseup' && this.drag.status) {
            this.drag.status = false;
        }
    },
	...
	}
```
It's not the best implementation, cause distance to the new point is calculated without regarding the axis it moving. So If I drag point beyond zero, for example, it will be moving opposite.


How it looks:

![Alt Text](./draggable.gif)

[Source code](https://github.com/dmitrybirin/coffee-counter/tree/mobx-state)