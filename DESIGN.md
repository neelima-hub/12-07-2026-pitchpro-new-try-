# PitchPro - Website Architecture & Design Plan

## 1. Project Overview
**Name:** PitchPro
**Description:** A premium, AI-powered platform transforming raw ideas, research papers, and startup concepts into winning, competition-ready pitches and presentations.
**Primary Goal:** Instantly answer "Can this help me win my next pitch?" while driving fast user onboarding.
**Vibe:** Modern, confident, premium, founder-first. (References: Linear, Stripe, Apple).

---

## 2. Global Design System & Theming

### Colors (Tailwind Reference)
*   **Primary (Backgrounds/Deep Text):** `#0B0B0F` (Near Black)
*   **Secondary (Main Background/Cards):** `#FFFFFF` (White)
*   **Accent (Primary Buttons/Highlights):** `#6C63FF` (Indigo)
*   **Success (Badges/Checkmarks):** `#3DDC97` (Mint/Green)
*   **Light Gray (Subtle Backgrounds/Sections):** `#F5F5F7`
*   **Border (Dividers/Card Outlines):** `#E5E7EB`

### Typography
*   **Headings:** Satoshi (or General Sans). Weight: Bold/Semibold.
*   **Body:** Inter. Weight: Regular/Medium.
*   **Styling:** Clean, high legibility, generous line height (leading-relaxed for body).

### UI/UX Elements
*   **Containers:** Max-width screens (e.g., max-w-7xl) with generous horizontal padding.
*   **Cards:** Rounded corners (e.g., `rounded-2xl`), soft shadows (`shadow-sm` to `shadow-md`), 1px subtle borders (`border-gray-200`).
*   **Effects:** Glassmorphism strictly limited to sticky navbars or floating action bars. Minimal illustrations with subtle indigo/mint gradients.
*   **Animations:** Smooth, subtle reveal animations on scroll. Micro-interactions on button hover.

---

## 3. Landing Page Structure (Top to Bottom)

### A. Navigation Bar (Sticky & Glassmorphic)
*   **Left:** PitchPro Logo (Minimal typographic or simple geometric mark).
*   **Center:** Links (Features, How it Works, Use Cases).
*   **Right:** "Log In" (ghost button) and "Get Started" (Primary Indigo button).

### B. Hero Section (High-Converting & Confident)
*   **Headline (H1):** "Give Your Ideas the Presentation They Deserve."
*   **Subheadline:** "The AI-powered platform that transforms raw ideas, research, and startup concepts into winning, competition-ready pitches in minutes."
*   **CTAs:** "Start Building for Free" (Primary) alongside a secondary "Watch Demo" button.
*   **Visual:** A beautiful, premium mock-up (floating rounded cards or a sleek app UI representation) showing a messy document turning into a polished slide deck.

### C. Social Proof / Audience Bar
*   **Text:** "Trusted by founders and innovators at top institutions."
*   **Visual:** Logos or text tags representing Target Audience (Incubators, Hackathons, Universities).

### D. "How It Works" (4-Step Visual Flow)
*   *Layout:* Vertical timeline or a sleek 4-column grid.
*   **Step 1: Upload.** (Icon: Document) "Upload your PDF, research, or idea."
*   **Step 2: AI Analysis.** (Icon: Sparkles) "AI extracts the problem, solution, and market."
*   **Step 3: Generate.** (Icon: Layers) "Get investor-ready decks, scripts, and summaries."
*   **Step 4: Practice.** (Icon: Microphone) "Rehearse with our AI mock judge."

### E. Core Features Grid (Bento Box Style)
*   *Layout:* Asymmetric grid (Bento box) to showcase features dynamically.
*   **Cards to include:**
    *   AI Pitch Deck Generator
    *   AI Story Builder
    *   Presentation Coach & Mock Judge Q&A
    *   Executive Summary & Elevator Pitch Export

### F. Target Audience Section (Tabs or Pill Selectors)
*   *Headline:* "Built for every stage of innovation."
*   *Interactive Element:* Clickable pills (Founders, Students, Researchers). Clicking one changes a brief description and visual below it to show specific use cases.

### G. Final CTA (Bottom of Page)
*   *Design:* Large, rounded container with a subtle dark gradient (#0B0B0F).
*   *Headline:* "Ready to win your next pitch?"
*   *Button:* "Create Your Free Pitch" (Accent color).

### H. Minimal Footer
*   Links, copyright, privacy policy, terms of service.

---

## 4. Component Guidelines for AI IDE

When generating code, the agent should adhere strictly to these rules:
1.  **Framework:** React/Next.js with Tailwind CSS (or as specified by the user's stack).
2.  **Clean Code:** Extract reusable components (e.g., `<PrimaryButton>`, `<FeatureCard>`).
3.  **Whitespace:** Use ample padding (`py-20`, `py-24`) between major sections.
4.  **Icons:** Use clean, stroke-based icons (e.g., Lucide React or Heroicons).