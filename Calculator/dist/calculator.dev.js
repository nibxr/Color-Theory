"use strict";

var display = document.querySelector('.display');
var colorButtons = document.querySelectorAll('.color');
var plusButton = document.querySelector('.plus');
var equalsButton = document.querySelector('.equals');
var clearButton = document.querySelector('.clear');
var expression = '';
colorButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    // Get the color name associated with the button
    var colorName = button.textContent; // Append the color name to the expression

    expression += colorName; // Update the display with the current expression

    display.textContent = expression;
  });
});
plusButton.addEventListener('click', function () {
  // Append the '+' sign to the expression
  expression += ' + '; // Update the display with the current expression

  display.textContent = expression;
});
equalsButton.addEventListener('click', function () {
  // Evaluate the expression and get the result color name
  var result = evaluateExpression(expression); // Update the display with the result color name

  display.textContent = result; // Clear the expression

  expression = '';
});
clearButton.addEventListener('click', function () {
  // Clear the display and the expression
  display.textContent = '';
  expression = '';
}); // Function to evaluate the color mixing expression

function evaluateExpression(expression) {
  try {
    // Remove any spaces from the expression
    var cleanedExpression = expression.replace(/\s+/g, ''); // Split the expression into color names and operators

    var parts = cleanedExpression.split('+');
    var result = 'Black'; // Default result color
    // Map color names to their corresponding colors

    var colors = {
      'Red': 'red',
      'Green': 'green',
      'Blue': 'blue',
      'Black': 'black' // You can add more colors as needed
      // Add more color mappings here

    }; // Loop through the parts and mix the colors

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var part = _step.value;
        var colorName = part.trim();

        if (colors[colorName]) {
          // Mix the current color with the result color
          result = mixColors(result, colors[colorName]);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  } catch (error) {
    console.error('Error evaluating expression:', error);
    return 'Error';
  }
} // Function to mix two colors


function mixColors(color1, color2) {
  // Implement your color mixing logic here
  // For simplicity, this example assumes you have a predefined set of colors
  // and a function to mix them. You may need to use a library or other method
  // to perform actual color mixing.
  return 'Yellow'; // Replace with actual color mixing logic
} // ... (previous code)


var clickSound = new Audio("click.wav"); // Preload the audio

colorButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    // Play the click sound
    clickSound.currentTime = 0; // Rewind the audio to start

    clickSound.play(); // Get the color code associated with the button

    var colorCode = button.style.backgroundColor; // Set the display to the selected color

    display.style.backgroundColor = colorCode;
    currentColor = colorCode;
  });
}); // ... (rest of your existing code)
// ... (rest of your existing code)
//# sourceMappingURL=calculator.dev.js.map
