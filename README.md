# 🔢 Niko's Calculator

A project made to simply try to add as much features possible in a Calculator App, it has a slick and simple design "currently" (it will change a lot, as features get added)

[**View Live Demo 👉**](https://nikos-calculator-app.netlify.app/)

---

## ⚙️ How it works

Capturing User Input - The app listens for a click event to what number you click specifically and after clicking the numbers or operations or events, it will get displayed in the display bar you can calculate it via click the "=" sign or change change the display or number based on what event you clicked (A/C, %, +/-)

## 📂 Project Structure

```text
calculator
│
├── index.html     # Main structure of the application
├── styles.css     # UI Styling and containers
└── script.js       # Core Logic
```
---

## 🚧 Future updates 
1. Polishing Updates
    - Backspace (⌫)
    - Keyboard input support
    - Continuous equals (= spam behavior)
    - Operator highlight
    - Better error handling (division by 0, NaN)
    - Disable buttons during error
    - Decimal precision control
    - Clear Entry (CE) vs All Clear (AC)

2. Theme Toggle - Dark Mode to Light mode button
 
3. History System
    - Scrollable history panel
    - Click history to reuse result
    - Clear history button
    - Persist history (localStorage)

4. Memory System
    - MC (clear memory)
    - MR (recall)
    - M+ (add to memory)
    - M- (subtract)\

5. Expression Handling
    - Show full expression (12 + 7 × 3)
    - Evaluate with proper precedence (BODMAS 👀)
    - Parentheses support ( )

6. UI/UX Upgrades
    - Button press animation
    - Ripple effect
    - Hover glow
    - Smooth number transitions
    - Auto-resize text
    - Scroll display horizontally

7. Smart Input
    - Type full expression:
    -  Press enter -> evaluate

8. Undo/Redo
    - Undo/Redo 
      * Ctrl+Z -> Undo
      * Ctrl+Y -> Redo
     
9. Fun Features
    - sound effects (click click)
    - glitch mode
    - “rage mode” if user spams buttons
    - random math facts

10. Mobile Responsiveness
    - It should look the same in Mobiles like it looks like in PC
