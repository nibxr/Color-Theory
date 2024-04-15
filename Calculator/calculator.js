let display = document.querySelector('.display');
let colorButtons = document.querySelectorAll('.color');
let plusButton = document.querySelector('.plus');
let equalsButton = document.querySelector('.equals');
let clearButton = document.querySelector('.clear');
let currentExpression = ''; // Initial expression

// Define color combinations and their results
let colorCombinations = {
    'Red+Green': 'Yellow',
    'Red+Red+Green': 'Orange',
    'Red+Green+Red': 'Orange',
    'Green+Red+Red': 'Orange',
    'Green+Red': 'Yellow',
    'Green+Green+Red': 'Tea Green',
    'Green+Red+Green': 'Tea Green',
    'Red+Green+Green': 'Tea Green',
    'Red+Blue': 'Magenta',
    'Red+Red+Blue': 'Pink',
    'Red+Blue+Red': 'Pink',
    'Blue+Red+Red': 'Pink',
    'Blue+Red': 'Magenta',
    'Blue+Blue+Red': 'Violet',
    'Blue+Red+Blue': 'Violet',
    'Red+Blue+Blue': 'Violet',
    'Green+Blue': 'Cyan',
    'Green+Green+Blue': 'Turquoise',
    'Green+Blue+Green': 'Turquoise',
    'Blue+Green+Green': 'Turquoise',
    'Blue+Green': 'Cyan',
    'Blue+Blue+Green': 'Sky Blue',
    'Blue+Green+Blue': 'Sky Blue',
    'Green+Blue+Blue': 'Sky Blue',
    'Red+Green+Blue': 'White',
    'Red+Blue+Green': 'White',
    'Green+Blue+Red': 'White',
    // Add more color combinations here
};

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        let colorName = button.getAttribute('data-color');
        currentExpression += colorName;
        display.textContent = currentExpression;
    });
});

plusButton.addEventListener('click', () => {
    currentExpression += '+';
    display.textContent = currentExpression;
});

equalsButton.addEventListener('click', () => {
    let resultColor = colorCombinations[currentExpression];
    if (resultColor) {
        display.textContent = resultColor;
    } else {
        display.textContent = 'Invalid Combination';
    }
    currentExpression = '';
});

clearButton.addEventListener('click', () => {
    display.textContent = '';
    currentExpression = '';
});


// Create a reusable function to play the click sound
function playClickSound() {
    let clickSound = new Audio("click.wav");
    clickSound.currentTime = 0; // Rewind the audio to start
    clickSound.play();
}

// Add click event listeners to all buttons
let allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        playClickSound(); // Play the click sound for all buttons
        
        if (button.classList.contains('color')) {
            // Get the color code associated with the button
            let colorCode = button.style.backgroundColor;
            // Set the display to the selected color
            display.style.backgroundColor = colorCode;
        } else if (button === plusButton) {
            // Handle the + button click
        } else if (button === equalsButton) {
            // Handle the = button click
        } else if (button === clearButton) {
            // Handle the clear button click
        }
    });
});

// Rest of your code

