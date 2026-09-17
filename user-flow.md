# TalkPDF — End-to-End User Flow

**Document Version:** 1.0.0  
**Target Milestone:** Minimum Viable Learning-Resolution Loop (SS3 WAEC/JAMB)  
**Date:** 15 September 2026  
**Reference Document:** [requirements.md](file:///c:/Users/HomePC/Documents/Talkpdf/requirements.md)

---

## 1. Flow Overview & Architecture

The TalkPDF MVP operationalizes the learning-resolution loop for Nigerian SS3 exam candidates preparing for WAEC/WASSCE and JAMB, with verifiable visibility for paying parents.

### Core Loop Pipeline
```text
ASSESS → IDENTIFY LIKELY GAP → TARGETED INTERVENTION → EXPLAIN-BACK → AI EVALUATION → ONE RETRY IF NEEDED → PARALLEL QUESTION → PROVISIONALLY RESOLVED / PERSISTENT GAP → PARENT UPDATE
```

```mermaid
flowchart TD
    A[1. Entry & Topic Selection] --> B[2. Diagnostic Quiz (5 Questions)]
    B --> C{Any Option Incorrect?}
    C -- No (5/5 Correct) --> M[Topic Verified / No Gap Found]
    C -- Yes --> D[3. Identify Likely Learning Gap]
    D --> E[4. Targeted Micro-Intervention (60-90s)]
    E --> F[5. Explain-Back Active Recall Input]
    F --> G[6. Hybrid AI Evaluation]
    G --> H{Evaluation Result}
    H -- UNDERSTOOD --> J[8. Parallel Past-Exam Question]
    H -- NEEDS_CLARIFICATION --> I[7. Targeted Hint & 1 Retry]
    I --> J
    J --> K{Parallel Question Result}
    K -- Correct --> L[9A. Status: PROVISIONALLY_RESOLVED]
    K -- Incorrect --> N[9B. Status: PERSISTENT_GAP]
    L --> O[10. Generate Scorecard & WhatsApp Update]
    N --> P[Tutor Escalation Prompt]
    N --> O
    O --> Q[11. Parent Receives WhatsApp Summary & Secure Web Link]
```

---

## 2. Step-by-Step User Flow

### Phase 1: Diagnostic Assessment

#### Step 1: Entry & Syllabus Objective Selection
* **Actor:** SS3 Candidate (Student)
* **Action:** Student opens the TalkPDF mobile web app (or WhatsApp/PWA entry point) on an entry-level smartphone. Student selects target exam (`WAEC` or `JAMB`), subject (e.g., `Physics`), and a specific syllabus objective (e.g., `Electromagnetism: Faraday's Law`).
* **System Logic:** System loads the relevant 5-question curriculum diagnostic module (`FR-01`). Initializes local storage cache for offline/asynchronous session recovery (`FR-10`).
* **System State:** `SESSION_INITIALIZED` → `DIAGNOSTIC_ACTIVE`.

#### Step 2: Diagnostic Quiz Completion
* **Actor:** Student
* **Action:** Student answers 5 multiple-choice past-exam questions linked to the objective.
* **System Logic:** System records selected options against pre-tagged question metadata. Text-only lightweight payload ensures zero data lag on 2G/3G connections (`FR-08`).
* **System State:** `DIAGNOSTIC_SUBMITTED`.

---

### Phase 2: Diagnosis & Micro-Intervention

#### Step 3: Likely Learning-Gap Identification
* **Actor:** System (Automated)
* **Action / Presentation:** When a student selects an incorrect answer option, the system isolates the specific pre-tagged misconception mapped to that choice (`FR-02`).
* **Display:** System displays:
  * Question result (`Incorrect`).
  * The identified likely misconception (framed explicitly as a *probable learning gap* rather than an unverified definitive diagnosis).
  * Example: *"Likely Gap Identified: Confusing magnetic flux with rate of change of magnetic flux."*
* **System State:** `LIKELY_GAP_IDENTIFIED`.

#### Step 4: Targeted Micro-Intervention
* **Actor:** Student & System
* **Action:** Student consumes a bite-sized, 60–90 second plain-English conceptual micro-lesson strictly addressing the identified misconception (`FR-03`).
* **Format:** Rendered as concise text and key diagram formulas, with optional low-bandwidth voice snippet. No multi-hour video lectures or generic PDF dumps (`FR-08`, `FR-18`, `FR-19`).
* **System State:** `INTERVENTION_CONSUMED`.

---

### Phase 3: Active Recall (Explain-Back Loop)

#### Step 5: Explain-Back Input
* **Actor:** Student
* **Action:** The system prompts the student: *"Now explain this concept in your own words so a classmate in SS1 could understand it."* Student types their explanation into the response box (or uses audio voice-note dictation, `FR-04`, `FR-12`).
* **Data Resilience:** Draft text is cached locally in real time so dropped connections do not lose progress (`FR-10`).
* **System State:** `EXPLAIN_BACK_SUBMITTED`.

#### Step 6: Hybrid AI Evaluation
* **Actor:** System (Automated AI Engine)
* **Action / Logic:** The AI evaluates the explanation against predefined human-curated required-understanding points for that syllabus objective (`FR-05`).
* **Outputs:**
  1. **Primary Mastery Gate:** Evaluates to either `UNDERSTOOD` or `NEEDS_CLARIFICATION`.
  2. **Secondary Feedback Signals (Preserved for Motivation):**
     * Simplicity Score: `/10`
     * Conceptual Accuracy Score: `/10`
     * Use of Analogies / Examples: `/10`
     * Overall Synthesis Score: `/100`
     * Badge Tier: `Gold`, `Silver`, or `Bronze`
  *(Note: Secondary scores provide qualitative feedback but cannot override the primary gate).*
* **Branching:**
  * If `UNDERSTOOD` → Advance directly to **Step 8**.
  * If `NEEDS_CLARIFICATION` → Advance to **Step 7**.

#### Step 7: Targeted Hint & Single Retry (Conditional Branch)
* **Actor:** Student & System
* **Trigger:** Explanation returned `NEEDS_CLARIFICATION`.
* **System Logic:** System generates a single, targeted conceptual hint highlighting the missing required-understanding point without giving away the exact formula (`FR-04`, `FR-05`).
* **Action:** Student receives exactly **one retry** to refine their explanation.
* **Outcome:** System records the second attempt. Regardless of whether the second attempt passes or requires further help, the session immediately advances to empirical testing (**Step 8**). No infinite chatbot loops permitted.
* **System State:** `RETRY_EVALUATED` → `READY_FOR_REASSESSMENT`.

---

### Phase 4: Empirical Reassessment & Gap Closure

#### Step 8: Parallel Reassessment Question
* **Actor:** Student
* **Action:** The system automatically serves one fresh, parallel past-exam question testing the identical syllabus objective (`FR-06`).
* **Student Input:** Student solves the parallel question and submits their answer.
* **System State:** `PARALLEL_ANSWER_SUBMITTED`.

#### Step 9: Learning-Gap Status Resolution
* **Actor:** System (Automated)
* **Logic & State Transitions:**
  * **Option A (Correct Answer):** Gap status is set to `PROVISIONALLY_RESOLVED`. The system marks the concept as tentatively closed, updates the student's mastery streak (`FR-14`), and logs the topic for future reassessment confirmation.
  * **Option B (Incorrect Answer):** Gap status is set to `PERSISTENT_GAP` (`FR-11`). The system displays a human tutor escalation button (`FR-13`) pre-populated with the exact diagnostic trace.
* **Mastery Integrity Rule:** A single question never grants permanent mastery; it certifies provisional resolution only.

---

### Phase 5: Parent Visibility & Accountability

#### Step 10: Scorecard & Report Generation
* **Actor:** System (Automated)
* **Action:** The system aggregates the session data into two synchronized deliverables (`FR-07`, `FR-09`):
  1. **WhatsApp Progress Summary Message:** A structured, plain-text mobile update containing:
     * Student Name & Subject Topic
     * Number of Gaps Identified
     * Gaps Provisionally Resolved
     * Gaps Requiring Further Support (`PERSISTENT_GAP`)
     * Reassessment Status & Readiness Index ($X \to Y$)
     * Secure Web Report Link
  2. **Private Web Report Page:** A secure, read-only, non-guessable, revocable URL detailing question-by-question evidence, Explain-Back evaluations, and tutor escalation notes without exposing sensitive student PII or requiring parent login.
* **System State:** `PARENT_REPORT_GENERATED`.

#### Step 11: Parent Review & Tutoring Action
* **Actor:** Primary Economic Buyer (Parent / Guardian)
* **Action:** Parent receives the WhatsApp message on their personal device.
  * Parent immediately sees verifiable evidence of study time and gaps closed.
  * If desired, parent taps the secure web link to inspect full details.
  * If a `PERSISTENT_GAP` is noted, parent uses the diagnostic summary to direct private evening lessons strictly to that concept, saving time and money.
* **Goal Achievement:**
  * **Student Goal Met:** Misconception diagnosed, actively explained, and empirically verified without wasting data.
  * **Parent Goal Met:** Objective proof of study accountability and targeted exam readiness.

---

## 3. State Transition Matrix

| Current State | Event / User Action | Next State | Deliverable / Screen |
| :--- | :--- | :--- | :--- |
| `IDLE` | Select exam & objective | `DIAGNOSTIC_ACTIVE` | 5-Question Quiz Screen |
| `DIAGNOSTIC_ACTIVE` | Submit incorrect option | `LIKELY_GAP_IDENTIFIED` | Likely Gap Diagnosis Card |
| `LIKELY_GAP_IDENTIFIED` | Complete 60–90s reading | `INTERVENTION_CONSUMED` | Explain-Back Prompt |
| `INTERVENTION_CONSUMED` | Submit explanation | `AI_EVALUATED` | Understood / Needs Clarification |
| `AI_EVALUATED` (`NEEDS_CLARIFICATION`) | Read hint & submit retry | `RETRY_COMPLETE` | Advance to Parallel Test |
| `AI_EVALUATED` (`UNDERSTOOD`) | Auto-advance | `PARALLEL_ACTIVE` | Fresh Parallel Question |
| `PARALLEL_ACTIVE` | Answer correctly | `PROVISIONALLY_RESOLVED` | Resolution Badge & Streak |
| `PARALLEL_ACTIVE` | Answer incorrectly | `PERSISTENT_GAP` | Persistent Gap Alert + Tutor Link |
| `RESOLVED` / `PERSISTENT` | Session complete | `PARENT_NOTIFIED` | WhatsApp Update & Secure Link |

---

## 4. Edge Cases & Fallback Paths

1. **Network Drop During Explain-Back:**
   * Text is saved locally in browser storage (`FR-10`). When connectivity resumes, the student resumes typing without loss.
2. **Audio Dictation Unintelligible:**
   * If audio speech-to-text fails due to background noise, the system gracefully falls back to direct text input without failing the cycle (`FR-08`, `FR-12`).
3. **Repeated Explain-Back Failure on Retry:**
   * System does not trap student in endless dialogue; it passes them directly to the parallel question. If the parallel question is missed, it cleanly logs `PERSISTENT_GAP` for human tutor escalation (`FR-11`, `FR-13`).
4. **Invalid / Expired Parent Link:**
   * Private report URLs are revocable. Expired or revoked links display a secure message directing the parent to request a refreshed link via their student's registered WhatsApp number.
