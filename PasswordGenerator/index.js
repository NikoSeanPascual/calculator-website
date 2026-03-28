const characters = {
    lowercase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    uppercase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], // Added missing comma here
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[", "]", "{", "}", "|", ";", ":", "'", ",", ".", "<", ">", "/", "?", "`", "~"]
};

const lengthEl = document.getElementById("length-el");
const lengthVal = document.getElementById("length-val");
const passwordOneText = document.querySelector("#password-one-el .password-text");
const passwordTwoText = document.querySelector("#password-two-el .password-text");

lengthEl.addEventListener("input", function() {
    lengthVal.textContent = lengthEl.value;
});

function generatePassword() {
    let charsetPool = [];

    if (document.getElementById("uppercase").checked) charsetPool = charsetPool.concat(characters.uppercase);
    if (document.getElementById("lowercase").checked) charsetPool = charsetPool.concat(characters.lowercase);
    if (document.getElementById("numbers").checked) charsetPool = charsetPool.concat(characters.numbers);
    if (document.getElementById("symbols").checked) charsetPool = charsetPool.concat(characters.symbols);

    if (charsetPool.length === 0) {
        alert("Warning! Select at least one character type!");
        return;
    }

    let pass1 = "";
    let pass2 = "";
    const length = lengthEl.value;

    for (let i = 0; i < length; i++) {
        pass1 += charsetPool[Math.floor(Math.random() * charsetPool.length)];
        pass2 += charsetPool[Math.floor(Math.random() * charsetPool.length)];
    }

    passwordOneText.textContent = pass1;
    passwordTwoText.textContent = pass2;
}

function setupCopy(el, textEl) {
    el.addEventListener("click", function() {
        const tooltip = el.querySelector(".tooltip");
        const text = textEl.textContent;
        if (text === "...") return;

        navigator.clipboard.writeText(text).then(() => {
            tooltip.textContent = "Copied!";
            setTimeout(() => { tooltip.textContent = "Copy Password"; }, 1000);
        });
    });
}

setupCopy(document.getElementById("password-one-el"), passwordOneText);
setupCopy(document.getElementById("password-two-el"), passwordTwoText);