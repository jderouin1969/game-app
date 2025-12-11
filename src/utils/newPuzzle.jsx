export function startNewGame(puzzle, game, data, newValues, finalValues){
  finalValues.fill('');
  puzzle.resetEntered();
  makePuzzle(puzzle, game, data, newValues, finalValues);
};

function makePuzzle(puzzle, game, data, newValues, finalValues) {
  puzzle.resetHint();
  randomStart(finalValues);
  fillPuzzle(finalValues, data);
  puzzle.replaceFinalValues(finalValues);
    for (let i=0; i<37; i++){
      newValues[i] = finalValues[i];
    }
  removeValues(data, game, newValues);
  for (let i=0; i<37; i++) {
    if (newValues[i] == ''){
      puzzle.updateClickable(i, true);
    } else {
      puzzle.updateClickable(i, false);
    }
  }
  puzzle.setValues(newValues);
  game.resetTimer();
  game.startTimer();
  game.updateStatus('set');
};

function randomStart(finalValues) {
  const numbers = [1,2,3,4,5,6,7];
  const centers = [0,7,13,19,23,28,33];
  let j;
  for (let i = numbers.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  for (let i = 0; i < 7; i++){
    finalValues[centers[i]]=numbers[i];
  }
};

function fillPuzzle(finalValues, data) {
  function isValid(pos, num) {
    for (let i=0; i < data.blocked[pos].length; i++) {
      if (finalValues[data.blocked[pos][i]]==num){
        return false;
      }
    }
    return true;
  }
  function findEmpty(){
    for (let i=0; i<37; i++){
      if (finalValues[i]==''){
        return i;
      }
    }
    return 99;
  }
  function backtrack(){
    const numbers = [1,2,3,4,5,6,7];
    let pos=findEmpty();
    if (pos==99) { 
      return true;
    }
    let j;
    for (let i=6; i>0; i--) {
      j=Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    for (let n=0; n<7; n++){
      const num=numbers[n];
      if (isValid(pos, num)){
        finalValues[pos]=num;
        if (backtrack()){
          return true;
        }
        finalValues[pos]='';
      }
    }
    return false;
  }
  backtrack();
};

function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment: function() {
      count++;
      return count;
    },
    reset: function() {
      count = initialValue;
      return count;
    },
    current: function() {
      return count;
    }
  };
};

function removeValues(data, game, newValues){
  const count = createCounter();
  let target=18;
  if (game.level == 'Medium'){
    target=32;
  }
  if (game.level == 'Hard'){
    target=110;
  }
  let attempts=0;
  let val;
  while (attempts<target){
    const pos=Math.floor(Math.random() * 37);
    val = newValues[pos];
    newValues[pos] = '';
    count.reset();
    singleSolution(data, game, newValues, count);
    if (count.current() > 1){
      newValues[pos] = val;
    }
    attempts++;
  }
};

function singleSolution(data, game, newValues, count){
  for (let i=0; i<37; i++) {
    const pos = newValues.findIndex(element => element === '');
    if (pos != -1) {
      for (let num=1; num<8; num++) {
        if (singleIsValid(data, pos, num, newValues)) {
          newValues[pos] = num;
          singleSolution(data, game, newValues, count);
          newValues[pos] = '';
          if (count.current() > 1){
            return;
          }
        }
      }
      return;
    }
    count.increment();
    return;
  }
};

function singleIsValid(data, pos, num, newValues) {
  const len=data.blocked[pos].length;
  for (let i=0; i<len; i++){
    if (newValues[data.blocked[pos][i]] == num){
      return false;
    }
  }
  return true;
};