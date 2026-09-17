# TalkPDF — Final Feature List & MoSCoW Prioritization

**Document Version:** 1.0.0  
**Date:** 16 September 2026  
**Target Build Sprint:** 5-Day Team Build (Milestone: Minimum Viable Learning-Resolution Loop)  
**Source References:** [requirements.md](file:///c:/Users/HomePC/Documents/Talkpdf/requirements.md) | [screen-specification.md](file:///c:/Users/HomePC/Documents/Talkpdf/screen-specification.md)

---

## 1. Executive Summary & Sprint Constraint

This document consolidates every functional capability, screen element, and architectural requirement specified in [requirements.md](file:///c:/Users/HomePC/Documents/Talkpdf/requirements.md) and [screen-specification.md](file:///c:/Users/HomePC/Documents/Talkpdf/screen-specification.md).

### Sprint Target: 5-Day Team Build
* **Sprint Goal:** Build and validate the end-to-end **Learning-Resolution Loop** (`Assess → Diagnose → Targeted Lesson → Explain-Back → AI Evaluation → Parallel Verification`) with real SS3 WAEC/JAMB candidates on low-end Android mobile browsers.
* **Must-Have Limit:** Capped strictly at **6 features maximum**. Any secondary or non-critical features originally tagged as high-priority in preliminary notes have been systematically triaged into **Should Have** or lower to prevent sprint failure.

---

## 2. MoSCoW Prioritization Table

| Feature | Description | MoSCoW Category | Reason |
| :--- | :--- | :--- | :--- |
| **Curriculum-Linked Diagnostic Assessment** *(FR-01, SCR-01, SCR-02)* | 5-question past-exam diagnostic quiz linked to WAEC/JAMB syllabus objectives with topic selection and pre-tagged misconception answer options. | **Must have** | The product is broken without it. Without targeted questions mapped to curriculum objectives, the system cannot detect where a student's conceptual misunderstanding lies. |
| **Root-Cause Misconception Diagnosis** *(FR-02, SCR-03)* | Automatically isolates and presents the probable conceptual gap when an incorrect option is chosen, framed as a likely misconception rather than a definitive claim. | **Must have** | Core value differentiator. Standard drill software only tells a student *what* is wrong; identifying *why* (the specific misconception) is the prerequisite for targeted remediation. |
| **Targeted Conceptual Micro-Intervention** *(FR-03, SCR-03)* | Delivers a focused, 60–90 second plain-English explanation targeted strictly at the diagnosed misconception, featuring core formula/law key takeaway boxes. | **Must have** | The product is pointless without remediation. If the student is diagnosed but not given a concise, bite-sized conceptual explanation to fix their mental model, no learning takes place. |
| **Explain-Back Active Recall Input** *(FR-04, SCR-04)* | Text input interface prompting students to explain the concept back in their own simple words (Feynman technique) with word-count guidance (min. 20 words). | **Must have** | Heart of active learning. Passive reading does not verify comprehension; forcing active recall synthesis is required to expose whether the student truly understands the rule. |
| **AI Explain-Back Evaluation & 1-Retry Loop** *(FR-05, SCR-04)* | Automated evaluation checking student explanation against predefined required understanding points; returns `UNDERSTOOD` or `NEEDS_CLARIFICATION` with 1 targeted hint and 1 retry. | **Must have** | Closes the comprehension feedback loop. Without automated evaluation and guided correction, the student has no feedback on whether their explanation was accurate. |
| **Parallel Reassessment Verification** *(FR-06, FR-11, SCR-05, SCR-06)* | Serves 1 fresh parallel past-exam question testing the identical objective; marks gap as `PROVISIONALLY_RESOLVED` if passed or `PERSISTENT_GAP` if failed. | **Must have** | Provides empirical proof of gap closure. Without testing on a fresh question, neither the student nor the parent can verify whether the intervention transferred to exam problem-solving. |
| **Parent Detailed Web Evidence Report** *(FR-07, SCR-08)* | Secure, non-guessable, read-only tokenized web report displaying audit trail of failed questions, student explanation, AI scores, and tutor advice without requiring parent login. | **Should have** | Critical for parental visibility and willingness to pay, but the student-facing learning loop can function and be validated in a 5-day test without the standalone web dashboard. |
| **WhatsApp Progress Summary Delivery** *(FR-07, FR-09, SCR-07)* | Automated dispatch of structured exam readiness alerts directly to the parent's WhatsApp with key metrics (gaps identified, resolved, persistent) and web report link. | **Should have** | Highest-engagement parent channel in Nigeria, but can be semi-automated or sent manually via templated messages during a 5-day prototype test. |
| **Low-Bandwidth / Text-First Mode** *(FR-08, SCR-01, SCR-02)* | Global toggle switch and text-only fallback stripping non-essential diagrams and media to operate smoothly on slow 2G/3G mobile data without data drain. | **Should have** | Essential for data-conscious Nigerian candidates, but the core learning loop remains functional on standard connectivity if initial web assets are kept lightweight. |
| **Asynchronous Session Recovery & Local Caching** *(FR-10, SCR-01, SCR-04)* | Auto-saves active quiz progress and Explain-Back drafts to browser `localStorage` to prevent data loss during network drops or accidental page reloads. | **Should have** | Important for device and network resilience, but a student completing a continuous 5-to-7-minute session does not strictly depend on persistence. |
| **Secondary Formative Rubric Scoring & Badges** *(FR-05, SCR-04, SCR-08)* | Formative feedback cards showing scores for Simplicity (/10), Conceptual Accuracy (/10), Analogies (/10), Composite (/100), and Gold/Silver/Bronze tiers. | **Should have** | Helpful motivation and granular feedback, but binary `UNDERSTOOD` vs `NEEDS_CLARIFICATION` drives the actual progression logic. |
| **Audio Voice Snippet Player in Micro-Lesson** *(FR-03, SCR-03)* | Embedded 45-second pre-recorded audio snippet player providing a spoken alternative to reading the conceptual micro-lesson. | **Could have** | Beneficial for auditory learners or fatigued students, but the plain-text micro-lesson achieves the identical conceptual outcome. |
| **Audio Voice-Note Dictation for Explain-Back** *(FR-12, SCR-04)* | Speech-to-text recording interface allowing students to dictate their Explain-Back response via voice note instead of typing on a virtual keyboard. | **Could have** | High convenience on mobile devices, but text area input is already universal, functional, and simpler to evaluate reliably. |
| **Human Tutor Escalation Prompt** *(FR-13, SCR-06, SCR-08)* | One-click CTA button on persistent gaps allowing students or parents to dispatch a tutoring request with the exact diagnostic record pre-attached. | **Could have** | High commercial monetization potential, but requires external human tutor network operations not required to validate the AI learning loop. |
| **Gamified Mastery Streaks & Milestone Badges** *(FR-14, SCR-01, SCR-06)* | Persistent streak counter displaying consecutive closed gaps (e.g., "🔥 3 Gaps Closed") to incentivize daily student study stamina. | **Could have** | Boosts long-term retention and engagement, but adds zero value to fixing the immediate conceptual misunderstanding during the 5-day build. |
| **PDF Scorecard Export / Download** *(SCR-08)* | Client-side button enabling parents to save or print a clean 1-page PDF summary of the web evidence report. | **Could have** | Convenient for offline record-keeping, but parents can already bookmark or view the live web link directly on their smartphones. |
| **Automated Recurring Card Subscriptions** *(FR-15)* | Automated recurring monthly credit/debit card billing infrastructure via Paystack or Flutterwave. | **Won't have (this build)** | Explicitly out of scope; initial validation will use manual bank transfers, one-off diagnostic tokens (₦1,000), or flat exam fees before building billing engines. |
| **School / Institutional Multi-Teacher Portal** *(FR-16)* | B2B administrative dashboards, teacher grading tools, classroom roster synchronization, or PTA school reporting. | **Won't have (this build)** | Explicitly out of scope; selling to schools introduces long sales cycles; product is strictly direct-to-consumer (students & parents). |
| **Comprehensive Full-Length Mock CBT Simulation Engine** *(FR-17)* | 400-question timed mock exam simulation with negative marking and countdown timers. | **Won't have (this build)** | Explicitly out of scope; incumbents like TestDriller own offline drill; TalkPDF is an active intervention tool triggered after questions are failed. |
| **Extensive Video Lesson Library** *(FR-18)* | Heavy multi-hour animated lecture series, video library streaming, and high-bandwidth multimedia courses. | **Won't have (this build)** | Explicitly out of scope; incumbents like uLesson and YouTube dominate video; TalkPDF is lightweight, text-first, diagnostic, and active-recall focused. |
| **Generic Document Chat / PDF Q&A** *(FR-19)* | Arbitrary PDF textbook upload and free-form chatbot Q&A. | **Won't have (this build)** | Explicitly out of scope; despite the legacy name, interactions must be strictly curriculum-anchored against official WAEC/JAMB syllabus objectives. |
| **Native iOS Mobile Application** *(PRD §5.5)* | Native Swift/iOS mobile application distributed via the Apple App Store. | **Won't have (this build)** | Explicitly out of scope; >95% of target Nigerian secondary students operate on Android or mobile web. |
| **Dynamic / Speculative AI Misconception Generation** *(PRD §5.7)* | Unconstrained LLM hallucination of student errors or claiming definitive misconception confirmation from one tap. | **Won't have (this build)** | Explicitly out of scope; answer options must be pre-tagged to vetted syllabus misconceptions to guarantee academic accuracy and avoid hallucinations. |
| **Multi-Turn Conversational AI Chatbot / Unlimited Retries** *(PRD §5.8)* | Open-ended Socratic dialogue, multi-turn conversational tutoring, or unrestricted Explain-Back retry loops. | **Won't have (this build)** | Explicitly out of scope; the interaction is strictly bounded to 1 targeted hint and 1 retry to keep tokens, latency, and session times tightly controlled. |
| **Parent Account Registration & Password Authentication** *(PRD §5.11)* | User sign-up, login, password resets, and session management for parents. | **Won't have (this build)** | Explicitly out of scope; eliminates onboarding friction by utilizing secure, non-guessable, read-only tokenized web links. |
| **Permanent Mastery Certification from a Single Question** *(PRD §5.10)* | Certifying permanent topic mastery after one correct parallel reassessment answer. | **Won't have (this build)** | Explicitly out of scope; pedagogy dictates classifying as `PROVISIONALLY_RESOLVED` pending scheduled 7-day spaced reassessment. |

---

## 3. Must-Have Triage & Cut Analysis (5-Day Team Build Cap)

In the initial PRD specification ([requirements.md](file:///c:/Users/HomePC/Documents/Talkpdf/requirements.md)), **7 features** were classified under priority "Must":
1. FR-01: Curriculum-Linked Diagnostic Quiz
2. FR-02: Root-Cause Misconception Diagnosis
3. FR-03: Targeted Micro-Intervention
4. FR-04: Explain-Back Active Recall Input
5. FR-05: Explain-Back AI Evaluation
6. FR-06: Parallel Reassessment Verification
7. FR-07: Parent Readiness Scorecard & Report

To comply with the strict **5-to-6 feature maximum for a 5-day team build**, the following triage rules were applied:

### Which Feature Was Cut First and Why?
* **Cut #1: FR-07 (Parent Readiness Scorecard & Detailed Web Evidence Report / SCR-08)**
  * **Moved to:** **Should Have**
  * **Rationale:** The fundamental existential risk of TalkPDF is whether the student learning-resolution loop (`FR-01` through `FR-06`) actually identifies misconceptions, forces synthesis, and empirically closes gaps on low-end mobile devices. If this core loop fails, parent reporting is reporting on meaningless data. Furthermore, developing a secure tokenized web report (`SCR-08`), responsive layout, and audit trail takes significant frontend and backend bandwidth. For a 5-day validation pilot, parent progress can be communicated via manual WhatsApp messages or simple text exports without impacting student loop validation.

### Which Feature to Cut Next if Further Reductions Are Required?
* **Cut #2 (Contingency for a 5-Feature Build): Explain-Back Guided 1-Retry Loop (FR-05 sub-feature)**
  * **Action:** Simplify `FR-05` into a **single-pass AI evaluation** (Understood vs. Not Understood) without the secondary hint generator and retry branch.
  * **Rationale:** Building prompt templates for dynamic hint generation and state-machine retry loops adds conditional complexity. Cutting the retry branch preserves the entire end-to-end chain (`Quiz → Diagnosis → Lesson → Explain-Back → Parallel Reassessment`) while reducing engineering hours by ~20%.
* **Cut #3 (Extreme Contingency): Parallel Reassessment Verification (FR-06)**
  * **Action:** Move `FR-06` to Should Have, ending the MVP loop at the AI Explain-Back evaluation.
  * **Rationale:** While empirically validating gap closure via a fresh question is a key differentiator, a pure 5-day prototype could end after Explain-Back to prove student willingness to engage in synthesis. However, this is strongly discouraged as it removes objective validation of learning transfer.

---

## 4. Feature Distribution Summary

* **Must Have:** 6 features (23%) — *Core learning-resolution loop: Assess, Diagnose, Lesson, Explain-back, Evaluate, Verify*
* **Should Have:** 5 features (19%) — *Parent reporting, WhatsApp summary, low-data toggle, local caching, secondary rubric scores*
* **Could Have:** 5 features (19%) — *Voice dictation, voice lesson player, tutor escalation button, streak badges, PDF export*
* **Won't Have (This Build):** 10 features (39%) — *Out-of-scope enterprise/CBT/billing/video features to protect focus*
* **Total Tracked Features:** 26 features (100%)
