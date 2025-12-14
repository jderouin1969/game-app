import {data} from './shared/data.jsx'
import {usePuzzle, useGame, setCounts} from './utils/utilsIndex.jsx';
import {StartDialog, DifficultyDialog, FinishedDialog, DirectionsDialog} from './components/componentIndex.jsx';
import {control} from './components/componentIndex.jsx';
import {handleControlClick, handleCircleClick, handleCheckClick, handleNumberClick} from './components/componentIndex.jsx';
import {NavBar, ControlPanel, NumberPanel, PuzzleBox} from './components/componentIndex.jsx';
import './App.css'
import {useEffect} from 'react';

///*** HexaduGame ***///
function HexaduGame() {
  const game = useGame();
  const puzzle = usePuzzle();
  const newValues = Array(37).fill('');
  const finalValues = Array(37).fill('');

  (function() {updateDimensions();})();
  window.addEventListener('resize', () => {updateDimensions()});

  function updateDimensions() {
    const width=window.innerWidth;
    const height=window.innerHeight;
    if (width > (height*.95)) {
      document.documentElement.style.setProperty('--gameSize', '93dvh');
      document.documentElement.style.setProperty('--nav-height', '6dvh');
    } else {
      document.documentElement.style.setProperty('--gameSize', '99dvw');
      document.documentElement.style.setProperty('--nav-height', '6.5dvw');
    }
  };

  setCounts();
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
            onControlClick={(event) => handleControlClick(event, game, puzzle, data, control, newValues, finalValues )}
          />
        </div>
        <div className={game.getAnimation() ? 'puzzle-box-animation' : 'puzzle-box'}>
          <PuzzleBox
            puzzle={puzzle}
            game={game}
            data={data}
            onCircleClick={(event) => handleCircleClick(event, game, puzzle)}
            onCheckClick={() => handleCheckClick(game, puzzle, data, control, newValues, finalValues)}
          />
        </div>
        <div className="number-panel">
          <NumberPanel
            onNumberClick={(event) => handleNumberClick(event, game, puzzle)}
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