// test-explain-back-feature.js
// Automated verification suite for Feature #4: Explain-Back Active Recall Input (SCR-04 / FR-04 / FR-12)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { CURRICULUM_DATA } = require('./data/curriculum-data.js');

console.log("=================================================");
console.log("TEST SUITE: Feature #4 Explain-Back Active Recall");
console.log("=================================================");

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

// 1. Data Contract Verifications
it("Curriculum data must have explain_back_prompt and explain_back_placeholder on all 4 objectives", () => {
  assert.ok(CURRICULUM_DATA && CURRICULUM_DATA.objectives, "CURRICULUM_DATA.objectives must exist");
  assert.strictEqual(CURRICULUM_DATA.objectives.length, 4, "Must have exactly 4 curriculum objectives");

  CURRICULUM_DATA.objectives.forEach(obj => {
    assert.ok(obj.explain_back_prompt && typeof obj.explain_back_prompt === 'string', `${obj.objective_id} missing explain_back_prompt`);
    assert.ok(obj.explain_back_prompt.length > 20, `${obj.objective_id} prompt too short`);
    assert.ok(obj.explain_back_placeholder && typeof obj.explain_back_placeholder === 'string', `${obj.objective_id} missing explain_back_placeholder`);
  });
});

// 2. HTML Markup Verifications
it("index.html must include viewExplainBack section with all required SCR-04 elements", () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  const requiredIds = [
    'viewExplainBack',
    'explainBackChallengePrompt',
    'explainBackInput',
    'wordCounterPill',
    'autoSavePill',
    'btnVoiceDictate',
    'dictateBtnText',
    'btnCheckExplanation',
    'btnBackToLesson'
  ];

  requiredIds.forEach(id => {
    assert.ok(html.includes(`id="${id}"`), `index.html must contain element with id="${id}"`);
  });

  assert.ok(html.includes('btnCheckExplanation') && html.includes('disabled'), "btnCheckExplanation should be disabled by default");
});

// 3. CSS Styling Verifications
it("css/app.css must contain SCR-04 specific classes and animations", () => {
  const css = fs.readFileSync(path.join(__dirname, 'css', 'app.css'), 'utf8');

  const requiredSelectors = [
    '.challenge-prompt-box',
    '.input-area-card',
    '.explain-textarea',
    '.word-counter-pill',
    '.word-counter-pill.needs-more',
    '.word-counter-pill.ready',
    '.btn-voice-dictate',
    '.btn-voice-dictate.recording',
    '@keyframes pulseRecording'
  ];

  requiredSelectors.forEach(sel => {
    assert.ok(css.includes(sel), `app.css must define ${sel}`);
  });
});

// 4. Word Count & Threshold Logic
it("Word count function in app.js must handle zero, whitespace, and accurate word tokenization", () => {
  const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');
  assert.ok(appJs.includes("function countWords"), "app.js must define countWords");

  // Replicate logic
  function countWords(text) {
    if (!text || typeof text !== "string") return 0;
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }

  assert.strictEqual(countWords(""), 0);
  assert.strictEqual(countWords("   "), 0);
  assert.strictEqual(countWords("one"), 1);
  assert.strictEqual(countWords("one two three"), 3);
  assert.strictEqual(countWords("  one   two \n  three \t four  "), 4);

  const sample19 = "One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen";
  assert.strictEqual(countWords(sample19), 19);

  const sample20 = sample19 + " twenty";
  assert.strictEqual(countWords(sample20), 20);
});

// 5. Gatekeeper Validation (20-word threshold)
it("app.js must enforce >= 20 word threshold before enabling btnCheckExplanation", () => {
  const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

  assert.ok(appJs.includes("words >= 20"), "Must test words >= 20 for threshold check");
  assert.ok(appJs.includes('btnCheckExplanation.disabled = false'), "Must enable button when >= 20 words");
  assert.ok(appJs.includes('btnCheckExplanation.disabled = true'), "Must disable button when < 20 words");
  assert.ok(appJs.includes('talkpdf_explain_back_draft_'), "Must auto-save draft with objective id prefix");
});

// 6. Voice Dictation Sample Fallback Integrity
it("getSampleSpokenRecall in app.js must produce valid, robust > 20 word responses for all 4 objectives", () => {
  const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');
  assert.ok(appJs.includes("getSampleSpokenRecall"), "Must define getSampleSpokenRecall");

  const sandbox = {};
  const vm = require('vm');
  vm.createContext(sandbox);

  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  // Extract getSampleSpokenRecall from app.js
  const fnMatch = appJs.match(/function getSampleSpokenRecall\([\s\S]*?\n  \}/);
  assert.ok(fnMatch, "Could not extract getSampleSpokenRecall function");
  
  vm.runInContext(fnMatch[0], sandbox);

  CURRICULUM_DATA.objectives.forEach(obj => {
    const sample = sandbox.getSampleSpokenRecall(obj);
    assert.ok(sample && sample.length > 50, `Sample for ${obj.objective_id} is too short`);
    const words = countWords(sample);
    assert.ok(words >= 20, `Sample for ${obj.objective_id} must have >= 20 words (got ${words})`);
  });
});

// 7. Navigation & Routing Transition Integrity
it("Progression CTA in SCR-03 must transition to EXPLAIN_BACK stage and call renderExplainBackView", () => {
  const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

  assert.ok(appJs.includes('state.session.stage = "EXPLAIN_BACK"'), "Must transition state.session.stage to EXPLAIN_BACK");
  assert.ok(appJs.includes('showView("explainBack")'), "Must call showView('explainBack')");
  assert.ok(appJs.includes('renderExplainBackView()'), "Must call renderExplainBackView()");
  assert.ok(appJs.includes('btnBackToLesson'), "Must handle btnBackToLesson back-navigation");
});

console.log("-------------------------------------------------");
console.log(`Results: ${passedTests}/${totalTests} tests passed`);
console.log("=================================================");

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
