# TalkPDF — Product Requirements Document (PRD)

**Document Version:** 1.1.0  
**Status:** Approved for Build / Prototype  
**Author:** Product & Engineering (derived from YC Office Hours Session)  
**Date:** 15 September 2026  
**Target Milestone:** Minimum Viable Learning-Resolution Loop (SS3 WAEC/JAMB)

---

## 1. Problem Statement

Nigerian secondary school students preparing for high-stakes WAEC/WASSCE and JAMB exams face severe exam anxiety and the risk of losing a full gap year, yet standard revision tools (past-question booklets, offline CBT drill software, and uncalibrated evening lesson centers) only deliver passive "Question → Answer" scoring. They tell a student *what* they got wrong, but never isolate the underlying conceptual misconception, force active comprehension, or verify whether the gap was actually closed. Concurrently, parents spend substantial household income on exam fees and private lessons with zero objective visibility into their child's real subject mastery, discovering unresolved learning gaps only after failure results are published.

### Core MVP Learning-Resolution Loop Flow
The MVP flow is kept intentionally simple and focused to validate manually with real SS3 students before adding unnecessary complexity:

```text
ASSESS → IDENTIFY LIKELY GAP → TARGETED INTERVENTION → EXPLAIN-BACK → AI EVALUATION → ONE RETRY IF NEEDED → PARALLEL QUESTION → PROVISIONALLY RESOLVED / PERSISTENT GAP → PARENT UPDATE
```

---

## 2. Target Users

### Primary End User: The SS3 Exam Candidate (Student)
- **Profile:** Nigerian senior secondary school student (SS3), typically aged 15–18, preparing for WAEC/WASSCE and/or JAMB (UTME).
- **Environment & Constraints:** Uses an entry-level Android smartphone (e.g., Tecno, Infinix, or shared parent phone); operates on metered, intermittent 3G/4G mobile data; studies in noisy household environments; experiences high mental fatigue after long school hours.
- **Job-to-be-Done (JTBD):** *"When I fail a past question, help me quickly understand the exact concept I misunderstood and prove I know it so I don't fail that topic on exam day."*

### Primary Economic Buyer: The Parent / Guardian
- **Profile:** Working- or middle-class Nigerian parent who finances exam registration (₦35,000+), extra lessons, and phone data.
- **Environment & Constraints:** Skeptical of screen time and smartphone distractions; demands tangible proof that money spent on academic support translates into exam readiness.
- **Job-to-be-Done (JTBD):** *"Give me verifiable, clear proof that my child is actively studying, closing their weak areas, and actually prepared to pass their exams."*

---

## 3. Functional Requirements (FR)

