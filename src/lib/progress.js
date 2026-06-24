// Client-side progress, stored in localStorage. No backend, no accounts (v1).
const KEY = '5ml:v1';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function write(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function dayStamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86_400_000);
}

export function getState() {
  const s = read();
  return {
    completed: s.completed || {},
    streak: s.streak || { count: 0, lastDay: null },
  };
}

export function isComplete(lessonId) {
  return Boolean(getState().completed[lessonId]);
}

export function completedCount() {
  return Object.keys(getState().completed).length;
}

export function getStreak() {
  return getState().streak.count;
}

export function markComplete(lessonId, score, total) {
  const s = getState();
  const today = dayStamp();
  const existing = s.completed[lessonId];

  if (!existing) {
    s.completed[lessonId] = { score, total, at: today };
  } else if (score > existing.score) {
    s.completed[lessonId] = { ...existing, score };
  }

  const { lastDay, count } = s.streak;
  if (lastDay !== today) {
    const continues = lastDay && daysBetween(lastDay, today) === 1;
    s.streak = { count: continues ? count + 1 : 1, lastDay: today };
  }

  write(s);
  return s;
}
