// TalkPDF — Feature #3: Targeted Conceptual Micro-Intervention Test Suite
const { CURRICULUM_DATA } = require('./data/curriculum-data.js');

console.log('=== RUNNING FEATURE #3 TARGETED CONCEPTUAL MICRO-INTERVENTION TESTS ===\n');

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
// Test 1: Micro-Intervention Data Structure per Objective
// -------------------------------------------------------------
CURRICULUM_DATA.objectives.forEach(obj => {
  const mi = obj.micro_intervention;
  console.log(`--- Checking Micro-Intervention for ${obj.objective_id} (${obj.subject}) ---`);
  
  assert(mi !== undefined && mi !== null, `${obj.objective_id} has micro_intervention object`);
  assert(typeof mi.intervention_id === 'string' && mi.intervention_id.startsWith('INT-'), `${obj.objective_id} has valid intervention_id`);
  assert(mi.read_time === '60–90 sec read', `${obj.objective_id} specifies 60–90 sec read time`);
  assert(mi.headline.includes('rule you need to know'), `${obj.objective_id} has standard PRD headline`);
  assert(Array.isArray(mi.paragraphs) && mi.paragraphs.length === 3, `${obj.objective_id} contains exactly 3 plain-English lesson paragraphs`);
  
  mi.paragraphs.forEach((p, idx) => {
    assert(typeof p === 'string' && p.length > 50, `${obj.objective_id} paragraph ${idx + 1} has sufficient depth (${p.length} chars)`);
  });

  assert(mi.key_takeaway !== undefined, `${obj.objective_id} has key_takeaway box`);
  assert(typeof mi.key_takeaway.rule_name === 'string' && mi.key_takeaway.rule_name.length > 5, `${obj.objective_id} key_takeaway has rule_name`);
  assert(typeof mi.key_takeaway.formula === 'string' && mi.key_takeaway.formula.length > 3, `${obj.objective_id} key_takeaway has formula expression`);
  assert(typeof mi.key_takeaway.summary === 'string' && mi.key_takeaway.summary.length > 10, `${obj.objective_id} key_takeaway has summary sentence`);

  assert(mi.audio_snippet !== undefined, `${obj.objective_id} has audio_snippet player metadata`);
  assert(mi.audio_snippet.duration === '0:45', `${obj.objective_id} audio snippet duration is 45s`);
  console.log('');
});

// -------------------------------------------------------------
// Test 2: Subject-Specific Formula & Principle Verifications
// -------------------------------------------------------------
console.log('--- Testing Subject Formula Accuracy ---');

// Physics Faraday
const phyMI = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'PHY-EM-01').micro_intervention;
assert(phyMI.key_takeaway.formula.includes('ΔΦ') || phyMI.key_takeaway.formula.includes('dΦ'), 'Physics formula specifies rate of change of flux (ΔΦ/Δt)');
assert(phyMI.paragraphs[0].includes('relative') || phyMI.paragraphs[0].includes('changing'), 'Physics lesson highlights relative motion / changing flux');

// Chemistry Markovnikov
const chemMI = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'CHE-ORG-01').micro_intervention;
assert(chemMI.key_takeaway.formula.includes('CH₃-CH(Cl)-CH₃'), 'Chemistry formula gives 2-chloropropane major product');
assert(chemMI.paragraphs[1].includes('addition'), 'Chemistry lesson distinguishes addition from substitution');

// Biology Monohybrid
const bioMI = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'BIO-GEN-01').micro_intervention;
assert(bioMI.key_takeaway.formula.includes('1 TT : 2 Tt : 1 tt') || bioMI.key_takeaway.formula.includes('3:1'), 'Biology formula gives true Mendelian ratios');
assert(bioMI.paragraphs[0].includes('segregate') || bioMI.paragraphs[0].includes('separate'), 'Biology lesson explains allelic segregation');

// Math Discriminant
const mathMI = CURRICULUM_DATA.objectives.find(o => o.objective_id === 'MTH-ALG-01').micro_intervention;
assert(mathMI.key_takeaway.formula.includes('b² - 4ac') || mathMI.key_takeaway.formula.includes('Δ'), 'Math formula specifies discriminant Δ = b² - 4ac');
assert(mathMI.paragraphs[1].includes('discriminant'), 'Math lesson explains discriminant conditions');

console.log(`\n=== SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===`);
