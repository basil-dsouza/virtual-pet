# Virtual Pet Companion 🐾

A modern, web-based digital pet simulation game where you adopt, raise, and care for a virtual companion from egg to adulthood. Watch them grow, evolve based on your care, and preserve their memories in the Hall of Memorials.

![Virtual Pet Banner](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

## 📖 About The Project

Virtual Pet Companion brings the nostalgia of retro handheld pets to the modern web. Built with robust Domain-Driven Design (DDD) principles, this application ensures a rich simulation experience where every interaction counts.

### Key Features
- **Life Stages:** Watch your pet hatch from an egg and evolve through Baby, Child, Teen, and Adult stages based on how well you care for them.
- **Dynamic Stats:** Manage Hunger, Hygiene, Happiness, and Energy. Neglect has real consequences!
- **Evolution System:** Your care history influences how your pet looks and develops.
- **Memorial System:** When a pet's journey ends, they are honored in the Memorial with "Milestone Cards" that capture key moments of their life.
- **Responsive Design:** Playable on both desktop and mobile devices.

## 🛠️ Technology Stack

This project is built using modern web technologies:

- **Frontend Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** JavaScript (ESModules)
- **Architecture:** Domain-Driven Design (DDD) with clean separation of core logic and UI.
- **Testing:** [Vitest](https://vitest.dev/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd c:\Projects\Games\VirtualPet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

Start the local development server:
```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Other Commands

- **Build for Production:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```
- **Run Tests:**
  ```bash
  npm run test
  ```
- **Lint Code:**
  ```bash
  npm run lint
  ```

## 📂 Project Structure

The project follows a DDD structure to keep game logic independent of the UI:

- `src/domain`: Contains the core game logic (Entities like `Pet`, Value Objects like `Stats`). **Pure JavaScript, no React.**
- `src/infrastructure`: implementations of repositories and external services (e.g., `LocalStoragePetRepository`).
- `src/components`: React components for the UI.
- `src/assets`: Images and styling resources.

---

Happy Hatching! 🥚
