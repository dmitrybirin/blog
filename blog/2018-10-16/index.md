---
date: "2018-10-16"
title: "Hack that succeeded"
category: "Codectober"
---

I just remember that I've already using distance and angle, so I'm already polar as bear.
So instead I've decided added even more interactivity.
I need to reacting on click. And that's different story.

First of all I need to got angle from X and Y - convert cartesian system to polar one.
```javascript
    (event) => {
        const Pi = Math.PI
        // if-else for getting whole 360, like chartjs has
        let angle;
        if (scale.yCenter -event.layerY > 0) {
            angle = Math.atan2(
                scale.yCenter - event.layerY,
                event.layerX - scale.xCenter
            );
        } else {
            angle =
                Math.atan2(
                    scale.yCenter - event.layerY,
                    event.layerX - scale.xCenter
                ) +
                2 * Pi;
        }
    }
```

Then, convert default polar system to one, that chart js using: 
 - invert (180 - angle)
 - rotate on 90 degrees

```javascript
 const convertedAngle = (2 * Pi - angle + Pi / 2) % (2 * Pi);
```

Then, understand distance in radians between meaningful labeled rays and clicked point and get the right one ray.

```javascript
    // dataAngles - array of angles with rays
    ...
    // this is a hack for corner situation when you're clicking near 0/360 turnover
    if (convertedAngle >2 * Pi - Pi / this.dataAngles.length) {
        this.current.idx = 0;
    } else {
        const angleDiff = this.dataAngles.map(da =>
            Math.abs(da - convertedAngle)
        );
        let index = angleDiff.indexOf(Math.min(...angleDiff));
        this.current.idx = index;
    }

```

After a lot of thinking, that's what I have:
![Alt Text](./coffewheel_cool.gif)

You can try it [your self](https://quizzical-booth-f1b4dd.netlify.com/)

[Source Code](https://github.com/dmitrybirin/coffee-vueel)