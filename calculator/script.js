// DOM ELEMENTS
const display = document.getElementById("display-el");
const buttons = document.querySelectorAll(".btn");
const themeBtn = document.getElementById("theme-btn");
const themeImgs = document.getElementById("theme-imgs");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const historyPanel = document.getElementById("history-panel");
const historyToggle = document.getElementById("history-toggle");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;
let darkMode = false;
let toggling = false;

//UI & FORMATTING HELPERS
function formatNumber(numStr) {
    let num = parseFloat(numStr);

    if (isNaN(num)) return "Error";

    // HANDLE SCIENTIFIC NOTATION FOR VERY LARGE/SMALL NUMBERS
    if (Math.abs(num) >= 1e9 || (Math.abs(num) > 0 && Math.abs(num) < 1e-6)) {
        return num.toExponential(6);
    }

    // HANDLE DECIMALS
    if (!Number.isInteger(num)) {
        let formatted = num.toFixed(8);
        return parseFloat(formatted).toString();
    }

    // HANDLE LONG INTEGERS
    let formatted = num.toString();
    return formatted.length > 10 ? num.toPrecision(10) : formatted;
}

function updateDisplay() {
    const isError = currentInput === "Error";
    toggleButtons(isError);

    if (isError) {
        display.textContent = "Error";
        return;
    }

    if (operator && previousInput !== null) {
        const opSymbol = getOperatorSymbol(operator);
        display.textContent = shouldResetDisplay
            ? `${formatNumber(previousInput.toString())} ${opSymbol}`
            : `${formatNumber(previousInput.toString())} ${opSymbol} ${formatNumber(currentInput)}`;
    } else {
        display.textContent = formatNumber(currentInput);
    }
}

function getOperatorSymbol(op) {
    const symbols = { add: "+", subtract: "-", multiply: "×", divide: "÷" };

    return symbols[op] || "";
}

function toggleButtons(disabledStatus) {
    buttons.forEach(button => {
        if (button.dataset.action !== 'clear') {
            button.disabled = disabledStatus;
            button.classList.toggle('btn-disabled', disabledStatus);
        } else {
            button.classList.toggle('error-pulse', disabledStatus);
        }
    });
}

// CORE MATH LOGICS
function strip(number) {
    return parseFloat(parseFloat(number).toPrecision(12));
}

function compute() {
    if (operator === null || previousInput === null || currentInput === "Error") return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result;

    switch (operator) {
        case 'add': result = prev + current; break;
        case 'subtract': result = prev - current; break;
        case 'multiply': result = prev * current; break;
        case 'divide':
            if (current === 0) {
                currentInput = "Error";
                resetCalculatorState();
                return;
            }
            result = prev / current;
            break;
        default: return;
    }

    if (!isFinite(result)) {
        currentInput = "Error";
    } else {
        const cleanResult = strip(result).toString();
        const expression = `${formatNumber(prev)} ${getOperatorSymbol(operator)} ${formatNumber(current)} = ${formatNumber(cleanResult)}`;

        history.push(expression);
        saveHistory();
        renderHistory();
        currentInput = cleanResult;
    }
    resetCalculatorState();
}

function resetCalculatorState() {
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
}

// INPUT HANDLERS
function inputNumber(num) {
    if (currentInput === "Error") return;
    if (currentInput.length > 12 && !shouldResetDisplay) return;

    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
}

function inputDecimal() {
    if (currentInput === "Error") return;

    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
        return;
    }

    if (!currentInput.includes(".") && currentInput.length < 11) {
        currentInput += ".";
    }
}

function chooseOperator(op) {
    if (currentInput === "Error") return;
    if (operator !== null && !shouldResetDisplay) {
        compute();
    }

    previousInput = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function toggleSign() {
    if (currentInput === "Error") return;

    currentInput = (parseFloat(currentInput) * -1).toString();
}

function percent() {
    if (currentInput === "Error") return;

    currentInput = (parseFloat(currentInput) / 100).toString();
}

function backSpace() {
    if (shouldResetDisplay || currentInput === "Error") return;

    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
}

function clearAll() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    shouldResetDisplay = false;
}

// HISTORY & THEME
function renderHistory() {
    historyList.innerHTML = "";
    history.slice().reverse().forEach(item => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.textContent = item;
        li.onclick = () => {
            currentInput = item.split("=").pop().trim();
            shouldResetDisplay = true;
            updateDisplay();
        };
        historyList.appendChild(li);
    });
}

function saveHistory() {
    localStorage.setItem("calcHistory", JSON.stringify(history));
}

// HISTORY UI LISTENERS
historyToggle.addEventListener("click", () => historyPanel.classList.toggle("show"));

document.addEventListener("click", (e) => {
    if (!historyPanel.contains(e.target) && !historyToggle.contains(e.target)) {
        historyPanel.classList.remove("show");
    }
});

clearHistoryBtn.addEventListener("click", () => {
    history = [];
    saveHistory();
    renderHistory();
});

// THEME TOGGLE
themeBtn.addEventListener("click", () => {
    if (toggling) return;
    toggling = true;
    themeBtn.disabled = true;
    darkMode = !darkMode;

    document.body.classList.toggle("dark-theme", darkMode);
    themeImgs.src = darkMode ? "assets/dark-mode.png" : "assets/light-mode.png";

    setTimeout(() => {
        toggling = false;
        themeBtn.disabled = false;
    }, 700);
});

// EVENT LISTENERS
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const { number, action } = button.dataset;

        if (number !== undefined) inputNumber(number);
        else if (action) {
            switch (action) {
                case "decimal": inputDecimal(); break;
                case "clear": clearAll(); break;
                case "toggle-sign": toggleSign(); break;
                case "percent": percent(); break;
                case "backspace": backSpace(); break;
                case "equals": compute(); break;
                default: chooseOperator(action); break;
            }
        }
        updateDisplay();
    });
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/[0-9]/.test(key)) inputNumber(key);
    else if (key === "." || key === ",") inputDecimal();
    else if (key === "+") chooseOperator("add");
    else if (key === "-") chooseOperator("subtract");
    else if (key === "*") chooseOperator("multiply");
    else if (key === "/") { e.preventDefault(); chooseOperator("divide"); }
    else if (key === "%") { e.preventDefault(); percent(); }
    else if (key === "Enter" || key === "=") { e.preventDefault(); compute(); }
    else if (key === "Backspace") backSpace();
    else if (key === "Escape" || key === "Delete") clearAll();
    else if (key.toLowerCase() === "d" && !toggling) themeBtn.click();

    updateDisplay();
});

// INITIALIZATIONS
renderHistory();
updateDisplay();