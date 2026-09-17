// test-evaluation-feature.js
// Automated verification suite for Feature #5: AI Explain-Back Evaluation & 1-Retry Loop (FR-05 / SCR-04)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { CURRICULUM_DATA } = require('./data/curriculum-data.js');
const { evaluateExplainBack, countWords } = require('./js/app.js');

console.log("==================================================================");
console.log("TEST SUITE: Feature #5 AI Explain-Back Evaluation & 1-Retry Loop");
console.log("==================================================================");

let passedTests = 0;
let totalTests = 0;

function it(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    Error: ${err.message}`);
  }
}

const phyObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === "PHY-EM-01");
const chemObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === "CHE-ORG-01");
const bioObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === "BIO-GEN-01");
const mathObj = CURRICULUM_DATA.objectives.find(o => o.objective_id === "MTH-ALG-01");

// 1. Physics Evaluation Tests
it("PHY-EM-01: Incomplete explanation (missing changing flux) yields NEEDS_CLARIFICATION with targeted hint", () => {
  const text = "A bar magnet has a north and south pole inside a copper solenoid coil. When it stays stationary inside the coil with a galvanometer attached, it creates a magnetic field.";
  const evalResult = evaluateExplainBack(text, phyObj);

  assert.ok(evalResult, "Evaluation object must be returned");
  assert.strictEqual(evalResult.primary_evaluation_result, "NEEDS_CLARIFICATION", "Should be marked NEEDS_CLARIFICATION");
  assert.ok(evalResult.targeted_hint_issued, "Must issue a targeted hint");
  assert.ok(evalResult.targeted_hint_issued.toLowerCase().includes("flux") || evalResult.targeted_hint_issued.toLowerCase().includes("motion"), "Hint should mention changing flux or motion");
});

it("PHY-EM-01: Complete explanation (changing flux + induced emf + opposing direction) yields UNDERSTOOD with Gold/Silver tier", () => {
  const text = "A stationary magnet produces zero current because magnetic flux is not changing. Electricity is only induced when relative motion between the coil and magnet causes the rate of change of magnetic flux to be non-zero. According to Lenz's law, the induced current flows in a direction that opposes this flux change, like a resistive push.";
  const evalResult = evaluateExplainBack(text, phyObj);

  assert.ok(evalResult, "Evaluation object must be returned");
  assert.strictEqual(evalResult.primary_evaluation_result, "UNDERSTOOD", "Should be marked UNDERSTOOD");
  assert.strictEqual(evalResult.targeted_hint_issued, null, "Targeted hint should be null for UNDERSTOOD");
  assert.ok(evalResult.secondary_overall_score >= 80, `Expected score >= 80, got ${evalResult.secondary_overall_score}`);
  assert.ok(["Gold", "Silver"].includes(evalResult.badge_tier), "Expected Gold or Silver badge");
});

// 2. Chemistry Evaluation Tests
it("CHE-ORG-01: Incomplete explanation yields NEEDS_CLARIFICATION with Markovnikov/reaction hint", () => {
  const text = "Alkenes have hydrocarbons with carbon atoms that react easily when you mix them in a test tube with liquids.";
  const evalResult = evaluateExplainBack(text, chemObj);

  assert.strictEqual(evalResult.primary_evaluation_result, "NEEDS_CLARIFICATION");
  assert.ok(evalResult.targeted_hint_issued);
});

it("CHE-ORG-01: Complete explanation yields UNDERSTOOD with high accuracy score", () => {
  const text = "Alkenes possess a reactive carbon-carbon double bond containing an exposed pi bond. When reacting with HCl, they undergo an addition reaction where the double bond breaks open. Under Markovnikov's rule, the hydrogen attaches to the double-bonded carbon with more hydrogen atoms, producing 2-chloropropane.";
  const evalResult = evaluateExplainBack(text, chemObj);

  assert.strictEqual(evalResult.primary_evaluation_result, "UNDERSTOOD");
  assert.strictEqual(evalResult.points_covered >= 2, true);
  assert.ok(evalResult.secondary_accuracy_score >= 8);
});

// 3. Biology Evaluation Tests
it("BIO-GEN-01: Segregation & monohybrid cross evaluation verifies Mendelian concepts", () => {
  const text = "According to Mendel's Law of Segregation, alleles physically separate during meiosis so each gamete carries only one allele. In heterozygous tall pea plants (Tt), the dominant allele masks the recessive allele, but crossing two heterozygotes produces a 3:1 phenotypic ratio where 25% of offspring inherit both recessive alleles.";
  const evalResult = evaluateExplainBack(text, bioObj);

  assert.strictEqual(evalResult.primary_evaluation_result, "UNDERSTOOD");
  assert.ok(evalResult.secondary_overall_score >= 80);
});

// 4. Mathematics Evaluation Tests
it("MTH-ALG-01: Quadratic discriminant evaluation checks nature of roots", () => {
  const text = "The discriminant formula is b^2 - 4ac. If b^2 - 4ac is positive, the equation yields two distinct real roots. When b^2 - 4ac equals zero, it produces equal repeated real roots. If it is negative, taking the square root gives complex roots with no real solutions.";
  const evalResult = evaluateExplainBack(text, mathObj);

  assert.strictEqual(evalResult.primary_evaluation_result, "UNDERSTOOD");
  assert.ok(evalResult.points_covered >= 3);
  assert.ok(evalResult.secondary_overall_score >= 85);
  assert.strictEqual(evalResult.badge_tier, "Gold");
});

// 5. Formative Rubric Metric Integrity
it("Secondary rubric scores must remain strictly bounded (/10 and /100)", () => {
  const text = "This is a simple plain explanation of the physical concept using clear words for SS1 students.";
  const evalResult = evaluateExplainBack(text, phyObj);

  assert.ok(evalResult.secondary_simplicity_score >= 1 && evalResult.secondary_simplicity_score <= 10, "Simplicity score must be 1-10");
  assert.ok(evalResult.secondary_accuracy_score >= 1 && evalResult.secondary_accuracy_score <= 10, "Accuracy score must be 1-10");
  assert.ok(evalResult.secondary_analogies_score >= 1 && evalResult.secondary_analogies_score <= 10, "Analogies score must be 1-10");
  assert.ok(evalResult.secondary_overall_score >= 10 && evalResult.secondary_overall_score <= 100, "Composite score must be 10-100");
  assert.ok(["Gold", "Silver", "Bronze"].includes(evalResult.badge_tier), "Must have valid badge tier");
});

// 6. HTML Markup & UI Elements Verification
it("index.html must contain all SCR-04 evaluation feedback and 1-retry elements", () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  const requiredIds = [
    'pinnedHintBanner',
    'pinnedHintText',
    'evaluationFeedbackPanel',
    'evalResultBanner',
    'evalStatusPill',
    'evalBadgeTier',
    'evalScoreOverall',
    'evalResultTitle',
    'evalResultSummary',
    'targetedHintBox',
    'targetedHintText',
    'scoreSimplicity',
    'scoreAccuracy',
    'scoreAnalogies',
    'scoreComposite',
    'btnTryRevision',
    'btnProceedToVerification'
  ];

  requiredIds.forEach(id => {
    assert.ok(html.includes(`id="${id}"`), `index.html must include id="${id}"`);
  });
});

// 7. CSS Feedback Styling Verification
it("css/app.css must contain SCR-04 evaluation panel and status banner styles", () => {
  const css = fs.readFileSync(path.join(__dirname, 'css', 'app.css'), 'utf8');

  const requiredStyles = [
    '.pinned-hint-card',
    '.eval-feedback-panel',
    '.eval-result-banner.understood',
    '.eval-result-banner.clarification',
    '.targeted-hint-callout',
    '.secondary-scores-card',
    '.rubric-grid',
    '.badge-tier-pill.gold',
    '.badge-tier-pill.silver',
    '.badge-tier-pill.bronze'
  ];

  requiredStyles.forEach(style => {
    assert.ok(css.includes(style), `css/app.css must include style ${style}`);
  });
});

// 8. 1-Retry State Machine Logic
it("1-Retry logic in app.js must restrict retry attempts to exactly 1 revision", () => {
  const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

  assert.ok(appJs.includes("retries === 0"), "Must check retries === 0 before allowing revision button");
  assert.ok(appJs.includes("explainBackRetries = 1"), "Must increment explainBackRetries to 1");
  assert.ok(appJs.includes("btnProceedToVerification.style.display = \"flex\""), "Must unlock verification proceed button once retry is exhausted or understood");
});

console.log("------------------------------------------------------------------");
console.log(`Results: ${passedTests}/${totalTests} tests passed`);
console.log("==================================================================");

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
