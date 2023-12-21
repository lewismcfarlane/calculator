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

let firstInput = [];
let secondInput = [];
let operator = [];
let operatorClicked = false;
let inputsArray = [firstInput, operator, secondInput];

let previousFirstInput = [];
let previousSecondInput = [];
let previousOperator = [];
let lastCalc = []

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

//DEBUG DOM
let debug = () => {
console.log(`
firstInput = ${firstInput.join('')}
secondInput = ${secondInput.join('')}
inputsArray = ${inputsArray.join('')}
operator = ${operator}
operatorClicked = ${operatorClicked}`)
}

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

const performCalculation = () => {
    let a = parseFloat(firstInput.join(''));
    let b = parseFloat(secondInput.join(''));
    operator = operator.join('');
    if (secondInput.length === 0 ) {
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
    if (Number.isInteger(result)) {
        updateCalculationDisplay(result);
    } else if (!Number.isInteger(result)) {
        result = result.toFixed(2);
        updateCalculationDisplay(result);
    }
	
    firstInput = [result];
	secondInput = [];
	operator = [];
	inputsArray = [firstInput, operator, secondInput];

}


numberModButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Get the button value
        
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
					// updateUserInputDisplay(inputsArray.join(' ') + buttonValue);
					break;
			}
			
			// Check if an operator has been clicked
			if (operatorClicked) {
			

				secondInput.push([buttonValue]);
                displayUserCalculation();
				// updateUserInputDisplay(`${firstInput.join('')} ${operator} ${secondInput.join('')}`);
			} else if (result === null) {
				
				firstInput.push(buttonValue);
                displayUserCalculation();
				// updateUserInputDisplay(firstInput.join(''));
			} else {
                clearCalculator();
                firstInput.push(buttonValue);
                updateUserInputDisplay(firstInput.join(''));
            }
           
            
		}
        debug();
	});
});

decimalButton.addEventListener('click', () => {
    const buttonValue = button.textContent;

})


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
                if (operator.length > 0 ) {
                    performCalculation();
                    displayUserCalculation();
                    userInputDisplay.textContent += ` ${buttonValue} `;
                    break;
                }
			case '+/-':
				break;

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

equalsButton.addEventListener('click', () => {

    performCalculation();

    operatorClicked = false;
    debug();
	// Reset variables
	
});



let displayUserCalculation = () => {
    let display = '';

    // Display the first input
    if (inputsArray[0].length > 0) {
        display += inputsArray[0].join('');
    }

    // Display the operator if it exists
    if (operator.length > 0) {
        display += ' ' + operator.join('');
    }

    // Display the second input if it exists
    if (inputsArray[2].length > 0) {
        display += ' ' + inputsArray[2].join('');
    }

    userInputDisplay.textContent = display;
}