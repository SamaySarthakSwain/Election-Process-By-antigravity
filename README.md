# ElectionVerse AI 🏛️✨

Welcome to **ElectionVerse AI** — a premium, AI-powered interactive civic intelligence platform designed to demystify the democratic election process. Built for a hackathon, this platform acts as an intelligent assistant, a simulator, and a guided learning system to help users of all levels (Beginner, Student, and Advanced) understand how elections work.

![ElectionVerse](https://img.shields.io/badge/Status-Hackathon_Ready-success?style=for-the-badge)

---

## 📖 The Election Process Breakdown

Understanding the election process is the core mission of ElectionVerse AI. The platform walks users through the **five critical phases of a democratic election**:

### 1. Voter Registration 📝
The foundational step where citizens prove their eligibility (age, citizenship, residence) to get on the voter rolls. This phase is crucial for maintaining election integrity, ensuring only eligible voters cast ballots, and setting up accurate voter files for election day.

### 2. Campaigning & Persuasion 📣
Candidates present their platforms, debate policies, and rally supporters. Modern campaigning involves ground-game canvassing, digital outreach, televised debates, and data-driven micro-targeting. This is the "interview phase" where candidates compete to win over the electorate.

### 3. Voting Day 🗳️
The core of democracy in action. Citizens cast their ballots at local polling stations or via secure mail-in systems. Polling places follow strict chain-of-custody protocols, secrecy regulations, and are often overseen by bipartisan observers to ensure fairness.

### 4. Counting & Tallying 🧮
After polls close, ballots are securely collected and tabulated. Depending on the system, this involves electronic voting machines (EVMs), optical scanners, or manual counting. Risk-limiting audits and reconciliation logs are used to verify accuracy and deter fraud.

### 5. Results & Transition 🏛️
Winners are officially certified and announced. The peaceful handover of power is a hallmark of a healthy democracy. This phase includes oaths of office, potential coalition negotiations in parliamentary systems, and the transition of governance responsibilities.

---

## 🚀 Key Platform Features

*   **Interactive Election Journey**: A 3D, gamified flashcard and flow-based learning path. Explanations adapt dynamically based on your chosen knowledge level (Beginner, Student, Advanced).
*   **One-Prompt Intelligence**: Ask a single question (e.g., "Explain elections in India") and the AI will generate a beautifully formatted, structured breakdown.
*   **Strategy Lab**: Put yourself in the shoes of a political candidate. Define your region, budget, and strategy, and our "Royal Strategist AI" will calculate your win probability and provide brutal, constructive feedback.
*   **Auto Content Studio**: Generate comprehensive, formatted "Build in Public" LinkedIn posts or technical blog posts with a single click.

---

## 🛠️ Technology Stack

ElectionVerse AI utilizes a powerful dual-stack architecture to deliver a seamless, intelligent user experience:

*   **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI / Radix primitives.
*   **Design System**: Custom "Premium Light" aesthetic featuring glassmorphism, 3D CSS transforms, and dynamic animated backgrounds.
*   **Backend API**: Python, FastAPI, Pydantic.
*   **Artificial Intelligence**: Direct integration with Google's **Gemini 2.5 Flash** model via the official `google-genai` SDK for blazing fast inference and structured data evaluation.
*   **Deployment Ready**: Pre-configured with `vercel.json` and `netlify.toml` for instant, one-click deployments.

---

## 💻 Running the Project Locally

To run the full ElectionVerse AI experience, you need to start both the Frontend application and the Python AI Backend.

### 1. Start the Python AI Backend
The backend handles all AI generation and strategy evaluation.

```bash
# Navigate to the backend directory
cd backend

# Install required dependencies
pip install -r requirements.txt

# Start the FastAPI server (runs on http://localhost:8000)
uvicorn main:app --reload
```
*Note: To unlock real AI generations, set your Gemini API key in your terminal before running the server: `set GEMINI_API_KEY=your_api_key_here` (Windows) or `export GEMINI_API_KEY=your_api_key_here` (Mac/Linux).*

### 2. Start the React Frontend
The frontend provides the interactive User Interface.

```bash
# Open a new terminal window in the root project directory
# Install Node dependencies
npm install

# Start the Vite development server (runs on http://localhost:8081)
npm run dev
```

Navigate to `http://localhost:8081` in your browser to experience ElectionVerse AI!

---
*Built with ❤️ for Prompt Wars.*
