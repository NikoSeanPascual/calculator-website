# 🔢 Unit Converter App

A simple, interactive and responsive application, designed to convert the number you input into several units. Built to help you if you need to convert something

[**View Live Demo 👉**](https://unit-convertion-application.netlify.app/)

---

## ⚙️ How it works
1. Capturing User Input - The app listens for a click event on the Convert button. Once clicked:
   * It grabs the value from the input field (inputEl.value).
   * It converts that string into a Number type to ensure mathematical accuracy.
   * Validation: If the input is empty or not a valid number, an alert triggers to prevent broken calculations.

2. The Conversion Logic - The app uses fixed conversion constants for precision:
   * **Length**: 1 Meter = 3.281 Feet
   * **Volume**: 1 Liter = 0.264 Gallons
   * **Mass**: 1 Kilogram = 2.204 Pounds

The math is performed in both directions (e.g., Meters to Feet and Feet to Meters) using the .toFixed(3) method to    keep the results clean and limited to three decimal places.

3. Dynamic DOM Updates - Instead of refreshing the page, the app uses innerHTML to inject the results directly into specific display containers:(At the moment, there will be more in the future)
   * length-container
   * volume-container
   * mass-container

---

## 📂 Project Structure

```text
UnitConverter
│
├── Assets
├── index.html     # Main structure of the application
├── styles.css     # UI Styling and containers
└── index.js       # Core Logic
```
---

## 🚧 Future updates 
1. Animations ✅ **added in 04/05/26**
2. More Conversions
   - Square metters to square feet
   - Kilobytes(**Kb**) to Megabyte(**Mb**)
   - Kilometer Per Hour(**KPH**) to Miles Per Hour (**MPH**)
3. Theme Toggle - button that turns the backroubnd from light to dark theme ✅ **added in 04/05/26**
4. UI/UX enhancements
   - Clear All button
   - Keyboard Shortcuts:
      * **Enter** to trigger conversion
      * **Esc** to clear the input
      * **D or L** to toggle to Dark Mode to Light Mode

(More Ideas in the future that I might add in the future)
