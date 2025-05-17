let current = '';
let prev = '';
let operator = '';
let history = [];

function append(value) {
  current += value;
  updateDisplay(current);
}

function setOperator(op) {
  if (current === '' && prev !== '') {
    operator = op;
    updateDisplay(prev + ' ' + operator);
    return;
  }

  if (prev && current) {
    calculate();
  }

  operator = op;
  prev = current;
  current = '';
  updateDisplay(prev + ' ' + operator);
}

function calculate() {
  if (!prev || !current || !operator) return;
  let expression = `${prev} ${operator} ${current}`;
  let result;

  try {
    result = eval(expression);
  } catch {
    result = 'Error';
  }

  updateDisplay(result);
  history.push(`${expression} = ${result}`);
  renderHistory();

  current = result.toString();
  prev = '';
  operator = '';
}

function clearAll() {
  current = '';
  prev = '';
  operator = '';
  updateDisplay('');
}

function updateDisplay(val) {
  document.getElementById('display').value = val;
}

function toggleHistory() {
  const panel = document.getElementById('historyPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.slice().reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    list.appendChild(li);
  });
}

function clearHistory() {
  history = [];
  renderHistory();
}
