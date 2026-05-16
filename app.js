/**
 * TaskFlow — app.js
 * Pure vanilla JS + localStorage (simulated db.json with "users" and "todos" arrays)
 * No frameworks, no bundlers, no npm dependencies.
 */

// ─────────────────────────────────────────
// DB helpers — localStorage as mock db.json
// ─────────────────────────────────────────

const DB_KEY = 'taskflow_db';

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);
  // Initialize with empty arrays (like db.json)
  const initial = { users: [], todos: [] };
  localStorage.setItem(DB_KEY, JSON.stringify(initial));
  return initial;
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getUsers() { return getDB().users; }
function getTodos()  { return getDB().todos; }

function saveUser(user) {
  const db = getDB();
  db.users.push(user);
  saveDB(db);
}

function saveTodo(todo) {
  const db = getDB();
  db.todos.push(todo);
  saveDB(db);
}

function updateTodo(id, patch) {
  const db = getDB();
  db.todos = db.todos.map(t => t.id === id ? { ...t, ...patch } : t);
  saveDB(db);
}

// ─────────────────────────────────────────
// Session helpers
// ─────────────────────────────────────────

const SESSION_KEY = 'currentUser';

function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}

// ─────────────────────────────────────────
// Screen router
// ─────────────────────────────────────────

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(`screen-${name}`).classList.add('active');
}

// ─────────────────────────────────────────
// Inline error helpers
// ─────────────────────────────────────────

function showError(elId, msg) {
  const el = document.getElementById(elId);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearError(elId) {
  const el = document.getElementById(elId);
  el.textContent = '';
  el.classList.add('hidden');
}

function showSuccess(elId, msg) {
  const el = document.getElementById(elId);
  el.textContent = msg;
  el.classList.remove('hidden');
}

// ─────────────────────────────────────────
// AUTH: Login
// ─────────────────────────────────────────

document.getElementById('form-login').addEventListener('submit', e => {
  e.preventDefault();
  clearError('login-error');

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  // Empty validation
  if (!email || !password) {
    showError('login-error', 'Por favor, preencha e-mail e senha.');
    return;
  }

  const users = getUsers();
  const user  = users.find(u => u.email === email);

  if (!user) {
    showError('login-error', 'E-mail não encontrado. Verifique ou crie uma conta.');
    return;
  }

  if (user.password !== password) {
    showError('login-error', 'Senha incorreta. Tente novamente.');
    return;
  }

  setCurrentUser(user);
  loadDashboard(user);
  showScreen('dashboard');
});

// ─────────────────────────────────────────
// AUTH: Register
// ─────────────────────────────────────────

document.getElementById('form-register').addEventListener('submit', e => {
  e.preventDefault();
  clearError('register-error');
  clearError('register-success');
  document.getElementById('register-success').classList.add('hidden');

  const name     = document.getElementById('register-name').value.trim();
  const email    = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  // Empty validation
  if (!name || !email || !password) {
    showError('register-error', 'Preencha todos os campos obrigatórios.');
    return;
  }

  // Email format (simple)
  if (!/\S+@\S+\.\S+/.test(email)) {
    showError('register-error', 'Informe um e-mail válido.');
    return;
  }

  // Password length
  if (password.length < 6) {
    showError('register-error', 'A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  // Duplicate check
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showError('register-error', 'Este e-mail já está cadastrado. Faça login.');
    return;
  }

  const newUser = { name, email, password, createdAt: Date.now() };
  saveUser(newUser);

  // Auto-login after register
  setCurrentUser(newUser);
  loadDashboard(newUser);
  showScreen('dashboard');
});

// ─────────────────────────────────────────
// Navigation links
// ─────────────────────────────────────────

document.getElementById('goto-register').addEventListener('click', () => {
  clearError('login-error');
  showScreen('register');
});

document.getElementById('goto-login').addEventListener('click', () => {
  clearError('register-error');
  document.getElementById('register-success').classList.add('hidden');
  showScreen('login');
});

// ─────────────────────────────────────────
// AUTH: Logout
// ─────────────────────────────────────────

document.getElementById('btn-logout').addEventListener('click', () => {
  clearCurrentUser();

  // Reset login form
  document.getElementById('login-email').value    = '';
  document.getElementById('login-password').value = '';
  clearError('login-error');

  showScreen('login');
});

// ─────────────────────────────────────────
// DASHBOARD: Load
// ─────────────────────────────────────────

function loadDashboard(user) {
  document.getElementById('header-username').textContent = user.name;
  renderTasks(user.email);
}

// ─────────────────────────────────────────
// TASKS: Add
// ─────────────────────────────────────────

document.getElementById('form-add-task').addEventListener('submit', e => {
  e.preventDefault();
  clearError('task-error');

  const titleEl = document.getElementById('task-title');
  const title   = titleEl.value.trim();
  const type    = document.getElementById('task-type').value;
  const desc    = document.getElementById('task-desc').value.trim();

  if (!title) {
    showError('task-error', 'O título da tarefa é obrigatório.');
    titleEl.focus();
    return;
  }

  const user = getCurrentUser();
  if (!user) return;

  const todo = {
    id:          Date.now(),
    userId:      user.email,
    title,
    type,
    description: desc,
    done:        false,
  };

  saveTodo(todo);

  // Reset form
  titleEl.value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-type').value = 'Trabalho';

  renderTasks(user.email);

  // Briefly animate the new card
  requestAnimationFrame(() => {
    const firstCard = document.querySelector('#tasks-list .task-card');
    if (firstCard) {
      firstCard.style.animation = 'none';
      firstCard.offsetHeight; // reflow
      firstCard.style.animation = '';
    }
  });
});

// ─────────────────────────────────────────
// TASKS: Render
// ─────────────────────────────────────────

function renderTasks(userId) {
  const allTodos    = getTodos();
  const userTodos   = allTodos.filter(t => t.userId === userId);

  // Sort: pending first, done last
  const pending   = userTodos.filter(t => !t.done);
  const completed = userTodos.filter(t =>  t.done);
  const sorted    = [...pending, ...completed];

  const listEl   = document.getElementById('tasks-list');
  const emptyEl  = document.getElementById('tasks-empty');
  const countEl  = document.getElementById('task-count');

  // Count badge
  countEl.textContent = userTodos.length === 0
    ? 'Nenhuma'
    : `${pending.length} pendente${pending.length !== 1 ? 's' : ''} · ${completed.length} concluída${completed.length !== 1 ? 's' : ''}`;

  if (sorted.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }

  emptyEl.classList.add('hidden');
  listEl.innerHTML = sorted.map(buildTaskCard).join('');

  // Bind complete buttons
  listEl.querySelectorAll('.btn-complete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      updateTodo(id, { done: true });
      renderTasks(userId);
    });
  });
}

