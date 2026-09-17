Locked scope: no changes until Section 12.

# TalkPDF — Locked Scope Specification

**Date:** 16 September 2026  
**Status:** Locked & Approved for 5-Day Team Build  
**Sprint Target:** Minimum Viable Learning-Resolution Loop (SS3 WAEC/JAMB)  
**Source Document:** [final-feature-list.md](file:///c:/Users/HomePC/Documents/Talkpdf/final-feature-list.md)

---

## 1. Scope Lock Statement

> **Locked scope: no changes until Section 12.**  
> The features listed below represent the non-negotiable core contract for the 5-day team build sprint. No additional features, scope creep, or secondary enhancements may be added to this build target until Section 12 milestone completion is formally verified.

---

## 2. Locked Must-Have Features Table

| Feature | Description | MoSCoW Category | Reason |
| :--- | :--- | :--- | :--- |
| **Curriculum-Linked Diagnostic Assessment** *(FR-01, SCR-01, SCR-02)* | 5-question past-exam diagnostic quiz linked to WAEC/JAMB syllabus objectives with topic selection and pre-tagged misconception answer options. | **Must have** | The product is broken without it. Without targeted questions mapped to curriculum objectives, the system cannot detect where a student's conceptual misunderstanding lies. |
| **Root-Cause Misconception Diagnosis** *(FR-02, SCR-03)* | Automatically isolates and presents the probable conceptual gap when an incorrect option is chosen, framed as a likely misconception rather than a definitive claim. | **Must have** | Core value differentiator. Standard drill software only tells a student *what* is wrong; identifying *why* (the specific misconception) is the prerequisite for targeted remediation. |
| **Targeted Conceptual Micro-Intervention** *(FR-03, SCR-03)* | Delivers a focused, 60–90 second plain-English explanation targeted strictly at the diagnosed misconception, featuring core formula/law key takeaway boxes. | **Must have** | The product is pointless without remediation. If the student is diagnosed but not given a concise, bite-sized conceptual explanation to fix their mental model, no learning takes place. |
| **Explain-Back Active Recall Input** *(FR-04, SCR-04)* | Text input interface prompting students to explain the concept back in their own simple words (Feynman technique) with word-count guidance (min. 20 words). | **Must have** | Heart of active learning. Passive reading does not verify comprehension; forcing active recall synthesis is required to expose whether the student truly understands the rule. |
| **AI Explain-Back Evaluation & 1-Retry Loop** *(FR-05, SCR-04)* | Automated evaluation checking student explanation against predefined required understanding points; returns `UNDERSTOOD` or `NEEDS_CLARIFICATION` with 1 targeted hint and 1 retry. | **Must have** | Closes the comprehension feedback loop. Without automated evaluation and guided correction, the student has no feedback on whether their explanation was accurate. |
| **Parallel Reassessment Verification** *(FR-06, FR-11, SCR-05, SCR-06)* | Serves 1 fresh parallel past-exam question testing the identical objective; marks gap as `PROVISIONALLY_RESOLVED` if passed or `PERSISTENT_GAP` if failed. | **Must have** | Provides empirical proof of gap closure. Without testing on a fresh question, neither the student nor the parent can verify whether the intervention transferred to exam problem-solving. |

---

## 3. Scope Boundary Enforcement

* **Total Locked Features:** 6
* **Engineering Commit:** Any request to expand functionality beyond these 6 items is deferred to Phase 2 (Post-Section 12).
* **Contingency Rule:** If unexpected blockers arise during the sprint, `FR-05` may be simplified to a single-pass evaluation (cutting the 1-retry loop) to preserve the remaining 5 features without missing the day-5 deployment deadline.
