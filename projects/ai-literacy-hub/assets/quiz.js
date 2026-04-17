const params = new URLSearchParams(window.location.search);
const track = params.get('track') || 'technical';

const el = {
  title: document.getElementById('quizTitle'),
  audience: document.getElementById('quizAudience'),
  qCount: document.getElementById('qCount'),
  progressBar: document.getElementById('progressBar'),
  card: document.getElementById('quizCard'),
  qText: document.getElementById('qText'),
  options: document.getElementById('options'),
  submitBtn: document.getElementById('submitBtn'),
  nextBtn: document.getElementById('nextBtn'),
  feedback: document.getElementById('feedback'),
  resultCard: document.getElementById('resultCard'),
  scoreText: document.getElementById('scoreText'),
  summaryBody: document.getElementById('summaryBody')
};

let data = null;
let index = 0;
let selected = null;
let locked = false;
let score = 0;
const answers = [];

function renderProgress() {
  const pct = ((index) / data.questions.length) * 100;
  el.progressBar.style.width = `${pct}%`;
}

function renderQuestion() {
  const q = data.questions[index];
  selected = null;
  locked = false;
  el.feedback.style.display = 'none';
  el.nextBtn.style.display = 'none';
  el.submitBtn.style.display = 'inline-block';

  el.qText.textContent = `${q.id}. ${q.text}`;
  el.qCount.textContent = `Question ${index + 1} of ${data.questions.length}`;

  el.options.innerHTML = q.options.map((opt, i) => `
    <button class="option" data-i="${i}" type="button">${String.fromCharCode(65+i)}. ${opt}</button>
  `).join('');

  [...el.options.querySelectorAll('.option')].forEach(btn => {
    btn.addEventListener('click', () => {
      if (locked) return;
      selected = Number(btn.dataset.i);
      [...el.options.querySelectorAll('.option')].forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  renderProgress();
}

function gradeCurrent() {
  if (selected === null || locked) return;
  locked = true;
  const q = data.questions[index];
  const correct = q.answerIndex;
  const isRight = selected === correct;
  if (isRight) score += 1;

  answers.push({
    q: q.id,
    selected,
    correct,
    isRight
  });

  [...el.options.querySelectorAll('.option')].forEach((o, i) => {
    if (i === correct) o.classList.add('correct');
    if (i === selected && !isRight) o.classList.add('wrong');
  });

  el.feedback.className = `feedback ${isRight ? 'good' : 'bad'}`;
  el.feedback.textContent = isRight
    ? 'Correct ✅ Nice one.'
    : `Not quite. Correct answer is ${String.fromCharCode(65 + correct)}.`;
  el.feedback.style.display = 'block';

  el.submitBtn.style.display = 'none';
  el.nextBtn.style.display = 'inline-block';
}

function showResults() {
  el.card.style.display = 'none';
  el.resultCard.style.display = 'block';
  el.progressBar.style.width = '100%';
  const pct = Math.round((score / data.questions.length) * 100);
  el.scoreText.textContent = `You scored ${score}/${data.questions.length} (${pct}%).`;
  el.summaryBody.innerHTML = answers.map((a, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${String.fromCharCode(65 + a.selected)}</td>
      <td>${String.fromCharCode(65 + a.correct)}</td>
      <td>${a.isRight ? '✅' : '❌'}</td>
    </tr>
  `).join('');
}

el.submitBtn.addEventListener('click', gradeCurrent);
el.nextBtn.addEventListener('click', () => {
  index += 1;
  if (index >= data.questions.length) {
    showResults();
    return;
  }
  renderQuestion();
});

(async function init() {
  try {
    const res = await fetch(`/diego-claw/projects/ai-literacy-hub/data/${track}.json`);
    if (!res.ok) throw new Error('Track not found');
    data = await res.json();
  } catch {
    el.title.textContent = 'Track not found';
    el.audience.textContent = 'Please return to the hub and select a valid track.';
    return;
  }

  el.title.textContent = `${data.emoji} ${data.title}`;
  el.audience.textContent = data.audience;
  el.card.style.display = 'block';
  renderQuestion();
})();