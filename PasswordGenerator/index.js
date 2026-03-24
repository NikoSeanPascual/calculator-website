const characters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[", "]", "{", "}", "|", ";", ":", "'", ",", ".", "<", ">", "/", "?", "`", "~"
];

const lengthEl = document.getElementById("length-el");
const lengthVal = document.getElementById("length-val");
const passwordOneText = document.querySelector("#password-one-el .password-text");
const passwordTwoText = document.querySelector("#password-two-el .password-text");

// Update number display when sliding
lengthEl.addEventListener("input", function() {
    lengthVal.textContent = lengthEl.value;
});

function generatePassword() {
    let pass1 = "";
    let pass2 = "";
    const length = lengthEl.value;

    for (let i = 0; i < length; i++) {
        pass1 += characters[Math.floor(Math.random() * characters.length)];
        pass2 += characters[Math.floor(Math.random() * characters.length)];
    }

    passwordOneText.textContent = pass1;
    passwordTwoText.textContent = pass2;
}

// Copy functionality
function setupCopy(el, textEl) {
    el.addEventListener("click", function() {
        const tooltip = el.querySelector(".tooltip");
        navigator.clipboard.writeText(textEl.textContent).then(() => {
            tooltip.textContent = "Copied!";
            setTimeout(() => { tooltip.textContent = "Copy Password"; }, 1000);
        });
    });
}

setupCopy(document.getElementById("password-one-el"), passwordOneText);
setupCopy(document.getElementById("password-two-el"), passwordTwoText);