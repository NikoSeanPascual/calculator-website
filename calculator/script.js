// DOM ELEMENTS
const display = document.getElementById("display-el");
const buttons = document.querySelectorAll(".btn");
const themeBtn = document.getElementById("theme-btn");
const themeImgs = document.getElementById("theme-imgs");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const historyPanel = document.getElementById("history-panel");
const historyToggle = document.getElementById("history-toggle"); // Fixed: removed duplicate
const title = document.querySelector("h1");

// AUDIO
const clickSound = new Audio("assets/click.mp3");
clickSound.volume = 0.3;

// STATE
let expression = "";
let titleClickCount = 0;
let undoStack = [];
let redoStack = [];
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
let memoryValue = parseFloat(localStorage.getItem("calcMemory")) || 0;
let clickTimes = [];
let isRageMode = false;

let shouldResetDisplay = false;
let darkMode = false;
let toggling = false;

function updateMemoryStorage() {
    localStorage.setItem("calcMemory", memoryValue);
}

// UI HELPERS
function updateDisplay() {
    const isError = expression === "Error";
    toggleButtons(isError);

    if (isError) {
        display.textContent = "Error";
        return;
    }

    let text = expression || "0";
    if (memoryValue !== 0) text = `M ${text}`;

    // AUTO-RESIZE
    if (text.length > 16) display.style.fontSize = "1.4rem";
    else if (text.length > 12) display.style.fontSize = "1.8rem";
    else if (text.length > 8) display.style.fontSize = "2.5rem";
    else display.style.fontSize = "3.5rem";

    display.textContent = text;
    display.classList.remove("animate-number");
    void display.offsetWidth;
    display.classList.add("animate-number");
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

// SOUND HELPER
function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// CORE MATH LOGIC (BODMAS)
function strip(number) {
    return parseFloat(parseFloat(number).toPrecision(12));
}

function evaluateExpression() {
    if (expression === "" || expression === "Error") return;

    saveState();

    try {
        let mathReady = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, Math.PI);

        const result = new Function(`return ${mathReady}`)();

        if (!isFinite(result)) throw new Error("Math Error");

        const cleanResult = strip(result).toString();

        history.push(`${expression} = ${cleanResult}`);
        saveHistory();
        renderHistory();

        expression = cleanResult;
        shouldResetDisplay = true;

    } catch (e) {
        expression = "Error";
        document.body.classList.add("glitch-mode");
        setTimeout(() => {
            document.body.classList.remove("glitch-mode");
        }, 500);
    }

    updateDisplay();
}

// HELPER FUNCTIONS (UNDO/REDO)
function saveState() {
    if (undoStack.length === 0 || undoStack[undoStack.length - 1] !== expression) {
        undoStack.push(expression);
        if (undoStack.length > 30) undoStack.shift();
        redoStack = [];
    }
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push(expression);
        expression = undoStack.pop();
        updateDisplay();
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(expression);
        expression = redoStack.pop();
        updateDisplay();
    }
}

