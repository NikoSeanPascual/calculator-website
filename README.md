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
PasswordGenerator/
│
├── index.html # Main HTML structure
├── index.js # Password generation & copy logic
└── styles.css # Styling and layout

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
if you want to see the actual project, feel free to check it out by clicking the link next to this emoji 👉 (https://subtle-hamster-2ddb34.netlify.app/)
