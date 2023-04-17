// Define variables to store the temperature values
let setTemp = 0.00;
let currentTemp = 0.00;
//Define for chart start time
let startTime = 0;

// Define a variable to store the timer for waiting after input
let inputTimer = null;

let temperatureData = [];
let timeLabels = [];


// Define a function to handle temperature changes
function changeTemperature() {
  let mainOptions = document.querySelector('.main-unit-options');
  let secondaryOptions = document.querySelector('.second-unit-options');
  let mainUnit = mainOptions.options[
    mainOptions.selectedIndex
  ].textContent.toLowerCase();
  let secondUnit = secondaryOptions.options[
    secondaryOptions.selectedIndex
  ].textContent.toLowerCase();
  
  // Get the input value and convert to a number
  let numberTyped = parseFloat(document.getElementById('main-unit').value);

  if (mainUnit === 'celsius') {
    if (secondUnit === 'kelvin') {
      setTemp = numberTyped + 273.15;
    } else if (secondUnit === 'fahrenheit') {
      setTemp = (numberTyped * 9) / 5 + 32;
    } else {
      setTemp = numberTyped;
    }
  } else if (mainUnit === 'kelvin') {
    if (secondUnit === 'celsius') {
      setTemp = numberTyped - 273.15;
    } else if (mainUnit === 'fahrenheit') {
      setTemp = ((numberTyped - 273.15) * 9) / 5 + 32;
    } else {
      setTemp = numberTyped;
    }
  } else if (mainUnit === 'fahrenheit') {
    if (secondUnit === 'celsius') {
      setTemp = ((numberTyped - 32) * 5) / 9;
    } else if (secondUnit === 'kelvin') {
      setTemp = ((numberTyped - 32) * 5) / 9 + 273.15;
    } else {
      setTemp = numberTyped;
    }
  }
  
  // If the input timer is running, clear it
  if (inputTimer !== null) {
    clearTimeout(inputTimer);
  }
  
  // Start a new timer to check for temperature changes
  inputTimer = setTimeout(() => {
    // Get the current temperature and convert to a number
    let currentTyped = parseFloat(document.getElementById('second-unit').value);
    
    // If the temperatures are different, start a loop to change the current temperature gradually
   if (currentTyped !== setTemp) {
      // Define variables for the loop
      let test=setTemp - currentTyped;
      
      let increment = (setTemp - currentTyped) /20.00; // Change in temperature for each step
      console.log('Increment:', increment); 
      let delay = 900; // Delay between steps (in ms)
      let counter = 0; // Counter for the loop
      
      // Define a function to change the temperature and update the display
      function updateTemperature() {
        console.log('Minus:', test); 
        currentTyped += increment;
        document.getElementById('second-unit').value = currentTyped.toFixed(2);
        counter++;
        if (counter < 20) {
          setTimeout(updateTemperature, delay);
        }
      }
      
      // Start the loop to change the temperature
      setTimeout(updateTemperature, delay);
    }
  }, 2200); // Wait 2.2 seconds before checking for changes
}


// Define a function to start the chart updating
function startChart() {
  chartIntervalId = setInterval(() => {
    // Fetch the current temperature value and add it to the data array
    let currentTemp = parseFloat(document.getElementById('second-unit').value);
    let currentTime = new Date();
    temperatureData.push(currentTemp);

    // Add the current time to the time labels array
    timeLabels.push(currentTime.toLocaleTimeString());

    // Update the chart with the new data and labels
    temperatureChart.data.datasets[0].data = temperatureData;
    temperatureChart.data.labels = timeLabels;
    temperatureChart.update();
  }, 1000);
}

// Define a function to stop the chart updating
function stopChart() {
  clearInterval(chartIntervalId);
}

// Add event listeners for temperature input changes
document.getElementById('main-unit').addEventListener('input', changeTemperature);
document.getElementById('second-unit').addEventListener('input', changeTemperature);

// Initialize the chart
let temperatureChart = new Chart('temperature-chart', {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Temperature (°C)',
      data: temperatureData,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 3,
      fill: false
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            minute: 'h:mm a'
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontSize: 16 // optional font size
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Temperature (°C)!!',
          fontSize: 16 // optional font size
        }
      }]
    },
    title: {
      display: true,
      text: 'Temperature Chart',
      fontSize: 20 // optional font size
    }
  }
});






// Add event listeners for the start and stop buttons
document.getElementById('start-chart-button').addEventListener('click', startChart);
document.getElementById('stop-chart-button').addEventListener('click', stopChart);
