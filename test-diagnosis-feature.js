// TalkPDF — Feature #2: Root-Cause Misconception Diagnosis Test Suite
const { CURRICULUM_DATA } = require('./data/curriculum-data.js');

console.log('=== RUNNING FEATURE #2 ROOT-CAUSE MISCONCEPTION DIAGNOSIS TESTS ===\n');

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

// -------------------------------------------------------------
// Test Case 1: Physics Faraday Law Misconception Diagnosis
// -------------------------------------------------------------
console.log('--- Test 1: Physics Faraday Law Single-Gap Diagnosis (Q1 Failed) ---');
const phyObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'PHY-EM-01');
const phyQ1 = phyObj.questions[0];

// Student selects Option A (Confusing Static Field with Changing Flux)
const chosenOptA = phyQ1.options.find(o => o.option_letter === 'A');
const correctOptC = phyQ1.options.find(o => o.option_letter === 'C');

assert(chosenOptA.is_correct === false, 'Option A is incorrect distractor');
assert(chosenOptA.likely_misconception_title === 'Confusing Static Magnetic Field with Changing Flux', 'Identifies correct misconception title');
assert(chosenOptA.misconception_framing_statement.includes('You likely assumed'), 'Framing adheres to Founder Decision #1 (epistemic probable framing)');
assert(chosenOptA.likely_misconception_explanation.includes('dΦ/dt ≠ 0'), 'Cognitive explanation provides mathematical and conceptual root cause');

// -------------------------------------------------------------
// Test Case 2: Chemistry Organic Reactions Misconception
// -------------------------------------------------------------
console.log('\n--- Test 2: Chemistry Alkenes Misconception Diagnosis (Q3 Markovnikov) ---');
const chemObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'CHE-ORG-01');
const chemQ3 = chemObj.questions[2];

// Student selects Option A (Anti-Markovnikov Inversion Error)
const chosenChemA = chemQ3.options.find(o => o.option_letter === 'A');
assert(chosenChemA.is_correct === false, 'Chem Q3 Option A is incorrect');
assert(chosenChemA.likely_misconception_title === 'Anti-Markovnikov Inversion Error', 'Identifies Anti-Markovnikov misconception');
assert(chosenChemA.likely_misconception_explanation.includes('carbocation stability'), 'Explanation addresses carbocation chemistry');

// -------------------------------------------------------------
// Test Case 3: Biology Genetics Misconception
// -------------------------------------------------------------
console.log('\n--- Test 3: Biology Genetics Misconception Diagnosis (Q3 Testcross) ---');
const bioObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'BIO-GEN-01');
const bioQ3 = bioObj.questions[2];

// Student selects Option A (Blindly Applying 3:1 Monohybrid Cross)
const chosenBioA = bioQ3.options.find(o => o.option_letter === 'A');
assert(chosenBioA.likely_misconception_title === 'Blindly Applying the 3:1 Monohybrid Cross Template', 'Identifies rote memorization template error');

// -------------------------------------------------------------
// Test Case 4: Mathematics Quadratic Roots Misconception
// -------------------------------------------------------------
console.log('\n--- Test 4: Mathematics Quadratic Discriminant Diagnosis (Q2 Negative Discriminant) ---');
const mathObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'MTH-ALG-01');
const mathQ2 = mathObj.questions[1];

// Student selects Option B (Non-Square Number Confusion with Negative Discriminant)
const chosenMathB = mathQ2.options.find(o => o.option_letter === 'B');
assert(chosenMathB.likely_misconception_title === 'Non-Square Number Confusion with Negative Discriminant', 'Identifies non-square vs negative discriminant confusion');

// -------------------------------------------------------------
// Test Case 5: Multi-Gap Diagnosis Simulation
// -------------------------------------------------------------
console.log('\n--- Test 5: Multi-Gap Isolation Simulation (2 Questions Failed) ---');
const responses = [
  { selected_option: 'A', question: phyObj.questions[0] }, // Q1 Fail
  { selected_option: 'B', question: phyObj.questions[1] }, // Q2 Correct
  { selected_option: 'B', question: phyObj.questions[2] }, // Q3 Fail (Charge conservation misconception)
  { selected_option: 'D', question: phyObj.questions[3] }, // Q4 Correct
  { selected_option: 'B', question: phyObj.questions[4] }  // Q5 Correct
];

const simulatedGaps = [];
let passCount = 0;

responses.forEach((r, idx) => {
  const chosen = r.question.options.find(o => o.option_letter === r.selected_option);
  if (chosen.is_correct) {
    passCount++;
  } else {
    simulatedGaps.push({
      question_index: idx,
      question: r.question,
      chosenOpt: chosen,
      correctOpt: r.question.options.find(o => o.option_letter === r.question.correct_option),
      title: chosen.likely_misconception_title,
      framing: chosen.misconception_framing_statement || `You likely confused ${chosen.likely_misconception_title}.`,
      explanation: chosen.likely_misconception_explanation
    });
  }
});

assert(passCount === 3, 'Score correctly evaluated to 3/5');
assert(simulatedGaps.length === 2, 'Isolates exactly 2 distinct learning gaps');
assert(simulatedGaps[0].title === 'Confusing Static Magnetic Field with Changing Flux', 'Gap 1 correctly identified as static vs changing flux');
assert(simulatedGaps[1].title === 'Confusing Circuit Continuity with Induction Work', 'Gap 2 correctly identified as circuit continuity vs induction work');
assert(simulatedGaps[0].correctOpt.option_letter === 'C', 'Gap 1 correct answer is C');
assert(simulatedGaps[1].correctOpt.option_letter === 'A', 'Gap 2 correct answer is A');

console.log(`\n=== SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===`);