// EVENT LISTENERS (BUTTONS)
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const now = Date.now();
        clickTimes.push(now);
        clickTimes = clickTimes.filter(time => now - time < 2000);

        if (clickTimes.length > 10 && !isRageMode) {
            isRageMode = true;
            document.body.classList.add("rage-mode");
            const originalExpression = expression;
            expression = "STOP IT!";
            updateDisplay();

            setTimeout(() => {
                isRageMode = false;
                document.body.classList.remove("rage-mode");
                expression = originalExpression;
                clickTimes = [];
                updateDisplay();
            }, 3000);
            return;
        }

        if (isRageMode) return;

        playClick();
        const { number, action } = button.dataset;

        if (action !== "equals") saveState();

        if (shouldResetDisplay && (number !== undefined || action === "open-paren" || action === "pi")) {
            expression = "";
            shouldResetDisplay = false;
        } else {
            shouldResetDisplay = false;
        }

        if (number !== undefined) {
            expression += number;
        } else if (action) {
            switch (action) {
                case "clear": expression = ""; break;
                case "backspace": expression = expression.slice(0, -1); break;
                case "decimal": if (!expression.endsWith(".")) expression += "."; break;
                case "pi": expression += "π"; break;
                case "open-paren": expression += "("; break;
                case "close-paren": expression += ")"; break;
                case "add": expression += "+"; break;
                case "subtract": expression += "-"; break;
                case "multiply": expression += "×"; break;
                case "divide": expression += "÷"; break;
                case "percent": expression += "/100"; break;
                case "toggle-sign":
                    if (expression === "" || expression === "0" || expression === "Error") break;
                    if (expression.startsWith("-(") && expression.endsWith(")")) {
                        expression = expression.slice(2, -1);
                    } else {
                        expression = `-(${expression})`;
                    }
                    break;
                case "equals": evaluateExpression(); return;
                case "mc": memoryValue = 0; updateMemoryStorage(); break;
                case "mr": expression += memoryValue.toString(); break;
                case "mplus":
                    evaluateExpression();
                    memoryValue += parseFloat(expression || 0);
                    updateMemoryStorage();
                    break;
                case "mminus":
                    evaluateExpression();
                    memoryValue -= parseFloat(expression || 0);
                    updateMemoryStorage();
                    break;
            }
        }
        updateDisplay();
    });
});
title.addEventListener("click", (e) => {
    clickTimes = [];

    titleClickCount++;
    playClick();

    if (titleClickCount === 5) {
        document.body.classList.toggle("glitch-mode");
        titleClickCount = 0;
        console.log("GLITCH MODE TOGGLED");
    }
});
// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
    const key = e.key;
    const now = Date.now();

    // RAGE MODE FOR KEYBOARD
    clickTimes.push(now);
    clickTimes = clickTimes.filter(time => now - time < 2000);

    if (clickTimes.length > 15 && !isRageMode) {
        isRageMode = true;
        document.body.classList.add("rage-mode");
        const originalExpression = expression;
        expression = "RELAX BRO!";
        updateDisplay();

        setTimeout(() => {
            isRageMode = false;
            document.body.classList.remove("rage-mode");
            expression = originalExpression;
            clickTimes = [];
            updateDisplay();
        }, 3000);
        return;
    }

    if (isRageMode) return;

    if (expression === "Error" && key !== "Escape") return;

    const isMathKey = /[0-9\.\+\-\*\/\(\)=]/.test(key) ||
                      key === "Enter" || key === "Backspace" || key === "Escape";

    if (isMathKey) playClick();

    if (e.ctrlKey || e.metaKey) {
        if (key.toLowerCase() === "z") {
            e.preventDefault();
            undo();
            return;
        }
        if (key.toLowerCase() === "y") {
            e.preventDefault();
            redo();
            return;
        }
    }

    if (/[0-9]/.test(key)) { saveState(); expression += key; }
    else if (key === ".") { saveState(); if (!expression.endsWith(".")) expression += "."; }
    else if (key === "+") { saveState(); expression += "+"; }
    else if (key === "-") { saveState(); expression += "-"; }
    else if (key === "*") { saveState(); expression += "×"; }
    else if (key === "/") { e.preventDefault(); saveState(); expression += "÷"; }

    else if (key === "(") { saveState(); expression += "("; }
    else if (key === ")") { saveState(); expression += ")"; }

    else if (key === "Enter" || key === "=") { e.preventDefault(); evaluateExpression(); return; }
    else if (key === "Backspace") { saveState(); expression = expression.slice(0, -1); }
    else if (key === "Escape") { saveState(); expression = ""; }

    updateDisplay();
});
// HISTORY & THEME
function renderHistory() {
    historyList.innerHTML = "";
    history.slice().reverse().forEach(item => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.textContent = item;
        li.onclick = () => {
            playClick();
            expression = item.split("=").pop().trim();
            historyPanel.classList.remove("show");
            updateDisplay();
        };
        historyList.appendChild(li);
    });
}

function saveHistory() {
    localStorage.setItem("calcHistory", JSON.stringify(history));
}

historyToggle.addEventListener("click", (e) => {
    playClick();
    e.stopPropagation();
    historyPanel.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (!historyPanel.contains(e.target) && !historyToggle.contains(e.target)) {
        historyPanel.classList.remove("show");
    }
});

clearHistoryBtn.addEventListener("click", () => {
    playClick();
    history = [];
    saveHistory();
    renderHistory();
});

themeBtn.addEventListener("click", () => {
    playClick();
    if (toggling) return;
    toggling = true;
    darkMode = !darkMode;
    document.body.classList.toggle("dark-theme", darkMode);
    themeImgs.src = darkMode ? "assets/dark-mode.png" : "assets/light-mode.png";
    setTimeout(() => toggling = false, 700);
});

// INITIALIZATION
renderHistory();
updateDisplay();