// ─────────────────────────────────────────
// TASKS: Build card HTML
// ─────────────────────────────────────────

const TYPE_CONFIG = {
  'Trabalho': { badge: 'badge-work',    icon: '💼' },
  'Pessoal':  { badge: 'badge-pessoal', icon: '🙋' },
  'Estudos':  { badge: 'badge-estudos', icon: '📚' },
};

function buildTaskCard(todo) {
  const cfg         = TYPE_CONFIG[todo.type] || TYPE_CONFIG['Trabalho'];
  const doneClass   = todo.done ? 'done' : '';
  const completeBtn = !todo.done
    ? `<button
         class="btn-complete btn-ghost text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:border-emerald-500/40 hover:text-emerald-400"
         data-id="${todo.id}"
       >
         <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
         </svg>
         Concluir
       </button>`
    : `<span class="text-xs text-emerald-500/70 flex items-center gap-1">
         <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
         </svg>
         Concluída
       </span>`;

  const descHtml = todo.description
    ? `<p class="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">${escapeHTML(todo.description)}</p>`
    : '';

  return `
    <div class="task-card ${doneClass} rounded-xl p-4 flex flex-col gap-3 animate-fade-up">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="${cfg.badge} text-[10px] font-semibold px-2 py-0.5 rounded-full">
              ${cfg.icon} ${escapeHTML(todo.type)}
            </span>
          </div>
          <p class="task-title text-sm font-medium text-slate-100 leading-snug">${escapeHTML(todo.title)}</p>
          ${descHtml}
        </div>
      </div>
      <div class="flex items-center justify-end pt-1 border-t border-white/5">
        ${completeBtn}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────
// Utility
// ─────────────────────────────────────────

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─────────────────────────────────────────
// Init — restore session on page load
// ─────────────────────────────────────────

(function init() {
  const user = getCurrentUser();
  if (user) {
    loadDashboard(user);
    showScreen('dashboard');
  } else {
    showScreen('login');
  }
})();
