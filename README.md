# ⚡ Flashcard Generator

!

**Flashcard Generator** is a modern, responsive web application built with React and Redux that allows users to easily create, manage, study, and share their own custom flashcard groups for efficient learning and revision.

---

## ✨ Features

* **Custom Group Creation:** Easily create flashcard groups with a title, description, and optional group image.
* **Term Management:** Add multiple terms to each group, including text definition and optional image attachment for each individual term.
* **Persistent Storage:** All created flashcard groups are saved directly in the browser's local storage, so your data persists even after closing the browser.
* **View & Study Mode:** Dedicated page for studying, displaying terms and definitions one card at a time.
* **Group Collection:** The "**My Flashcards**" page displays a clean, card-based overview of all created groups.
* **Data Management:**
    * ✅ **Delete Group:** Users can permanently delete unwanted flashcard groups from the collection.
* **Sharing & Export:**
    * 🔗 **Enhanced Sharing:** Share groups via a direct link or directly to popular social platforms (WhatsApp, LinkedIn, Twitter/X, Facebook) using a custom share modal.
    * 📥 **Download/Print:** Dedicated buttons to easily print the flashcard content or save it as a high-quality PDF for offline use.
* **Responsive Design:** Optimized layout for viewing on both desktop and mobile devices.

---

## 🚀 Tech Stack

* **Frontend Framework:** React
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS (for rapid, utility-first styling)
* **Form Handling:** Formik & Yup (for complex form state and validation)
* **Unique IDs:** Nanoid (for generating unique IDs for groups)

---

## 🛠️ Installation & Setup

### Prerequisites

You must have **Node.js** and **npm** (or yarn) installed on your machine.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd flashcard-generator
    ```

2.  **Install Dependencies:**
    ```bash
    npm install 
    # or
    yarn install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically open at `http://localhost:5173`.

---

## 📂 Project Structure

The key components and logic are organized as follows:

flashcard-application/
├── node_modules/           # (Dependencies installed via npm/yarn)
├── public/                 # (Files served directly, like images and favicon)
│   └── flashcard.jpg       # Example image file
├── src/
│   ├── components/         # Reusable UI elements
│   │   ├── FlashcardCard.jsx
│   │   └── Navbar.jsx
│   ├── pages/              # Main application views/routes
│   │   ├── CreateFlashcard.jsx
│   │   ├── FlashcardDetails.jsx
│   │   └── MyFlashcards.jsx
│   ├── redux/              # Redux state management files
│   │   ├── flashcardSlice.js
│   │   └── store.js
│   ├── utils/              # Utility functions
│   │   └── storage.js
│   ├── App.jsx             # Main App component and routing setup
│   ├── index.css           # Global CSS and Tailwind directives
│   └── main.jsx            # Entry point (React rendering)
├── .gitignore              # Files/folders to ignore in Git
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file (where the React app is injected)
├── package-lock.json       # Exact dependency versions
├── package.json            # Project metadata and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation (the file we just created)
└── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build tool configuration


---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.