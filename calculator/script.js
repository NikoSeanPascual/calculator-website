const display = document.getElementById("display-el");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

// Update display
function formatNumber(numStr) {
    let num = parseFloat(numStr);

    if (isNaN(num)) return "Error";

    // If number is too big or too small → scientific notation
    if (Math.abs(num) >= 1e9 || (Math.abs(num) > 0 && Math.abs(num) < 1e-6)) {
        return num.toExponential(6); // 6 decimal places
    }

    // Limit to 10 digits total
    let formatted = num.toString();

    if (formatted.length > 10) {
        formatted = num.toPrecision(10);
    }

    return formatted;
}

function updateDisplay() {
    if (operator && previousInput !== null && !shouldResetDisplay) {
        display.textContent =
            `${formatNumber(previousInput.toString())} ${getOperatorSymbol(operator)} ${formatNumber(currentInput)}`;
    } else if (operator && previousInput !== null) {
        display.textContent =
            `${formatNumber(previousInput.toString())} ${getOperatorSymbol(operator)}`;
    } else {
        display.textContent = formatNumber(currentInput);
    }
}
function getOperatorSymbol(op) {
    switch (op) {
        case "add": return "+";
        case "subtract": return "-";
        case "multiply": return "×";
        case "divide": return "÷";
        default: return "";
    }
}

// Handle number input
function inputNumber(num) {
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
}

// Handle decimal
function inputDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
        return;
    }
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
}

// Handle operator
function chooseOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        compute();
    }

    previousInput = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;

    updateDisplay(); // 👈 force display update immediately
}

// Perform calculation
function compute() {
    if (operator === null || shouldResetDisplay) return;

    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "add":
            result = previousInput + current;
            break;
        case "subtract":
            result = previousInput - current;
            break;
        case "multiply":
            result = previousInput * current;
            break;
        case "divide":
            result = current === 0 ? "Error" : previousInput / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = null;
}

// Clear
function clearAll() {
    currentInput = "0";
    previousInput = null;
    operator = null;
}

// Toggle sign
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
}

// Percent
function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

// Button click handling
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.dataset.number;
        const action = button.dataset.action;

        if (number !== undefined) {
            inputNumber(number);
        } else if (action) {
            switch (action) {
                case "decimal":
                    inputDecimal();
                    break;
                case "clear":
                    clearAll();
                    break;
                case "toggle-sign":
                    toggleSign();
                    break;
                case "percent":
                    percent();
                    break;
                case "add":
                case "subtract":
                case "multiply":
                case "divide":
                    chooseOperator(action);
                    break;
                case "equals":
                    compute();
                    break;
            }
        }

        updateDisplay();
    });
});

// Initialize display
updateDisplay();