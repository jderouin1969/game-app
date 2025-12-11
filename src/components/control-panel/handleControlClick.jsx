export function handleControlClick(clickedControl, game, puzzle, data, control, newValues, finalValues){
  game.updateMessage('');
  game.lastClicked.current = 99;
  switch (clickedControl) {
    case 'difficulty':
      control.difficulty(puzzle, game);
      break;
    case 'start':
      control.start(puzzle, game, data, newValues, finalValues);
      break;
    case 'hint':
      control.hint(puzzle, game, data);
      break;
    case 'pause':
      control.pause(game);
      break;
    case 'directions':
      control.directions(game);
      break;
  }
};

