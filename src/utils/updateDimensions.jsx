export function updateDimensions() {
  const width=window.innerWidth;
  const height=window.innerHeight;
  if (width > (height*.95)) {
    document.documentElement.style.setProperty('--gameSize', '93dvh');
    document.documentElement.style.setProperty('--nav-height', '6dvh');
    document.documentElement.style.setProperty('--c-panel-height', '.09');
    document.documentElement.style.setProperty('--puzzle-height', '.8');
    document.documentElement.style.setProperty('--n-panel-height', '.11');
  } else {
    document.documentElement.style.setProperty('--gameSize', '99dvw');
    document.documentElement.style.setProperty('--nav-height', '6.5dvw');
    document.documentElement.style.setProperty('--c-panel-height', '.11');
    document.documentElement.style.setProperty('--puzzle-height', '.76');
    document.documentElement.style.setProperty('--n-panel-height', '.13');
  }
};