| ID | Feature | Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Curriculum-Linked Diagnostic Quiz** | Short, 5-question diagnostic assessments linked to specific WAEC/JAMB syllabus objectives (e.g., Physics: Electromagnetism; Chemistry: Organic reactions), where each incorrect answer option is pre-tagged with a likely misconception. [Founder decision] | **Must** |
| **FR-02** | **Root-Cause Misconception Diagnosis** | When a student selects an incorrect answer option, the system identifies the associated likely learning gap (framed as a probable misconception rather than definitively confirmed). [Founder decision] | **Must** |
| **FR-03** | **Targeted Micro-Intervention** | Delivers a bite-sized, 60–90 second plain-English conceptual explanation or voice snippet targeted strictly at the identified likely misconception. | **Must** |
| **FR-04** | **Explain-Back Active Recall Input** | Prompts the learner to explain the concept back in their own words via text input (with optional audio voice-note upload), allowing one retry with a targeted hint if clarification is needed. [Founder decision] | **Must** |
| **FR-05** | **Explain-Back AI Evaluation** | Hybrid human-defined + AI evaluation checks student explanation against predefined required-understanding points for that objective; returns `UNDERSTOOD` or `NEEDS_CLARIFICATION` with 1 targeted hint and 1 retry on clarification. Preserves Simplicity /10, Accuracy /10, Analogies /10, Overall /100, and Gold/Silver/Bronze badges as secondary feedback signals (not used alone to determine mastery). [Founder decision] | **Must** |
| **FR-06** | **Parallel Reassessment Verification** | Serves one fresh parallel question targeting the same learning objective: if answered correctly, gap is marked `PROVISIONALLY_RESOLVED` (allowing future reassessment to confirm or reopen); if incorrect, marked `PERSISTENT_GAP`. Does not claim permanent mastery from a single question. [Founder decision] | **Must** |
| **FR-07** | **Parent Readiness Scorecard & Report** | Generates parent visibility deliverables: a concise WhatsApp progress summary (showing gaps identified, gaps provisionally resolved, gaps requiring further support, and reassessment progress) and an optional private, non-guessable, read-only, revocable web report with detailed evidence, without exposing unnecessary student data or requiring parent login. [Founder decision] | **Must** |
| **FR-08** | **Low-Bandwidth / Text-First Mode** | Fully functional text-only fallback for all prompts, micro-lessons, and Explain-Back inputs to operate seamlessly on slow 2G/3G networks without data drain. | **Should** |
| **FR-09** | **WhatsApp Progress Summary Delivery** | Sends a short progress update directly through WhatsApp (gaps identified, provisionally resolved, requiring further support, reassessment progress) with an optional secure, read-only link to the detailed web report. [Founder decision] | **Should** |
| **FR-10** | **Asynchronous Session Recovery** | Automatically caches incomplete Explain-Back sessions locally so a student does not lose progress if the network drops or the browser closes. | **Should** |
| **FR-11** | **Persistent Gap Flagging** | Flags learning gaps as `PERSISTENT_GAP` when the fresh parallel reassessment question is answered incorrectly, routing them for further targeted human/tutor support. [Founder decision] | **Should** |
| **FR-12** | **Audio Voice-Note Dictation** | Speech-to-text integration allowing students to record a quick audio voice note for their Explain-Back response when typing is inconvenient. | **Could** |
| **FR-13** | **Human Tutor Escalation Prompt** | A simple button on persistent gaps allowing the parent/student to request human tutor assistance with the exact diagnosis pre-attached. | **Could** |
| **FR-14** | **Gamified Mastery Streaks** | Simple badges or streaks celebrating consecutive learning gaps closed to incentivize daily student stamina. | **Could** |
| **FR-15** | **Automated Recurring Card Subscriptions** | Recurring monthly debit card billing integration via Paystack/Flutterwave. | **Won't** |
| **FR-16** | **School / Institutional Multi-Teacher Portal** | Institutional B2B administrative dashboards, classroom roster sync, or PTA reporting. | **Won't** |
| **FR-17** | **Comprehensive Full-Length Mock CBT Engine** | 400-question timed mock exam simulation engines (students continue using TestDriller for timed drill). | **Won't** |
| **FR-18** | **Extensive Video Lesson Library** | Heavy animated lecture libraries and multi-hour video courses (students continue using uLesson/YouTube). | **Won't** |
| **FR-19** | **Generic Document Chat (PDF Q&A)** | Unstructured arbitrary PDF file upload and free-form chatbot Q&A. | **Won't** |

---

## 4. User Stories

### Student Stories (End User)
- **US-01 (Targeted Diagnostic):** *As an SS3 student preparing for WAEC Physics*, I want to take a quick 5-question test on a specific topic, *so that* I can pinpoint exactly what concept I am confusing instead of solving 50 questions blindly.
- **US-02 (Conceptual Explanation):** *As an SS3 student who got a question wrong*, I want the system to identify my likely misconception and give a concise explanation of the rule I missed, *so that* I can immediately correct my thinking.
- **US-03 (Explain-Back Synthesis):** *As an SS3 student*, I want to explain the concept back in my own simple words and receive an `UNDERSTOOD` or `NEEDS_CLARIFICATION` evaluation against required understanding points (with secondary feedback scores and a hint/retry if needed), *so that* I know if I truly grasp the concept.
- **US-04 (Low-Data Accessibility):** *As a student with limited mobile data*, I want to complete the diagnostic and Explain-Back using text messages or minimal data, *so that* I don't run out of data bundles halfway through my study session.
- **US-05 (Reassessment Confirmation):** *As an SS3 student*, I want to immediately answer a fresh parallel past question on that topic, *so that* I can mark the gap as `PROVISIONALLY_RESOLVED` or identify it as a `PERSISTENT_GAP` requiring further support.

### Parent Stories (Economic Buyer)
- **US-06 (Visible Accountability):** *As an anxious parent paying for WAEC/JAMB registration*, I want to receive a concise WhatsApp progress summary (showing gaps identified, provisionally resolved, requiring further support, and reassessment progress) with an optional private web report link, *so that* I have verifiable proof my child is studying effectively without needing a login account.
- **US-07 (Targeted Tutoring Decisions):** *As a parent considering hiring a lesson teacher*, I want to see the specific `PERSISTENT_GAP` topics my child cannot resolve with AI, *so that* I can instruct a tutor to focus strictly on those topics instead of paying for unnecessary hours.

---

## 5. Explicit Out-of-Scope List (What This Product Will NOT Do in This Build)

To protect team focus, maintain velocity, and validate the core learning loop before capital expenditure, the following items are strictly **OUT OF SCOPE** for this initial release:

