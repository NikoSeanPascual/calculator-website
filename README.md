# 🔐Password Generator App

A simple and interactive **Password Gnerator Web App that I also sent to the web** built using **HTML, CSS, AND JAVASCRIPT**, This project generates random secure passwords and allows to easily copy them with a single click

---

## Features

- Generates **two random passwords** at once
- Each password is **15 characters long**
- Uppercase letters (A-Z)
- Lowercase letters (a-z)
- Numbers (0-9)
- Special symbols (!@#$%^&*)
- Click password to **copy it to clipboard**
- Tooltip appears on hover: **"Copy Password"**
- Smooth hover effects and clean UI

- ## Tech Stack
- **HTML** - Structure
- **CSS** - Styling & layout (flexbox, hover effects, tooltip)
- **Javascript** - Logic & interactivity

## Project Structure

```
PasswordGenerator
│
├── index.html     # Main HTML structure
├── index.js       # Password generation & copy logic
└── styles.css     # Styling and layout
```

## How it works 
- A predifined array containing all possible characters
- A loop runs 15 times
- Each iteration:
   - Picks a random character
   - Appends it to the password string

### Copy to clipboard
- Clicking a password triggers:

  ```js
  navigator.clipboard.writeText(password)



## LIVE DEMO 
if you want to see the actual project, feel free to check it out by clicking the link next to this emoji 👉 (https://password-generator-v4.netlify.app/) **UP TO DATE**

## Future Updates(I will work on this a bit longer and this are the features I will add everyday)
Note: School is finished so I will upd everyday till this is finished feel free to send me some suggestions to add stuff

1. "Copied!" feedback - replace tootip text with **Copied!** for 1 second ✅**ADDED IN 03/22/26**
2. Password length control - Add some kind of input that can be customize base on how long the password length you want it to be  ✅**ADDED IN 03/24/26**
3. Slider - Better UI design  ✅**ADDED IN 03/24/26**
4. Include.exclude options - CHECKBOXES ✅**ADDED IN 03/28/26**
5. Color feedback - change password bpx color when copied ✅**ADDED IN 03/28/26**
6. Regenerate button animation - Add click animation or shake effect ✅**ADDED IN 03/31/26**
7. Password strength indicator - strong, medium and weak ✅**ADDED IN 03/31/26**
8. Dark/Light mode toggle ✅**ADDED IN 03/31/26**
9. Mobile responsiveness - make it look the same when you open it on phones ✅**ADDED IN 04/01/26**
10. Export passwords - be able to download the password as .txt 🚧 **WORK IN PROGRESS**

