const characters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",

  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",

  "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
  "_", "+", "-", "=", "[", "]", "{", "}", "|",
  ";", ":", "'", ",", ".", "<", ">", "/", "?", "`", "~"
]
let passwordOneEl = document.getElementById("password-one-el")
let passwordTwoEl = document.getElementById("password-two-el")

let passwordOneText = passwordOneEl.querySelector(".password-text")
let passwordTwoText = passwordTwoEl.querySelector(".password-text")

passwordOneEl.addEventListener("click", function() {
    let tooltip = passwordOneEl.querySelector(".tooltip")

    navigator.clipboard.writeText(passwordOneText.textContent)
        .then(() => {
            tooltip.textContent = "Copied!"

            setTimeout(function() {
                tooltip.textContent = "Copy Password"
            }, 1000)
        })
})

passwordTwoEl.addEventListener("click", function() {
    let tooltip = passwordTwoEl.querySelector(".tooltip")

    navigator.clipboard.writeText(passwordTwoText.textContent)
        .then(() => {
            tooltip.textContent = "Copied!"

            setTimeout(function() {
                tooltip.textContent = "Copy Password"
            }, 1000)
        })
})

function generatePassword() {
    let password1 = ""
    let password2 = ""

    for (let i = 0; i < 15; i++) {
        let randomIndex1 = Math.floor(Math.random() * characters.length)
        let randomIndex2 = Math.floor(Math.random() * characters.length)
        password1 += characters[randomIndex1]
        password2 += characters[randomIndex2]
    }

    passwordOneText.textContent = password1
    passwordTwoText.textContent = password2
}