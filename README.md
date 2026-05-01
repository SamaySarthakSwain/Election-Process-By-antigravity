# ElectionVerse AI 🏛️✨

ElectionVerse AI is a premium, AI-powered interactive civic intelligence platform designed to demystify the democratic election process. It serves as an intelligent assistant, a simulator, and a guided learning system to help users of all levels understand the complexities of democracy through modern technology.

---

## 🎯 Chosen Vertical: Civic Tech & Educational Intelligence
ElectionVerse AI sits at the intersection of **Civic Tech** and **EdTech**. While most political platforms focus on news aggregation or campaigning, this platform prioritizes **Civic Literacy**. It aims to solve the "complexity barrier" in democratic participation by providing accessible, AI-driven educational tools that explain not just *who* to vote for, but *how* the entire system functions.

---

## 💡 Approach and Logic

The platform follows a three-pillar logic to deliver high-impact civic education:

1.  **Adaptive Learning Depth**: Content is not "one-size-fits-all." We use a **Layered Learning Architecture** where the AI adjusts the vocabulary, technical detail, and context based on the user's selected proficiency (Beginner, Student, or Advanced).
2.  **Gamified Simulation (Strategy Lab)**: Instead of passive reading, users learn through action. By simulating a campaign, users encounter the trade-offs of budgeting, audience targeting, and regional strategy, making the abstract "mechanics of winning" tangible.
3.  **One-Prompt Intelligence**: We implement a "Direct-to-Knowledge" logic. Users can input a single localized query (e.g., "Elections in Brazil"), and the system synthesizes a structured, multi-phase breakdown instantly, bypassing the need for manual research across fragmented sources.

---

## ⚙️ How the Solution Works

ElectionVerse AI is built on a modern, dual-stack architecture designed for performance and intelligence:

---

## 🛠️ Google Services Integration

ElectionVerse AI leverages several Google technologies to deliver its premium experience:

*   **Google Gemini 2.5 Flash**: The core intelligence engine. We use the official `google-genai` SDK for low-latency, structured AI generation, powering the AI Mentor and the Strategy Lab.
*   **Google Fonts**: The "Regal" aesthetic is achieved using the **Playfair Display** (for display headings) and **Inter** (for high-readability body text) typography, ensuring a premium feel that meets accessibility standards.
*   **Google AI SDK**: Used for strict JSON response parsing, enabling the seamless conversion of unstructured political data into structured simulation metrics.

---

## ⚙️ How the Solution Works

ElectionVerse AI is built on a modern, dual-stack architecture designed for performance and intelligence:

### 1. The Intelligence Engine (Backend)
*   **FastAPI / Python**: A high-performance backend that manages API requests and orchestrates the AI workflow.
*   **Structured Output Generation**: The backend forces the LLM to return valid JSON for simulation metrics while allowing free-form Markdown for educational content.

### 2. The Interactive Canvas (Frontend)
*   **React & TypeScript**: Powers a responsive, state-driven interface.
*   **Glassmorphic Design System**: A premium UI using vanilla CSS for a high-end aesthetic.
*   **3D Transitions**: We use CSS 3D transforms to create a "tactile" feel for the election phases.

### 3. Data Flow
1.  **User Input**: User submits a query or campaign strategy on the React frontend.
2.  **API Bridge**: The request is sent to the FastAPI backend.
3.  **AI Synthesis**: The backend constructs a specialized prompt and sends it to Gemini.
4.  **UI Hydration**: The frontend parses the response and dynamically updates the visual components.

---

---

## 📝 Assumptions Made

During development, the following assumptions were made to streamline the experience:

1.  **Standardized Framework**: We assume the "5-Phase Model" (Registration, Campaigning, Voting, Counting, Transition) is a universally applicable baseline for most democratic systems, though localized AI generation can add specific nuances.
2.  **API Connectivity**: The "Live AI" features assume the user has configured a valid `GEMINI_API_KEY`. The system gracefully falls back to mock data if no key is detected.
3.  **Modern Browser Support**: The UI relies on modern CSS features like backdrop-filter (glassmorphism) and 3D transforms, assuming users are on relatively recent versions of Chrome, Edge, or Safari.
4.  **Educational Intent**: We assume users are seeking objective educational information rather than biased political advocacy; the AI prompts are tuned for neutral, civic-focused analysis.

---

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
set GEMINI_API_KEY=your_key
uvicorn main:app --reload
```

### Frontend Setup
```bash
npm install
npm run dev
```

---
*Built for the future of democracy.*
