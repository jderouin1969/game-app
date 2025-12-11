import './dialogs.css';
import {startNewGame} from '../../utils/utilsIndex.jsx';

export function DifficultyDialog(props) {
  const {puzzle, game, data, newValues, finalValues} = props;
  if (!game.difficultyIsOpen) {
    return null;
  }
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
  return (
    <div className="dialog-container">
      <div className='dialog-small' onClick={(e) => e.stopPropagation()}>
          <p>End game and change difficulty?</p>
          <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '1rem'}} >
            <button className='dialog-button' 
              onClick={handleDifficultyYes}>
              Yes
            </button>
            <button className='dialog-button' 
              onClick={handleDifficultyNo}>
              No
            </button>
          </div>
      </div>
    </div>
  );
};