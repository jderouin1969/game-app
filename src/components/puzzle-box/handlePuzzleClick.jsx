import {finishScreen} from '../control-panel/controlHandles.jsx'

export function handleCircleClick(pos, game, puzzle) {
  game.updateMessage('');
  puzzle.resetHint();
  game.lastClicked.current = pos;
};

export function handleCheckClick(game, puzzle) {
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