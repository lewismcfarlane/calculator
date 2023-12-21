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

// const ADD = '+';
// const SUBTRACT = '-';
// const DIVIDE = '/';
// const MULTIPLY = '*';

let firstInput = '';
let secondInput = '';
let operator = '';
let operatorClicked = false;
let inputsArray = [];

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

const updateCalculationDisplay = (value) => {
	calculationDisplay.textContent = value;
}


numberModButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Get the button value
		const buttonValue = button.textContent;
		console.log(`Numeric value clicked: ${buttonValue}`);




		if (result !== null && operator == '') {
			userInputDisplay.textContent = buttonValue;
			calculationDisplay.textContent = '';
			result = null;
			firstInput = '';
			secondInput = '';
			operator = '';
			operatorClicked = false;
			inputsArray = [];
		} else {
			// Handle different cases based on the button value
			switch (buttonValue) {
				case '.':
					// Append decimal point if not already present
					if (userInputDisplay.textContent === '') {
						updateUserInputDisplay('0.');
					} else if (!userInputDisplay.textContent.includes('.')) {
						updateUserInputDisplay(userInputDisplay.textContent + '.');
					}
					break;


				default:
					updateUserInputDisplay(userInputDisplay.textContent + buttonValue);

					break;

			}

			inputsArray = [userInputDisplay.textContent];

			// Check if an operator has been clicked
			if (operatorClicked) {
				// If yes, update secondInput

				secondInput += buttonValue;
				// updateUserInputDisplay(secondInput);
			} else {
				// If no operator has been clicked, update firstInput
				firstInput += buttonValue;
				// updateUserInputDisplay(firstInput);
			}
		}
	});
});

operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Handle click event for operator buttons
		console.log('Operator Clicked:', button.textContent);
		// Get the button value
		const buttonValue = button.textContent;

		if (operatorClicked) {
			// firstInput = parseFloat(userInputDisplay.textContent);
			operatorClicked = false;

		}

		if (result !== null) {
			userInputDisplay.textContent = inputsArray;
			calculationDisplay.textContent = '';
		}

		switch (buttonValue) {
			case '/':
			case '+':
			case '-':
			case 'x':
				operator = buttonValue;
				updateUserInputDisplay(userInputDisplay.textContent + ` ${buttonValue} `);
				operatorClicked = true;
				break;

			case '+/-':
				// Toggle positive/negative



				break;
				// case '%':
				// 	// Convert to percentage (/100)
				// 	if (userInputDisplay.textContent !== '') {
				// 		const currentValue = parseFloat(userInputDisplay.textContent);
				// 		updateUserInputDisplay(currentValue / 100);
				// 	}
				// 	break;

				// default: 



		}
		// i think this breaks something
		inputsArray = [userInputDisplay.textContent];

	});
	console.log(firstInput);
});

// Clear button functionality resets display and holding variables and flags
clearButton.addEventListener('click', () => {
	firstInput = '';
	secondInput = '';
	operator = '';
	operatorClicked = false;
	updateUserInputDisplay('');
	updateCalculationDisplay('');
});


let result = null;

equalsButton.addEventListener('click', () => {
	// Split the expression into firstInput, operator, and secondInput
	const [firstInputStr, operatorStr, secondInputStr] = inputsArray[0].split(/\s+/);
	firstInput = parseFloat(firstInputStr);
	operator = operatorStr;
	secondInput = parseFloat(secondInputStr);

	// Perform the calculation based on the operator

	switch (operator) {
		case '+':
			result = additionOperation(firstInput, secondInput);
			break;
		case '-':
			result = subtractionOperation(firstInput, secondInput);
			break;
		case '/':
			result = divisionOperation(firstInput, secondInput);
			break;
		case 'x':
			result = multiplicationOperation(firstInput, secondInput);
			break;
			// Add cases for other operators if needed

		default:

			result = firstInput; // Invalid operator
	}

	// Display the result
	updateCalculationDisplay(result);

	// Reset variables
	firstInput = result;
	secondInput = '';
	operator = '';
	operatorClicked = false;
	inputsArray = [result];
});