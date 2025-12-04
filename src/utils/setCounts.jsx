export function setCounts() {
  if (localStorage.getItem('easyCount') == null){
    localStorage.setItem('easyCount', '0');
  }
  if (localStorage.getItem('mediumCount') == null){
    localStorage.setItem('mediumCount', '0');
  }
  if (localStorage.getItem('hardCount') == null){
    localStorage.setItem('hardCount', '0');
  }
  if (localStorage.getItem('easyTime') == null){
    localStorage.setItem('easyTime', '0');
  }
  if (localStorage.getItem('mediumTime') == null){
    localStorage.setItem('mediumTime', '0');
  }
  if (localStorage.getItem('hardTime') == null){
    localStorage.setItem('hardTime', '0');
  }
};