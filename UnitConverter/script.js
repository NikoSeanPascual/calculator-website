const inputEl = document.getElementById("number-el")
const convertBtn = document.getElementById("convert-el")

const lengthContainer = document.getElementById("length-container")
const volumeContainer = document.getElementById("volume-container")
const massContainer = document.getElementById("mass-container")
const themeToggle = document.getElementById("theme-toggle")
const themeImg = document.getElementById("theme-img")

// STORE ALL ACTIVE TIMEOUTS
let activeTimeouts = []

function clearAllTimeouts() {
    activeTimeouts.forEach(t => clearTimeout(t))
    activeTimeouts = []
}

// TYPEWRITER EFFECT
function typeText(element, text, speed = 20) {
    element.textContent = ""
    let i = 0

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i)
            i++
            const t = setTimeout(typing, speed)
            activeTimeouts.push(t)
        }
    }

    typing()
}

// GREEN LOADING ANIMATION
function animateCard(card) {
    card.classList.remove("loaded")
    card.classList.add("loading")

    const t = setTimeout(() => {
        card.classList.remove("loading")
        card.classList.add("loaded")
    }, 600)

    activeTimeouts.push(t)
}

convertBtn.addEventListener("click", function () {
    const value = Number(inputEl.value)

    if (!value && value !== 0) {
        alert("Please enter a valid number")
        return
    }

    clearAllTimeouts()

    convertBtn.disabled = true
    convertBtn.textContent = "Converting..."

    // Trigger green loading effect
    animateCard(lengthContainer)
    animateCard(volumeContainer)
    animateCard(massContainer)

    lengthContainer.innerHTML = "<p>Converting...</p>"
    volumeContainer.innerHTML = "<p>Converting...</p>"
    massContainer.innerHTML = "<p>Converting...</p>"

    const delay = setTimeout(() => {
        // Conversion constants
        const meterToFeet = 3.281
        const literToGallon = 0.264
        const kiloToPound = 2.204

        // LENGTH
        const metersToFeet = (value * meterToFeet).toFixed(3)
        const feetToMeters = (value / meterToFeet).toFixed(3)

        lengthContainer.innerHTML = `
            <h3>Length (Meter/Feet)</h3>
            <p id="length-text"></p>
        `

        const lengthText = `${value} meters = ${metersToFeet} feet | ${value} feet = ${feetToMeters} meters`

        // VOLUME
        const litersToGallons = (value * literToGallon).toFixed(3)
        const gallonsToLiters = (value / literToGallon).toFixed(3)

        volumeContainer.innerHTML = `
            <h3>Volume (Liters/Gallons)</h3>
            <p id="volume-text"></p>
        `

        const volumeText = `${value} liters = ${litersToGallons} gallons | ${value} gallons = ${gallonsToLiters} liters`

        // MASS
        const kilosToPounds = (value * kiloToPound).toFixed(3)
        const poundsToKilos = (value / kiloToPound).toFixed(3)

        massContainer.innerHTML = `
            <h3>Mass (Kilograms/Pounds)</h3>
            <p id="mass-text"></p>
        `

        const massText = `${value} kilos = ${kilosToPounds} pounds | ${value} pounds = ${poundsToKilos} kilos`

        // TYPE EFFECT (staggered)
        typeText(document.getElementById("length-text"), lengthText, 15)

        activeTimeouts.push(setTimeout(() => {
            typeText(document.getElementById("volume-text"), volumeText, 15)
        }, 300))

        activeTimeouts.push(setTimeout(() => {
            typeText(document.getElementById("mass-text"), massText, 15)
        }, 600))

        // Re-enable button after everything
        const unlock = setTimeout(() => {
            convertBtn.disabled = false
            convertBtn.textContent = "Convert"
        }, 1500)

        activeTimeouts.push(unlock)

    }, 900)

    activeTimeouts.push(delay)
})

let isDark = false
let isToggling = false

themeToggle.addEventListener("click", () => {
    if (isToggling) return

    isToggling = true
    themeToggle.disabled = true

    isDark = !isDark

    if (isDark) {
        document.body.classList.add("dark-mode")
        themeImg.src = "assets/dark-mode.png"
    } else {
        document.body.classList.remove("dark-mode")
        themeImg.src = "assets/light-mode.png"
    }

    setTimeout(() => {
        isToggling = false
        themeToggle.disabled = false
    }, 700)
})