export function formatTime (time) {
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor(time / (1000 * 60) % 60);
  const h = Math.floor(time / (1000 * 60 * 60));
  if (h > 0){
    return `${String(h)}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  if (m > 0){
    return `${String(m)}:${String(s).padStart(2, '0')}`;
  }
  return `:${String(s).padStart(2, '0')}`;
}