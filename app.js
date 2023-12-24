// Functions for basic mathematical operations
const additionOperation = (a, b) => {
	return a + b;
};

const subtractionOperation = (a, b) => {
	return a - b;
};

const divisionOperation = (a, b) => {
	if (b !== 0) {
		return a / b;
	} else return;

};

const multiplicationOperation = (a, b) => {
	return a * b;
};

const exponentOperation = (a, b) => {
	return a ** b;
};

// Variables to store input, operator, and flags
let firstInput = [];
let secondInput = [];
let operator = [];
let operatorClicked = false;
let inputsArray = [firstInput, operator, secondInput];

// DOM elements for calculator interface
const calculationDisplay = document.getElementById('calculationDisplay');
const userInputDisplay = document.getElementById('userInputDisplay');
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('delete');
const exponentButton = document.getElementById('exponentButton');
const divisionButton = document.getElementById('divisionButton');
const multiplicationButton = document.getElementById('multiplicationButton');
const subtractionButton = document.getElementById('subtractionButton');
const additionButton = document.getElementById('additionButton');
const numberButtons = document.querySelectorAll('.calculatorButton:not(#clearButton):not(#togglePositiveNegativeButton):not(#percentageButton):not(#divisionButton):not(#multiplicationButton):not(#subtractionButton):not(#additionButton):not(#equalsButton):not(#decimalButton)');
const decimalButton = document.getElementById('decimalButton');
const equalsButton = document.getElementById('equalsButton');
const operatorButtons = document.querySelectorAll('.operator');
const numberModButtons = document.querySelectorAll('.calculatorButton.numberMod');

//DEBUG DOM
let debug = () => {
	console.log(`
firstInput = ${firstInput.join('')}
secondInput = ${secondInput.join('')}
inputsArray = ${inputsArray.join('')}
operator = ${operator}
operatorClicked = ${operatorClicked}`)
}

//Function to clear the calculator and update displays
let clearCalculator = () => {
	firstInput = [];
	secondInput = [];
	operator = [];
	operatorClicked = false;
	inputsArray = [firstInput, operator, secondInput];
	updateUserInputDisplay('');
	updateCalculationDisplay('');
	debug();
}

// Function to update user input display
const updateUserInputDisplay = (value) => {
	userInputDisplay.textContent = value;

};

// Function to update calculation display
const updateCalculationDisplay = (value) => {
	calculationDisplay.textContent = value;
}

// Function to remove leading zeros from a string for non-decimal numbers
const removeLeadingZeros = (str) => {
	// Use a regular expression to match and remove leading zeros that are not part of a decimal number
	let withoutLeadingZeros = str.replace(/^0+(?!\.)/, '');

	// Ensure that at least one digit is present for non-decimal numbers
	// If the result is an empty string or just a decimal point, set it to '0'
	if (withoutLeadingZeros === '' || withoutLeadingZeros === '.') {
		withoutLeadingZeros = '0';
	}

	// Return the modified string without leading zeros
	return withoutLeadingZeros;
};

// Function to perform the calculation
const performCalculation = () => {
	let a = parseFloat(firstInput.join(''));
	let b = parseFloat(secondInput.join(''));
	console.log(firstInput, secondInput);
	operator = operator.join('');
	let storedOperator = operator
    let storedFirstInput = firstInput;
    let storedSecondInput = secondInput;
    let whatUserTyped = `${firstInput.join('')} ${storedOperator} ${secondInput.join('')}`;
	if ((firstInput.length === 1 &&
			firstInput[0] === '-' &&
			secondInput.length === 1 &&
			secondInput[0] === '-') ||
		firstInput.length > 0 && secondInput[0] === '-') {
		clearCalculator();
        updateUserInputDisplay(whatUserTyped);
		updateCalculationDisplay('Error: Invalid Operation');
		return;
	}
	if (firstInput.length === 0) {
		a = 0;
		firstInput = ['-'];

	} else if (firstInput.length === 1 && firstInput[0] === '-') {
		if (operator === '-') {
			a = 0;
			operator = '+';
		}

	}
	switch (operator) {
		case '+':
			result = additionOperation(a, b);
			break;
		case '-':
			if (firstInput.length === 1 && firstInput[0] === '-') {
				result = multiplicationOperation(a, b);
			} else
				result = subtractionOperation(a, b);
			break;
		case '/':
			result = divisionOperation(a, b);
			break;
		case 'x':
			result = multiplicationOperation(a, b);
			break;
		case '^':
			result = exponentOperation(a, b);
			break;
		default:
			result = firstInput; // Invalid operator
	}

	result = parseFloat(result);

	
	if (isNaN(result)) {
		let errorMessage = 'Cannot divide by zero'
		updateCalculationDisplay(errorMessage);
	} else if (Number.isInteger(result)) {
		result = result.toFixed(0);
		updateUserInputDisplay(whatUserTyped)
		updateCalculationDisplay(result);
	} else {
		result = parseFloat(result.toFixed(3));
		updateUserInputDisplay(whatUserTyped)
		updateCalculationDisplay(result);

	}

	firstInput = [result];
	secondInput = [];
	operator = [];
	inputsArray = [firstInput, operator, secondInput];
	return console.log(a, b);
}

