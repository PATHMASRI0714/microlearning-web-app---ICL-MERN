# Micro-Learning App: Project Overview

## 📖 Introduction
The **Micro-Learning App** is a full-stack web application designed for bite-sized educational lessons. It allows users to browse topics, complete short interactive lessons with flashcards, track their daily streaks, earn XP, and unlock badges. The platform aims to make learning engaging and sustainable through brief, daily sessions.

---

## 🏗️ Architecture & Technology Stack

The project operates as a standard dual-app architecture: a decoupled **Frontend** client and a **Backend** REST API.

### 1. Frontend (User Interface)
- **Framework:** React.js paired with Vite for fast builds and hot module replacement.
- **Routing:** React Router v7 used for single-page navigation (`/login`, `/register`, `/`, `/explore`, `/lesson`, `/profile`).
- **Styling:** Vanilla CSS (`index.css` and `App.css`) with support for dynamic theming (Dark/Light mode). Icons are provided by `lucide-react`.
- **State Management:** React Context API (`AppContext.jsx`) is utilized to handle global user state, authentication status, and themes.

#### Key Pages:
- **Dashboard:** Displays the user's daily progress, "Today's Lesson", and recent achievements/streaks.
- **Explore:** A catalog of available learning topics where users can browse what to learn next.
- **Lesson:** The core interactive experience featuring flashcards, a progress bar, and completion rewards.
- **Profile:** Showcases user statistics, acquired badges (e.g., "Fast Learner", "7-Day Streak"), and overall XP/Level.
- **Auth (Login/Register):** Handles user onboarding and authentication.

### 2. Backend (Server & Database)
- **Runtime & Framework:** Node.js with Express.js to handle RESTful HTTP requests.
- **Database:** MongoDB, mapped using Mongoose ODM, for persistent data storage.
- **Tools:** `cors` for Cross-Origin Resource Sharing, `dotenv` for environment variable management.

#### Core API Features:
- **Authentication:** Custom simple mock-token-based authentication.
- **Gamification Engine:** When a user completes a lesson (`/api/users/complete-lesson`), the backend dynamically calculates XP, increments levels, updates streaks, and unlocks badges if specific thresholds are met.
- **Data Provision:** Serves topics, flashcards, and checks user progress metrics in real-time.

---

## 🛠️ Main Features Summarized
1. **Bite-Sized Lessons:** Fast, flashcard-based lessons aiming to take ~2 minutes.
2. **Gamification System:**
   - **XP & Leveling:** Accumulate XP to advance levels.
   - **Badges:** Unlockable achievements (e.g., *Polyglot*, *Champion*).
   - **Streaks:** Encourages daily logins.
3. **Theming:** A toggleable Light/Dark theme capability baked into the UI.

## 🚀 How to Run the Project Locally

### 1. Backend Setup
1. Navigate to the `backend` folder.
2. Ensure you have MongoDB running locally at `mongodb://127.0.0.1:27017/micro-learning` (or provide a `MONGO_URI` in an `.env` file).
3. Run `npm install` to install Express, Mongoose, etc.
4. Run `node server.js` to start the backend on port `5000`.

### 2. Frontend Setup
1. Navigate to the `frontend` folder.
2. Run `npm install` to install React and Vite dependencies.
3. Run `npm run dev` to start the development server.
4. Open the provided localhost link in your browser.
