// TalkPDF — End-to-End Diagnostic Assessment Test Runner
const { CURRICULUM_DATA } = require('./data/curriculum-data.js');

console.log('=== RUNNING TALKPDF DIAGNOSTIC ASSESSMENT E2E TESTS ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
    process.exitCode = 1;
  }
}

// Test 1: Curriculum Coverage
assert(CURRICULUM_DATA.objectives.length >= 4, 'Includes at least 4 core subject objectives');
const subjects = CURRICULUM_DATA.objectives.map(o => o.subject);
assert(subjects.includes('Physics'), 'Includes Physics');
assert(subjects.includes('Chemistry'), 'Includes Chemistry');
assert(subjects.includes('Biology'), 'Includes Biology');
assert(subjects.includes('Mathematics'), 'Includes Mathematics');

// Test 2: Exam Types
const exams = CURRICULUM_DATA.objectives.map(o => o.exam_type);
assert(exams.includes('WAEC'), 'Includes WAEC syllabus objectives');
assert(exams.includes('JAMB'), 'Includes JAMB syllabus objectives');

// Test 3: Faraday Law Objective
const phyObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'PHY-EM-01');
assert(phyObj !== undefined, 'Physics Faraday Law objective exists');
assert(phyObj.questions.length === 5, 'Faraday Law objective contains exactly 5 diagnostic questions');

// Test 4: Simulation of 5-Question Quiz with 1 Failed Question (Misconception Isolation)
console.log('\n--- Simulating Student Taking Quiz (Selecting 1 Misconception on Q1) ---');
const responses = [];

// Q1: Choose Option A (Incorrect: "Confusing Static Magnetic Field with Changing Flux")
const q1 = phyObj.questions[0];
const chosenOpt1 = q1.options.find(o => o.option_letter === 'A');
assert(chosenOpt1.is_correct === false, 'Q1 Option A is an incorrect distractor');
assert(chosenOpt1.likely_misconception_title === 'Confusing Static Magnetic Field with Changing Flux', 'Q1 Option A has pre-tagged misconception title');
assert(chosenOpt1.likely_misconception_explanation.length > 20, 'Q1 Option A has cognitive explanation');
responses.push({
  question_id: q1.question_id,
  selected_option: 'A',
  is_correct: chosenOpt1.is_correct,
  gap_title: chosenOpt1.likely_misconception_title,
  gap_explanation: chosenOpt1.likely_misconception_explanation
});

// Q2 - Q5: Choose Correct Options
for (let i = 1; i < 5; i++) {
  const q = phyObj.questions[i];
  const correctOpt = q.options.find(o => o.option_letter === q.correct_option);
  assert(correctOpt.is_correct === true, `Q${i+1} correct option matches correct_option flag`);
  responses.push({
    question_id: q.question_id,
    selected_option: q.correct_option,
    is_correct: true,
    gap_title: null,
    gap_explanation: null
  });
}

// Evaluate Responses
let correctCount = 0;
let primaryFailed = null;
responses.forEach((resp, i) => {
  if (resp.is_correct) {
    correctCount++;
  } else if (!primaryFailed) {
    primaryFailed = {
      response: resp,
      question: phyObj.questions[i],
      index: i
    };
  }
});

assert(correctCount === 4, 'Score is correctly calculated as 4/5');
assert(primaryFailed !== null, 'Failed question is isolated');
assert(primaryFailed.index === 0, 'First failed question is Q1');
assert(primaryFailed.response.gap_title === 'Confusing Static Magnetic Field with Changing Flux', 'Exact misconception title isolated for remediation handover');
assert(primaryFailed.question.correct_option === 'C', 'Identifies correct option C');

// Test 5: Perfect Score Scenario (5/5)
console.log('\n--- Simulating Student with 5/5 Perfect Score ---');
let perfectCount = 0;
phyObj.questions.forEach(q => {
  const opt = q.options.find(o => o.option_letter === q.correct_option);
  if (opt.is_correct) perfectCount++;
});
assert(perfectCount === 5, 'Perfect score path verifies 5/5 topic mastery');

console.log(`\n=== SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===`);