let toggleNegative = () => {
	if (operatorClicked === false) {
		const hasNegativeSign = firstInput.length > 0 && firstInput[0] === '-';
		if (hasNegativeSign && firstInput.length > 1) {
			firstInput.shift();
		} else {
			firstInput.unshift('-');
		}

		displayUserCalculation();
		return hasNegativeSign;

	} else if (operatorClicked === true) {
		const hasNegativeSign = secondInput.length > 0 && secondInput[0] === '-';
		if (hasNegativeSign && secondInput.length > 1) {
			performCalculation();
			operator = ['-'];
			updateCalculationDisplay;

		} else if (hasNegativeSign) {
			secondInput.shift();

		} else {
			secondInput.unshift('-');

		}
		displayUserCalculation();
		return hasNegativeSign;
	}
}
// Event listeners for number buttons
numberModButtons.forEach(button => {
	button.addEventListener('click', () => {
		const buttonValue = button.textContent;
        if (calculationDisplay.textContent === 'Error: Invalid Operation') {
			clearCalculator();
            firstInput.push(buttonValue);
            displayUserCalculation();
		} else if (result !== null && firstInput[0] !== '-' && operator.length === 0) {
			firstInput = [];
			calculationDisplay.textContent = '';
			result = null;
			firstInput.push(buttonValue);
			secondInput = [];
			operator = [];
			operatorClicked = false;
			inputsArray = [firstInput, operator, secondInput];
			userInputDisplay.textContent = firstInput.join('');

		} else {
			switch (buttonValue) {
				case '.':
					if (!operatorClicked) {
						if (firstInput.length === 0) {
							firstInput.push('0.');
							displayUserCalculation();
							break;
						} else if (!firstInput.some(number => number.includes('.'))) {
							firstInput.push('.');
							displayUserCalculation();
							break;
						}
						displayUserCalculation();
						break;
					}
					if (operatorClicked) {
						if (secondInput.length === 0) {
							secondInput.push('0.');
							displayUserCalculation();
							break;
						} else if (!secondInput.some(number => number.includes('.'))) {
							secondInput.push('.');
							displayUserCalculation();
							break;
						}
						displayUserCalculation();
						break;
					}
				default:
					if (operatorClicked) {
						secondInput.push([buttonValue]);
						displayUserCalculation();
					} else if (result === null) {
						firstInput.push(buttonValue);
						displayUserCalculation();
					} else if (firstInput[0] === '-') {
						firstInput.push(buttonValue);
						displayUserCalculation();
					} else if (firstInput.length > 0 && operator.length > 0) {
						secondInput.push([buttonValue]);
						displayUserCalculation();
						console.log('test');
					} else {
						clearCalculator();
						firstInput.push(buttonValue);
						updateUserInputDisplay(firstInput.join(''));
					}
					break;
			}
		}
		debug();
	});
});

