// TalkPDF — Multilingual Nigerian Voice Lessons Test Suite
const { CURRICULUM_DATA } = require('./data/curriculum-data.js');

console.log('=== RUNNING MULTILINGUAL NIGERIAN VOICE LESSON TESTS ===\n');

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

const REQUIRED_LANGUAGES = ['en', 'pcm', 'yo', 'ha', 'ig'];

CURRICULUM_DATA.objectives.forEach(obj => {
  console.log(`--- Checking Multilingual Audio Snippet for ${obj.objective_id} (${obj.subject}) ---`);
  const audio = obj.micro_intervention.audio_snippet;

  assert(audio !== undefined, `${obj.objective_id} has audio_snippet`);
  assert(audio.translations !== undefined, `${obj.objective_id} has translations object`);

  REQUIRED_LANGUAGES.forEach(lang => {
    const t = audio.translations[lang];
    assert(t !== undefined, `${obj.objective_id} includes translation for '${lang}'`);
    assert(typeof t.lang_name === 'string' && t.lang_name.length > 0, `${obj.objective_id} '${lang}' has lang_name`);
    assert(typeof t.label === 'string' && t.label.length > 0, `${obj.objective_id} '${lang}' has label`);
    assert(typeof t.script === 'string' && t.script.length > 80, `${obj.objective_id} '${lang}' has detailed written script (${t.script ? t.script.length : 0} chars)`);
    assert(typeof t.spoken_phonetic === 'string' && t.spoken_phonetic.length > 80, `${obj.objective_id} '${lang}' has phonetically tuned speech script (${t.spoken_phonetic ? t.spoken_phonetic.length : 0} chars)`);
  });

  // Verify language-specific cultural/linguistic indicators
  const pcm = audio.translations.pcm.script.toLowerCase();
  assert(pcm.includes('dey') || pcm.includes('na') || pcm.includes('make you'), `${obj.objective_id} Pidgin translation contains authentic Nigerian Pidgin grammar`);

  console.log('');
});

console.log(`\n=== SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===`);
