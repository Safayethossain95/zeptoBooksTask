# Book Display and Filter Web App

This is a simple web application built using HTML, CSS, and JavaScript that allows users to view and filter books based on different subjects. The app fetches book data from an external API and enables users to search and filter books by subject using a dropdown.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Fetches book data from the [Gutenberg API](https://gutendex.com).
- Displays a list of books with relevant information.
- Allows users to filter books by subject using a dropdown.
- Responsive design for seamless viewing on mobile and desktop devices.
- Persistent filtering: The selected filter is saved in `localStorage` and restored when the page is reloaded.

## Demo

You can view a live demo of the project here: [Live Demo](https://github.com/Safayethossain95/zeptoBooksTask)

## Technologies Used

- **HTML5**: For the structure and layout of the web page.
- **CSS3**: For styling the app and ensuring responsiveness.
- **JavaScript (ES6)**: For fetching data from the API, filtering books, and DOM manipulation.
- **Fetch API**: To get book data from the external API.
- **localStorage**: To store the selected filter and maintain it across page reloads.

## Installation

Follow the steps below to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Safayethossain95/zeptoBooksTask.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo-name
   ```

3. **Open `index.html` in your browser:**

   Simply open the `index.html` file in your browser to run the app.

   Alternatively, you can use a simple HTTP server like `Live Server` in VSCode to run the app.

## Usage

Once the project is set up, you can:

1. **View books**: On page load, a list of books will be displayed.
2. **Filter books**: Use the dropdown to filter books by subject. The selection is saved in the browser's `localStorage`, so the filter persists after page reload.
3. **Clear filter**: To reset the filter, simply select an empty option in the dropdown.
