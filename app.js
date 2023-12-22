// Functions for basic mathematical operations
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
const toggleButton = document.getElementById('togglePositiveNegativeButton');
const percentageButton = document.getElementById('percentageButton');
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

// Function to perform the calculation
const performCalculation = () => {
	let a = parseFloat(firstInput.join(''));
	let b = parseFloat(secondInput.join(''));
	operator = operator.join('');
	if (secondInput.length === 0) {
		firstInput = firstInput.join('');
		result = firstInput;
	}
	switch (operator) {
		case '+':
			result = additionOperation(a, b);
			break;
		case '-':
			result = subtractionOperation(a, b);
			break;
		case '/':
			result = divisionOperation(a, b);
			break;
		case 'x':
			result = multiplicationOperation(a, b);
			break;

		default:
			result = firstInput; // Invalid operator
	}

	result = parseFloat(result);
	if (Number.isInteger(result)) {
		result = result.toFixed(0);
		updateCalculationDisplay(result);
	} else {
		result = result.toFixed(3);
		updateCalculationDisplay(result);
	}

	firstInput = [result];
	secondInput = [];
	operator = [];
	inputsArray = [firstInput, operator, secondInput];

}

// Event listeners for number buttons
numberModButtons.forEach(button => {
	button.addEventListener('click', () => {
		const buttonValue = button.textContent;
		if (result !== null && operator.length == []) {
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
				default:
					if (operatorClicked) {
						secondInput.push([buttonValue]);
						displayUserCalculation();
					} else if (result === null) {
						firstInput.push(buttonValue);
						displayUserCalculation();
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
		if (result !== null) {
			// here lies the spacing issue
			userInputDisplay.textContent = inputsArray;
			calculationDisplay.textContent = '';
		}
		switch (buttonValue) {
			case '/':
			case '+':
			case '-':
			case 'x':
				if (operator.length === 0) {
					operator.push(buttonValue);
					// userInputDisplay.textContent += ' '
					displayUserCalculation();
					break;
				}
				if (operator.length > 0) {
					performCalculation();
					displayUserCalculation();
					userInputDisplay.textContent += ` ${buttonValue} `;
					break;
				}

		}
		if (operator.length === 0) {
			operator.push(buttonValue);
		}

		debug();

	});

});

// Clear button functionality resets display and holding variables and flags
clearButton.addEventListener('click', clearCalculator);

let result = null;

// Event listener for equals button
equalsButton.addEventListener('click', () => {

	performCalculation();

	operatorClicked = false;
	debug();

});

// Function to display the user's calculation in the UI
let displayUserCalculation = () => {
	let display = '';

	if (inputsArray[0].length > 0) {
		display += inputsArray[0].join('');
	}

	if (operator.length > 0) {
		display += ' ' + operator.join('');
	}

	if (inputsArray[2].length > 0) {
		display += ' ' + inputsArray[2].join('');
	}

	userInputDisplay.textContent = display;
}

// Event listener for toggle button (positive/negative)
toggleButton.addEventListener('click', () => {

	if (operatorClicked === false) {
		const hasNegativeSign = firstInput.length > 0 && firstInput[0] === '-';

		if (hasNegativeSign) {
			firstInput.shift();
		} else {
			firstInput.unshift('-');
		}

		displayUserCalculation();

	} else if (operatorClicked === true) {
		const hasNegativeSign = secondInput.length > 0 && secondInput[0] === '-';
		if (hasNegativeSign) {
			secondInput.shift();
		} else {
			secondInput.unshift('-');
		}
		displayUserCalculation();
	}

})