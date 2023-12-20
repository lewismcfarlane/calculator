const additionOperation = (a, b) => {
	return a + b;
};

const subtractionOperation = (a, b) => {
	return a - b;
};

const divisionOperation = (a, b) => {
	return a / b;
};

const multiplicationOperation = (a, b) => {
	return a * b;
};

const ADD = '+';
const SUBTRACT = '-';
const DIVIDE = '/';
const MULTIPLY = '*';

let firstInput = '';
let secondInput = '';
let operator = '';
let operatorClicked = false;

// DOM elements
const calculationDisplay = document.getElementById('calculationDisplay');
const userInputDisplay = document.getElementById('userInputDisplay');
const clearButton = document.getElementById('clearButton');
const toggleButton = document.getElementById('togglePositiveNegativeButton');
const percentageButton = document.getElementById('percentageButton');
const divisionButton = document.getElementById('divisionButton');
const multiplicationButton = document.getElementById('multiplicationButton');
const subtractionButton = document.getElementById('subtractionButton');
const additionButton = document.getElementById('additionButton');
const numberButtons = document.querySelectorAll('.calculatorButton:not(#clearButton):not(#togglePositiveNegativeButton):not(#percentageButton):not(#divisionButton):not(#multiplicationButton):not(#subtractionButton):not(#additionButton):not(#equalsButton):not(#decimalButton)');
const decimalButton = document.getElementById('decimalButton');
const equalsButton = document.getElementById('equalsButton');

// Event listeners for operator buttons
const operatorButtons = document.querySelectorAll('.operator');

// Event listeners for number modifier buttons
const numberModButtons = document.querySelectorAll('.calculatorButton.numberMod');

// Function to update userInputDisplay with the provided value
const updateUserInputDisplay = (value) => {
	userInputDisplay.textContent = value;
	// console.log(parseFloat(value));
};


numberModButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Get the button value
		const buttonValue = button.textContent;
        console.log(`Numeric value clicked: ${buttonValue}`);


		// Handle different cases based on the button value
		switch (buttonValue) {
			case '+/-':
				// Toggle positive/negative
				if (userInputDisplay.textContent !== '') {
					const currentValue = parseFloat(userInputDisplay.textContent);
					updateUserInputDisplay(-currentValue);
				}
				break;

			// case '%':
			// 	// Convert to percentage (/100)
			// 	if (userInputDisplay.textContent !== '') {
			// 		const currentValue = parseFloat(userInputDisplay.textContent);
			// 		updateUserInputDisplay(currentValue / 100);
			// 	}
			// 	break;

            case '.':
                // Append decimal point if not already present
                if (userInputDisplay.textContent === '' || userInputDisplay.textContent === '.') {
                    updateUserInputDisplay('0.');
                } else if (!userInputDisplay.textContent.includes('.')) {
                    updateUserInputDisplay(userInputDisplay.textContent + '.');
                }
                break;
            

            default:
                updateUserInputDisplay(userInputDisplay.textContent + buttonValue);
                break;
                  
		}

        console.log(firstInput = parseFloat(userInputDisplay.textContent))
	});
});

// operatorButtons.forEach(button => {
// 	button.addEventListener('click', () => {
// 		// Handle click event for operator buttons
// 		console.log('Operator Clicked:', button.textContent);
//         // Get the button value
//         const buttonValue = button.textContent;
        


//         if (operatorClicked) {
//             firstInput = parseFloat(userInputDisplay.textContent);
//             operatorClicked = false;
            
//         }
//         updateUserInputDisplay(userInputDisplay.textContent + ` ${buttonValue} `);
//         operatorClicked = true;

        
// 	});
//     console.log(firstInput);
// });

// Clear button functionality resets display and holding variables and flags
clearButton.addEventListener('click', () => {
    firstInput = '';
    secondInput = '';
    operator = '';
    operatorClicked = false;
    updateUserInputDisplay('');
});