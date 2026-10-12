# BIWA2110 Community Library Management System

A beginner-friendly React project for Individual Assignment 2. It uses React Hooks, React Router, reusable components, controlled forms, validation, and browser localStorage.

## Features

- Login form with demo Admin and Librarian accounts.
- Dashboard with book titles, total copies, low-stock count, members, and recent transactions.
- Add, edit, search, and delete book records.
- Stock transactions: add new copies or record borrowing.
- Borrowing cannot reduce stock below zero.
- Transaction history records date/time, book, type, quantity, user, and note.
- Add, update, and delete user accounts (Admin role only).
- Low-stock warning when a title has fewer than 2 copies.
- Responsive layout for desktop and mobile.
- Data is saved in localStorage and remains after refresh in the same browser.

## Requirements

Install Node.js (LTS version recommended) and npm.

## Run the project

1. Extract the ZIP file.
2. Open a terminal in the `biwa2110-library-management` folder.
3. Install packages:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in the terminal, usually `http://localhost:5173`.

To check a production build, run `npm run build`.

## Demo login accounts

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Librarian | `librarian` | `lib123` |

The Admin account can manage users. The Librarian can use the dashboard, books, and transactions but cannot add, edit, or delete users.

## Project structure

```text
biwa2110-library-management/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── data.js
    ├── styles.css
    ├── components/
    │   ├── BookForm.jsx
    │   ├── BookTable.jsx
    │   └── Layout.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Books.jsx
    │   ├── Transactions.jsx
    │   └── Users.jsx
    └── utils/
        └── storage.js
```

## How the code works

- `main.jsx`: starts React and enables browser routing.
- `App.jsx`: owns the main state, saves state to localStorage with `useEffect`, and passes data/functions to pages.
- `data.js`: provides starter book and user records for the first run.
- `utils/storage.js`: reusable functions for reading/writing localStorage and creating IDs.
- `components/Layout.jsx`: shared sidebar, navigation, user details, and logout button.
- `components/BookForm.jsx`: controlled book form with validation and `useEffect` to populate edit values.
- `components/BookTable.jsx`: reusable table used by the dashboard and book management page.
- `pages/Dashboard.jsx`: shows inventory summaries and recent stock movements.
- `pages/Books.jsx`: searches, adds, edits, and deletes book records.
- `pages/Transactions.jsx`: validates and records stock additions and borrowing.
- `pages/Users.jsx`: contains the login screen and admin user management.

## Assignment requirements covered

| Assignment requirement | Where to find it |
|---|---|
| React hooks (`useState`, `useEffect`) | `App.jsx`, forms and pages |
| Lifecycle behaviour using hooks | `App.jsx` persistence effects; `BookForm.jsx` edit-form effect |
| Reusable components | `components/` |
| Controlled forms, validation, submission | `BookForm.jsx`, `Transactions.jsx`, `Users.jsx` |
| React Router navigation | `App.jsx`, `Layout.jsx` |
| Local storage | `utils/storage.js`, `App.jsx` |
| Book add/update/delete | `pages/Books.jsx` |
| Stock tracking and transaction log | `pages/Transactions.jsx` |
| Login and user add/update/delete | `pages/Users.jsx` |
| Dashboard and low-stock highlight | `pages/Dashboard.jsx`, `BookTable.jsx` |

## Testing checklist

- [ ] Sign in using `admin` / `admin123`.
- [ ] Add a book and confirm it appears in the catalogue and dashboard.
- [ ] Edit the book and save changes.
- [ ] Add stock from the Transactions page and check the quantity increases.
- [ ] Borrow copies and check the quantity decreases.
- [ ] Try borrowing more copies than are available; the app should show an error.
- [ ] Confirm titles with fewer than 2 copies show a low-stock warning.
- [ ] Add a user with a unique membership ID and username.
- [ ] Refresh the page and confirm the data remains.
- [ ] Sign out and sign in with `librarian` / `lib123`; user-management controls should be restricted.

## Important security note

This is a coursework demonstration. localStorage is browser storage, not a secure database. Passwords stored there are not protected, and login is not production-grade authentication. Do not use real personal information or real passwords. A real library system should use a secure backend, database, password hashing, and server-side authorization.

## GitHub submission

1. Create a new repository on GitHub.
2. Upload the project files (do not upload `node_modules`).
3. Check that `package.json`, `src/`, and `README.md` are in the repository.
4. Copy the repository URL and submit it as requested in the assignment.
