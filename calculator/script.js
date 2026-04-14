const display = document.getElementById("display-el")
const buttons = document.querySelectorAll(".btn")

const themeBtn = document.getElementById("theme-btn")
const themeImgs = document.getElementById("theme-imgs")


let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

// DISPLAY
function formatNumber(numStr) {
    let num = parseFloat(numStr);

    if (isNaN(num)) return "Error";

    if (Math.abs(num) >= 1e9 || (Math.abs(num) > 0 && Math.abs(num) < 1e-6)) {
        return num.toExponential(6);
    }

    if (!Number.isInteger(num)) {
        let formatted = num.toFixed(8);
        return parseFloat(formatted).toString();
    }

    let formatted = num.toString();
    if (formatted.length > 10) {
        formatted = num.toPrecision(10);
    }

    return formatted;
}

function updateDisplay() {
    const isError = currentInput === "Error";

    if (isError) {
        display.textContent = "Error";
        setTimeout(() => toggleButtons(true), 50);
        return;
    }

    toggleButtons(false);

    if (operator && previousInput !== null && !shouldResetDisplay) {
        display.textContent = `${formatNumber(previousInput.toString())} ${getOperatorSymbol(operator)} ${formatNumber(currentInput)}`;
    } else if (operator && previousInput !== null) {
        display.textContent = `${formatNumber(previousInput.toString())} ${getOperatorSymbol(operator)}`;
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

// NUMBER INPUT HANDLER
function inputNumber(num) {
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
}

// DECIMAL HANDLER
function inputDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
        return;
    }
    if (!currentInput.includes(".") && currentInput.length < 9) {
        currentInput += ".";
    }
}

// OPERANDS HANDLER
function chooseOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        compute();
    }

    previousInput = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;

    updateDisplay();
}

// CALCULATIONS
function compute() {
    if (operator === null || shouldResetDisplay) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        currentInput = "Error";
        resetCalculatorState();
        return;
    }

    let result;
    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                currentInput = "Error";
                resetCalculatorState();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    if (!isFinite(result)) {
        currentInput = "Error";
    } else {
        currentInput = strip(result).toString();
    }

    resetCalculatorState();
}

// HELPER TO CLEAN UP STATE
function resetCalculatorState() {
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
}

// CLEAR DISPLAY
function clearAll() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    updateDisplay()
}
function backSpace() {
    if (shouldResetDisplay) return;

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
}

// TOGGLE SIGN
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
}

// PERCENT
function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

function toggleButtons(disabledStatus) {
    buttons.forEach(button => {
        if (button.dataset.action !== 'clear') {
            button.disabled = disabledStatus;

            if (disabledStatus) {
                button.classList.add('btn-disabled');
            } else {
                button.classList.remove('btn-disabled');
            }
        } else {
            if (disabledStatus) {
                button.classList.add('error-pulse'); // Adds the pulse during error
            } else {
                button.classList.remove('error-pulse'); // Removes it when fixed
            }
        }
    });
}

// BUTTON CLICKING HANDLER
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
                case "backspace":
                    backSpace();
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

// THEME TOGGLER
let darkMode = false
let toggling = false

themeBtn.addEventListener("click", () => {
    if (toggling) return

    toggling = true
    themeBtn.disabled = true

    darkMode = !darkMode

    if (darkMode) {
        document.body.classList.add("dark-theme")
        themeImgs.src = "assets/dark-mode.png"
    } else {
        document.body.classList.remove("dark-theme")
        themeImgs.src = "assets/light-mode.png"
    }

    setTimeout(() => {
        toggling = false
        themeBtn.disabled = false
    }, 700)
})

// KEY SHORTCUTS
document.addEventListener("keydown", function (e) {
    const key = e.key;

    if (/[0-9]/.test(key)) {
        inputNumber(key);
    }

    else if (key === "." || key === ",") {
        inputDecimal();
    }

    else if (key === "+") chooseOperator("add");
    else if (key === "-") chooseOperator("subtract");
    else if (key === "*") chooseOperator("multiply");
    else if (key === "/") {
        e.preventDefault();
        chooseOperator("divide");
    }
    else if (key === "%") {
        e.preventDefault();
        percent()
    }

    else if (key === "Enter" || key === "=") {
        e.preventDefault();
        compute();
    }

    else if (key === "Backspace") {
        backSpace();
    }

    else if (key === "Escape" || key === "Delete") {
        clearAll();
    }

    else if (key.toLowerCase() === "d") {
        if (!toggling) themeBtn.click();
    }

    updateDisplay();
})
updateDisplay();

function strip(number) {
    return parseFloat(parseFloat(number).toPrecision(12));
}