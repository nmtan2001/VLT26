# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple interactive Valentine's Day webpage with a "Yes/No" button interaction. When users click "No", the button cycles through persuasive messages and the "Yes" button grows larger. Clicking "Yes" redirects to a celebration page.

## Running the Project

Simply open `index.html` in a web browser. No build step, dependencies, or server required.

## Architecture

### Pages

- `index.html`: Main page with Yes/No buttons and initial GIF
- `yes_page.html`: Celebration page shown after clicking Yes

### Stylesheets

- `styles.css`: Styles for index.html (pink theme, centered layout)
- `yes_style.css`: Styles for yes_page.html

### JavaScript

- `script.js`: Handles button interactions

### Key Logic

- `messages` array: 11 persuasive messages that cycle when "No" is clicked
- `handleNoClick()`: Changes "No" button text and grows "Yes" button by 1.5x each click
- `handleYesClick()`: Redirects to `yes_page.html`

### External Assets

The project uses hotlinked Giphy GIFs. If those links break, replacements will be needed.