// Event listener for operator buttons
operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		const buttonValue = button.textContent;
		operatorClicked = true;
		if (calculationDisplay.textContent === 'Error: Invalid Operation') {
			clearCalculator();
		} else if (result !== null) {
			userInputDisplay.textContent = inputsArray;
			calculationDisplay.textContent = '';
		}
		switch (buttonValue) {
			case '/':
			case '+':
			case 'x':
				if (operator.length === 0) {
					operator.push(buttonValue);
					displayUserCalculation();
					break;

				} else if (operator.length > 0 && (secondInput.length === 0)) {
					operator = [buttonValue];
					displayUserCalculation();
					break
				} else {

					performCalculation();
					operator = [buttonValue];
					displayUserCalculation();
					break;
				}
			case '-':
				if (operator.length === 0 && firstInput.length === 0) {
					operatorClicked = false;
					firstInput.push('-');
					displayUserCalculation();
					break;
				} else if (operator === '-' && secondInput.length === 0) {
					operatorClicked = false;
					secondInput.push('-');
					displayUserCalculation();
					break;
				} else if (operator.length === 0) {
					operator.push([buttonValue]);
					displayUserCalculation();
					break;

				} else if (operator.length > 0 && (secondInput.length === 0 || secondInput[0] === '-')) {
					toggleNegative();
					displayUserCalculation();
					break

				} else if (firstInput.length > 0 && secondInput.length > 0 && operator.length > 0) {
					performCalculation();
					operator = ['-'];
					displayUserCalculation();
					break;
				} else {

					performCalculation();
					operator.push('-')
					displayUserCalculation();
					// userInputDisplay.textContent += ` ${buttonValue} `;
					break;
				}
				break;
			case 'xx':
				if (operator.length === 0) {
					operator.push('^');
					displayUserCalculation();
					break;
				} else if (operator.length > 0 && (secondInput.length === 0 || secondInput[0] === '-')) {
					operator = ['^'];
					displayUserCalculation();
				} else {
					performCalculation();
					displayUserCalculation();
					userInputDisplay.textContent += ` ^ `;
					break;
				}
		}
		// if (operator.length === 0) {
		// 	operator.push(buttonValue);
		// }

		debug();

	});

});

// Clear button functionality resets display and holding variables and flags
clearButton.addEventListener('click', clearCalculator);

let result = null;

// Event listener for equals button
equalsButton.addEventListener('click', () => {
	if (secondInput.length === 0) {
		firstInput = [removeLeadingZeros(firstInput.join(''))]
		result = removeLeadingZeros(firstInput.join(''));
		updateCalculationDisplay(result);
		userInputDisplay.textContent = result;
	} else {
		firstInput = [removeLeadingZeros(firstInput.join(''))]
		secondInput = [removeLeadingZeros(secondInput.join(''))]
		performCalculation();
	}
	operatorClicked = false;
	debug();

});

// Function to display the user's calculation in the UI
let displayUserCalculation = () => {
	let display = '';

	if (inputsArray[0].length > 0) {
		display += firstInput.join('');
	}

	if (operator.length > 0) {
		display += ' ' + operator.join('');
	}

	if (inputsArray[2].length > 0) {
		display += ' ' + secondInput.join('');
	}

	userInputDisplay.textContent = display;
}

// Function to delete parts of the input
deleteButton.addEventListener('click', () => {
	operatorClicked = false;
	if (firstInput.length > 0 && operator.length === 0) {
		firstInput.pop()
	} else if (firstInput.length > 0 && operator.length > 0 && secondInput.length === 0) {
		operator.pop();
	} else {
		secondInput.pop();
	}
	displayUserCalculation();
	debug();
});

document.addEventListener('keydown', (event) => {
	const pressedKey = event.key;
	console.log(pressedKey);
	switch (pressedKey) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '.':
			simulateNumberClick(pressedKey);
			break;
		case 'x':
		case '/':
		case '-':
		case '+':
		case '*':
			simulateOperatorClick(pressedKey);
			break;
		case '^':
			simulateExponentClick(pressedKey);
			break;
		case 'Escape':
		case 'Esc':
			simulateClearClick(pressedKey);
			break;
		case 'Enter':
		case '=':
			simulateEqualsClick(pressedKey);
			break;
		case 'Backspace':
			simulateDeleteClick(pressedKey);
			break;
	}
});

// Function to simulate backspace click

let simulateDeleteClick = () => {
	deleteButton.click();
}

// Function to simulate a number click
function simulateNumberClick(key) {
	const buttons = document.querySelectorAll('.calculatorButton.numberMod');
	for (const button of buttons) {
		if (button.textContent.trim() === key) {
			button.click();
			break;
		}
	}
}

// Function to simulate an operator button click
function simulateOperatorClick(key) {
	const buttons = document.querySelectorAll('.operator');
	for (const button of buttons) {
		if (button.textContent.trim() === key ||
			((key === '*' && button.textContent.trim() === 'x'))) {
			button.click();
			break;
		}
	}
}

// Function to simulate a clear button click 
function simulateClearClick(event) {
	const clearButton = document.getElementById('clearButton');
	clearButton.click();
}

// Function to simulate an equals button click
function simulateEqualsClick() {
	const equalsButton = document.getElementById('equalsButton');
	equalsButton.click();
}

// Function to simulate the exponent button click
function simulateExponentClick() {
	const exponentButton = document.getElementById('exponentButton');
	exponentButton.click();
}