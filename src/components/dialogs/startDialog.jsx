import './dialogs.css';
import {startNewGame} from '../../utils/utilsIndex.jsx';

export function StartDialog(props) {
  const {puzzle, game, data, newValues, finalValues} = props;
  if (!game.startIsOpen) {
    return null;
  };
  const handleStartYes = () => {
    game.updateStatus('waiting');
    game.setStartDialog(false);
    startNewGame(puzzle, game, data, newValues, finalValues);
  };
  const handleStartNo = () => {
    game.startTimer();
    game.updateStatus('running');
    game.setStartDialog(false);
  };
  return (
    <div className='dialog-container'>
      <div className='dialog-small' onClick={(e) => e.stopPropagation()}>
          <p>Do you want to start a new game?</p>
          <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '1rem'}} >
            <button className='dialog-button' 
              onClick={() => handleStartYes()}>
              Yes
            </button>
            <button className='dialog-button' 
              onClick={() => handleStartNo()}>
              No
            </button>
          </div>
      </div>
    </div>
  );
};