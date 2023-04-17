// Initialize the chart
let chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Temperature (Celsius)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: []
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            duration: 60000, // 1 minute
            refresh: 1000, // 1 second
            delay: 2000, // 2 seconds
            onRefresh: function(chart) {
              chart.data.datasets[0].data.push({
                x: Date.now(),
                y: 200
              });
            }
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });
  