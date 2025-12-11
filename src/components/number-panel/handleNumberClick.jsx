export function handleNumberClick(clickedNumber='', game, puzzle) {
  game.updateMessage('');
  const index = game.lastClicked.current;
  const num = clickedNumber;
  if (index != 99) {
    game.updateStatus('running');
    puzzle.updateValues(index, num);
    if ((num == '') && (puzzle.getEntered().includes(index))) {
      puzzle.removeEntered(index);
    }
    if ((num != '') && (!puzzle.getEntered().includes(index))) {
      puzzle.pushEntered(index);
    }
    if ((num != '') && (puzzle.getEntered().includes(index))) {
      puzzle.removeEntered(index);
      puzzle.pushEntered(index);
    }
  game.lastClicked.current = 99;
  }
};