1. **No Institutional / School B2B Software:**
   - No teacher management portals, no principal oversight dashboards, no school fee integration, and no classroom roster synchronization. We sell exclusively to consumer parents and learners.
2. **No Arbitrary PDF Document Chatting:**
   - Despite the legacy name "TalkPDF", the product will NOT be a generic "upload any textbook PDF and chat with it" tool. All interactions are structured against the official WAEC/JAMB curriculum objectives.
3. **No Heavy Animated Video Production:**
   - We will not spend time or capital filming or animating multi-hour lecture series. Incumbents like uLesson already do this. Our focus is purely diagnostic, micro-intervention, and active-recall verification.
4. **No 400-Question Timed CBT Simulation Engine:**
   - We are not building a full-length mock exam simulator with timers and negative marking. Incumbents like TestDriller own offline drill; we take the student *after* they fail a question.
5. **No Native iOS App:**
   - Over 95% of the target demographic in Nigeria operates on Android or mobile web. We will build exclusively for Mobile Web / PWA / WhatsApp.
6. **No Automated Recurring Card Subscription Infrastructure:**
   - No complex recurring debit subscription architecture. Initial pilots will validate willingness to pay via manual bank transfers, one-off diagnostic tokens (₦1,000), or flat exam-pass fees (₦5,000) before building automated billing engines.
7. **No Dynamic / Speculative AI Misconception Generation & No Claim of Definitive Confirmation:**
   - Incorrect options are pre-mapped to likely misconceptions at authoring time; the system identifies the associated *likely* learning gap rather than dynamically inferring or claiming a misconception is definitively confirmed.
8. **No Multi-Turn Conversational AI Tutoring or Unlimited Retries:**
   - Explain-Back evaluation is strictly structured against predefined required-understanding points with a maximum of one retry and a targeted hint. No open-ended conversational chatbot or multi-turn Socratic dialogue in this build.
9. **No Determining Mastery Exclusively from Secondary Scores:**
   - Secondary Explain-Back rubric scores (Simplicity /10, Accuracy /10, Analogies /10, Overall /100, Gold/Silver/Bronze) are for formative feedback only and must not be used alone to determine learning gap closure.
10. **No Permanent Mastery Guarantee from a Single Question:**
    - A single fresh parallel question only classifies a gap as `PROVISIONALLY_RESOLVED` or `PERSISTENT_GAP`. The system will not certify permanent topic mastery from one question; future reassessment is required to confirm or reopen the gap.
11. **No Parent Account Creation / Authentication Portals & No Guessable Public Reports:**
    - No parent user accounts, passwords, or authentication portals. Private web report links must be non-guessable, read-only, revocable, and must not expose unnecessary student personal data.

---

## 6. Unclear or Missing Information (Blocking Must-Haves)

All previously identified blocking architectural and workflow questions have been formalized into the MVP specification via founder decisions (see Section 7: Founder Decisions Log). No blocking unclear items remain for this milestone.

---

## 7. Founder Decisions Log

*Logged on 15 September 2026*

| # | Question | Decision | Applies to |
| :--- | :--- | :--- | :--- |
| 1 | **Learning-Gap Diagnosis:** How does the system map an incorrect option to a specific misconception? | Pre-tagged likely misconceptions attached to answer options (Option A). When an incorrect answer is selected, system flags the associated likely learning gap rather than claiming the misconception is definitively confirmed. Dynamic AI generation is out of scope. | FR-01, FR-02 |
| 2 | **Explain-Back Evaluation:** What threshold or evaluation logic determines whether a student's explanation is accepted? | Hybrid human-defined + AI evaluation (Option B + A). For each objective, predefined required-understanding points are evaluated by AI, returning `UNDERSTOOD` or `NEEDS_CLARIFICATION` with 1 targeted hint and 1 retry. Secondary scores (Simplicity /10, Accuracy /10, Analogies /10, Overall /100, Gold/Silver/Bronze) are preserved as feedback signals but do not alone determine mastery. | FR-04, FR-05 |
| 3 | **Gap-Closure Verification:** When is a learning gap considered fixed, and does a single parallel question suffice? | One fresh parallel question (Option A). If correct → `PROVISIONALLY_RESOLVED`. If wrong → `PERSISTENT_GAP`. Does not claim permanent mastery from one correct answer; allows future reassessment to confirm or reopen the gap. | FR-06, FR-11 |
| 4 | **Parent Scorecard Distribution:** How does a parent access the scorecard without a full parent account/authentication system? | WhatsApp summary + private web report (Option B + A). WhatsApp summary shows: gaps identified, gaps provisionally resolved, gaps requiring further support, and reassessment progress. Private web report link must be non-guessable, read-only, revocable, and expose no unnecessary student information. | FR-07, FR-09 |
