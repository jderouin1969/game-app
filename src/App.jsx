import {data} from './shared/data.jsx'
import {usePuzzle, useGame, setCounts} from './utils/utilsIndex.jsx';
import {StartDialog, DifficultyDialog, FinishedDialog, DirectionsDialog} from './components/componentIndex.jsx';
import {ControlPanel, control, NavBar, NumberPanel, PuzzleBox} from './components/componentIndex.jsx';
import './App.css'
import {useEffect} from 'react';

///*** HexaduGame ***///
function HexaduGame() {
  const game = useGame();
  const puzzle = usePuzzle();
  const newValues = Array(37).fill('');
  const finalValues = Array(37).fill('');
  setCounts();

  /** Handle Game Clicks **/
  function handleControlClick(clickedControl){
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
  
  const handleCheckClick = () => {
    control.check(puzzle, game);
  };
  const handleCircleClick = (pos) => {
    game.updateMessage('');
    puzzle.resetHint();
    game.lastClicked.current = pos;
  };
  const handleNumberClick = (clickedNumber = '') => {
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
    };
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      const index = game.lastClicked.current;
      event.preventDefault();
      game.updateMessage('');
      if (((event.ctrlKey || event.metaKey) && event.key === 'z') &&
          (game.status != 'finished' && game.status != 'paused' && game.status != 'waiting'))
        {
        if (puzzle.getEntered().length > 0){
          puzzle.updateValues(puzzle.popEntered(), '');
        }
        game.lastClicked.current = 99;
      }
      if (event.key == 'Delete' || event.key == 'Backspace' || event.key == ' ') {
        puzzle.updateValues(index, '');
        if (puzzle.getEntered().includes(index)){
          puzzle.removeEntered(index);
        }
        game.lastClicked.current = 99;
      }
      const numbers = [1,2,3,4,5,6,7];
      if (numbers.includes(parseInt(event.key))) {
        puzzle.updateValues(index, parseInt(event.key));
        if (puzzle.getEntered().includes(index)){
          puzzle.removeEntered(index);
        }
        puzzle.pushEntered(index);
        game.updateStatus('running');
        game.lastClicked.current = 99;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.getEntered()]);
  return (
    <>
      <StartDialog
        puzzle={puzzle}
        game={game}
        data={data}
        newValues={newValues} 
        finalValues={finalValues}
      />
      <DifficultyDialog 
        puzzle={puzzle}
        game={game}
        data={data}
        newValues={newValues} 
        finalValues={finalValues}
      />
      <DirectionsDialog
        puzzle={puzzle}
        game={game}
        data={data}
      />
      <FinishedDialog
        game={game}
      />
      <NavBar
        game={game}
      />
      <div className='game-container'>
        <div className="control-panel">
          <ControlPanel
            game={game}
            data={data}
            onControlClick={handleControlClick}
          />
        </div>
        <div className={game.getAnimation() ? 'puzzle-box-animation' : 'puzzle-box'}>
          <PuzzleBox
            puzzle={puzzle}
            game={game}
            data={data}
            onCircleClick={handleCircleClick}
            onCheckClick={handleCheckClick}
          />
        </div>
        <div className="number-panel">
          <NumberPanel
            onNumberClick={handleNumberClick}
          />
        </div>
      </div>
    </>
  );
};

function App(){
  return (
    <>
      <HexaduGame/>
    </>
  );  
};

export default App;
