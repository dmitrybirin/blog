---
date: "2018-10-15"
title: "Trigonometry and charts"
category: "Codectober"
---

Remember how in school they said to you on the trigonometry lessons - it'll be useful. And you like "Yeah, sure.".
Well, they were right:) trigonometry rocks!

So I refactored yesterday code to use cos and sin instead of just calculating the distance - and I've got sign calculation out of the box (and dividing by zero too...), cause
![Alt Text](./science.gif)

(And I think this will be my favourite gif for months)

Tomorrow - proper polar coordinates

Today this:
```javascript
	    rangeValue(value){
        const { max, min } = this.chart.scale
        if (value > max) return max
        if (value < min) return min
        return value
    },
    getValueFromPoint(x,y){
        const { scale } = this.chart
        const angleRad = scale.getIndexAngle(this.drag.idx)
        const angle = angleRad * 180/ Math.PI
        let dist;
        // Probably need be more fare to poor sin
        if (angleRad === Math.PI/2 || angleRad === 3*Math.PI/2) {
          dist = (x-scale.xCenter)/Math.sin(angleRad)
        } else {
          dist = (scale.yCenter-y)/Math.cos(angleRad)
        }
        
        const scalingFactor = scale.drawingArea / (scale.max - scale.min)
        const value = (dist/scalingFactor ) + scale.min
        return this.rangeValue(value)
    },
```

[Source Code](https://github.com/dmitrybirin/coffee-vueel)