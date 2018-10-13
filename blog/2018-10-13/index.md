---
date: '2018-10-13'
title: 'Updates! I live for updates!'
category: 'Codectober'
---

So, I did the updates for my cofee wheel chart! And it wasn't so tough.

Today I've learned the secret of Vue [watchers](https://vuejs.org/v2/guide/computed.html#Watchers).

Watchers simply fire a function, when the property with the same name is changed.
So, if the data points are changed, you can fire a function with recreating the chart.
```javascript
export default {
  name: 'Chart',
  computed: {
    chartData: () => ({
      labels: Object.keys(wheel),
      datasets: [
        {
          pointStyle: 'circle',
          pointRadius: 5,
          label: 'coffeewheel',
          data: Object.values(wheel)
        }
      ]
    })
  },
  watch: {
    chartData: function(newData) {
      this.createChart('coffee-wheel', { data: newData, options });
    }
  },
  data: () => ({
    wheel
  }),
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: 'radar',
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart('coffee-wheel', { data: this.chartData, options });
  }
};
```

The second thing, that I've learned - chartjs chart object has [update method](https://www.chartjs.org/docs/latest/developers/updates.html)!
That's hilarious. So now I can do this:

```javascript
export default {
  name: 'Chart',
  computed: {
    chartPoints: () => Object.values(wheel)
  },
  // I can watch only for new data points, that calculated upon model instance
  watch: {
    chartPoints: function(newPoints) {
      this.chart.data.datasets[0].data = newPoints;
      // And I can update the chart with new data points!
      this.chart.update();
    }
  },
  data: () => ({
    wheel,
    chart: null
  }),
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      this.chart = new Chart(ctx, {
        type: 'radar',
        data: chartData.data,
        options: chartData.options
      });
    },
  },
  mounted() {
    this.createChart('coffee-wheel', initData);
  }
};
```

This is current step:

![Alt Text](./coffeewheelupdate.gif)


[Source Code](https://github.com/dmitrybirin/coffee-vueel)
