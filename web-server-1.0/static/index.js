// Define variables to store the temperature values
let setTemp = 0;
let currentTemp = 0;
//Define for chart start time
let startTime = 0;

// Define a variable to store the timer for waiting after input
let inputTimer = null;


// Define a function to handle temperature changes
function changeTemperature() 
{
  let mainOptions = document.querySelector('.main-unit-options');
  let secondaryOptions = document.querySelector('.second-unit-options');
  let mainUnit = mainOptions.options[
    mainOptions.selectedIndex
  ].textContent.toLowerCase();
  let secondUnit = secondaryOptions.options[
    secondaryOptions.selectedIndex
  ].textContent.toLowerCase();
  
  // Get the input value and convert to a number
  let numberTyped = parseInt(document.getElementById('main-unit').value);

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
    let currentTyped = parseInt(document.getElementById('second-unit').value);
    
    // If the temperatures are different, start a loop to change the current temperature gradually
    if (currentTyped !== setTemp) {
      // Define variables for the loop
      let increment = (setTemp - currentTyped) / 10; // Change in temperature for each step
      let delay = 300; // Delay between steps (in ms)
      let counter = 0; // Counter for the loop
      
      // Define a function to change the temperature and update the display
      function updateTemperature() {
        currentTyped += increment;
        document.getElementById('second-unit').value = currentTyped.toFixed(1);
        counter++;
        if (counter < 10) {
          setTimeout(updateTemperature, delay);
        }
      }
      
      // Start the loop to change the temperature
      setTimeout(updateTemperature, delay);
    }
  }, 2200); // Wait 2.2 seconds before checking for changes
}

// Add event listeners for temperature input changes
document.getElementById('main-unit').addEventListener('input', changeTemperature);
document.getElementById('second-unit').addEventListener('input', changeTemperature);
