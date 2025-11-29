import {makePuzzle} from './makePuzzle.jsx'

export function handleDifficulty(puzzle, game){
  if (game.status == 'running' || game.status == 'paused' ){
    game.stopTimer();
    game.updateStatus('paused');
    game.setDifficultyDialog(true);
  } else {
    game.updateStatus('waiting');
    game.stopTimer();
    game.resetTimer();
    game.setDifficultyDialog(false);
    game.updateLevel();
    puzzle.setValues([]);
  }
};

export function handleStart(puzzle, game, data, newValues, finalValues){
  game.updateMessage('');
  if (game.status == 'running' || game.status == 'paused' ){
    game.stopTimer();
    game.updateStatus('paused');
    game.setStartDialog(true);
  } else {
    startNewGame(puzzle, game, data, newValues, finalValues);
  }
};

export function startNewGame(puzzle, game, data, newValues, finalValues){
  finalValues.fill('');
  puzzle.resetEntered();
  makePuzzle(puzzle, game, data, newValues, finalValues);
};

export function handleCheck (puzzle, game){
  let errors = 0;
  let empty = 0;
  for (let i=0; i<37; i++) {
    if ((puzzle.values[i] != puzzle.finalValues[i]) && 
    (puzzle.values[i] != '')) {
      errors++;
    }
  }
  if (errors > 1) {
    game.updateMessage('There are some mistakes.');
    return;
  }
  if (errors == 1) {
    game.updateMessage('There is a mistake.');
    return;
  }
  for (let i=0; i<37; i++) {
    if (puzzle.values[i] == ''){
      empty++;
    }
  }
  if (empty > 1) {
    game.updateMessage(`There are ${empty} left.`);
    return;
  }
  if (empty == 1) {
    game.updateMessage('There is 1 left.');
    return;
  }
  finishScreen(game);
};

export function handleHint(puzzle, game, data){
  if (game.status == 'waiting') {
    game.updateMessage('Press New to start.');
    return;
  }
  if (game.status == 'paused') {
    return;
  }
  let errors = 0;
  let empty = 0;
  for (let i=0; i<37; i++) {
    if ((puzzle.values[i] != puzzle.finalValues[i]) && 
      (puzzle.values[i] != '')) {
      puzzle.updateHint(i, true);
      errors++;
    }
    if (puzzle.values[i] == ''){
      empty++;
    }
  }
  if (errors == 1){
    game.updateMessage('There is a mistake.');
    return;
  }
  if (errors > 1) {
    game.updateMessage('There are mistakes.');
    return;
  }
  if (empty < 1) {
    finishScreen(game);
    return;
  }
  getHint(puzzle, game, data);
};

function getHint(puzzle, game, data){
  const empty = [];
  let p, n;
  for (let i=0; i<37; i++){
    if (puzzle.values[i]==''){
      empty.push(i);
    }
  }
  for (let i=empty.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [empty[i], empty[j]] = [empty[j], empty[i]];
  }
  let validFound=false;
  for (let pos of empty){
    const numbers=[1,2,3,4,5,6,7];
    for (let i=6; i>-1; i--){
      if (!hintIsValid(puzzle, data, pos, numbers[i])){
        numbers.splice(i, 1);  
      }
    }
    if (numbers.length==1){
      p = pos;
      n = numbers[0];
      validFound=true;
      break;
    }
  }
  if (!validFound){
    p = empty[0];
    n = puzzle.finalValues[p];
  }
  game.updateMessage('Try this.');
  puzzle.updateValues(p, n);
  puzzle.updateHint(p, true);
  puzzle.pushEntered(p);
};

function hintIsValid(puzzle, data, pos, num){
  for (let i=0; i < data.blocked[pos].length; i++) {
    if (puzzle.values[data.blocked[pos][i]]==num){
      return false;
    }
  }
  return true;
};

function finishScreen(game){
  game.stopTimer();
  game.updateStatus('finished');
  game.updateMessage('Correct!');
  let count, totalTime;

  switch (game.level) {
    case 'Easy':
      count = parseInt(localStorage.getItem('easyCount')) + 1;
      localStorage.setItem('easyCount', count.toString());
      totalTime = parseInt(localStorage.getItem('easyTime')) + game.time;
      localStorage.setItem('easyTime', totalTime.toString());
      break;
    case 'Medium':
      count = parseInt(localStorage.getItem('mediumCount')) + 1;
      localStorage.setItem('mediumCount', count.toString());
      totalTime = parseInt(localStorage.getItem('mediumTime')) + game.time;
      localStorage.setItem('mediumTime', totalTime.toString());
      break;
    default:
      count = parseInt(localStorage.getItem('hardCount')) + 1;
      localStorage.setItem('hardCount', count.toString());
      totalTime = parseInt(localStorage.getItem('hardTime')) + game.time;
      localStorage.setItem('hardTime', totalTime.toString());
  }

  game.animationRunning(true);
  let num = 0;
  function animate() {
    num = (num + 2) % 100;
    document.documentElement.style.setProperty('--stop', `${num-15}%`);
    game.animationId = requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  setTimeout(() => {
    cancelAnimationFrame(game.animationId);
    game.animationRunning(false);
    game.updateStatus('waiting');
    game.setFinishedDialog(true);
  }, 4950);
};

export function handlePause (game){
  if (game.status == 'set' || game.status == 'running'){
    game.stopTimer();
    game.updateMessage('');
    game.updateStatus('paused');
  }
  if (game.status == 'paused'){
    game.startTimer();
    game.updateMessage('');
    game.updateStatus('running');
  }
};

export function handleDirections(game){
  game.stopTimer();
  game.setDirectionsDialog(true);
};

export function handleStatistics(game){
  game.setStatisticsDialog(true);
};