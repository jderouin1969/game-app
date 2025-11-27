import {data} from './data.jsx'
import {handleDifficulty, handleNew, handlePause, handleCheck, handleHint,
  handleDirections, startNewGame} from './utils/controlHandles.jsx';
import {usePuzzle, useGame} from './components/hooks.jsx';
import {NewDialog, DifficultyDialog, DirectionsDialog, FinishedDialog} from './components/modals.jsx';
import MessageBox from './components/MessageBox.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import PuzzleBox from './components/PuzzleBox.jsx';
import NumberPanel from './components/NumberPanel.jsx';
import './App.css'
import {useEffect} from 'react';

///*** HexaduGame ***///
function HexaduGame(){
  const game = useGame();
  const puzzle = usePuzzle();
  const newValues = Array(37).fill('');
  const finalValues = Array(37).fill('');

  (function() {
    const gameSize = Math.min(window.innerWidth, window.innerHeight) * .99;
    document.documentElement.style.setProperty('--gameSize', `${gameSize}px`);
  })();
  function setDynamicSize() {
    const gameSize = Math.min(window.innerWidth, window.innerHeight) * .99;
    document.documentElement.style.setProperty('--gameSize', `${gameSize}px`);
  }
  window.addEventListener('resize', setDynamicSize);

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
  
  const handleNewYes = () => {
    game.updateStatus('waiting');
    game.setNewDialog(false);
    startNewGame(puzzle, game, data, newValues, finalValues);
  };
  const handleNewNo = () => {
    game.startTimer();
    game.updateStatus('running');
    game.setNewDialog(false);
  };

  const handleDifficultyYes = () => {
    game.updateStatus('waiting');
    game.setDifficultyDialog(false);
    game.updateLevel();
    startNewGame(puzzle, game, data, newValues, finalValues);
  };
  const handleDifficultyNo = () => {
    game.startTimer();
    game.updateStatus('running');
    game.setDifficultyDialog(false);
  };

  const handleFinishedReset = () => {
    switch (game.level) {
      case 'Easy':
        localStorage.setItem('easyCount', '0');
        localStorage.setItem('easyTime', '0');
        break;
      case 'Medium':
        localStorage.setItem('mediumCount', '0');
        localStorage.setItem('mediumTime', '0');
        break;
      default:
        localStorage.setItem('hardCount', '0');
        localStorage.setItem('hardTime', '0');
    }
  };
  
  const handleFinishedClose = () => {
    game.setFinishedDialog(false);
  };

  const handleDirectionsClose = () => {
    if (game.status == 'set' || game.status == 'running'){
      game.startTimer();
    }
    game.setDirectionsDialog(false);
  };

  /** Handle Game Clicks **/
  function handleControlClick(clickedControl){
    game.updateMessage('');
    game.lastClicked.current = 99;
    switch (clickedControl) {
      case 'difficulty':
        handleDifficulty(puzzle, game);
        break;
      case 'new':
        handleNew(puzzle, game, data, newValues, finalValues);
        break;
      case 'check':
        handleCheck(puzzle, game);
        break;
      case 'hint':
        handleHint(puzzle, game, data);
        break;
      case 'pause':
        handlePause(game);
        break;
      case 'directions':
        handleDirections(game);
        break;
    }
  };
  
  const handleCheckClick = () => {
    const checkButton = document.getElementById("check-button");
    if (checkButton){
      console.log("check button exists");
    }
    handleCheck(puzzle, game);
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
  /** Game Clicks **/ 
  return (
    <>
      <NewDialog 
        isOpen={game.newIsOpen} onYes={handleNewYes} onNo={handleNewNo}
      />
      <DifficultyDialog 
        isOpen={game.difficultyIsOpen} onYes={handleDifficultyYes} onNo={handleDifficultyNo}
      />
      <DirectionsDialog
        puzzle={puzzle}
        game={game}
        data={data}
        isOpen={game.directionsIsOpen} 
        onClose={handleDirectionsClose}
      />
      <FinishedDialog
        puzzle={puzzle}
        game={game}
        isOpen={game.finishedIsOpen} 
        onReset={handleFinishedReset} 
        onClose={handleFinishedClose}
      />
      <div className="game-container">
        <div className="message-box">
          <MessageBox newMessage={game.message}/>
        </div>
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
            game={game}
            data={data}
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
