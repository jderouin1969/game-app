import './dialogs.css';
import {formatTime} from '../../utils/utilsIndex.jsx';

export function FinishedDialog(props) {
  const {game} = props;
  if (!game.finishedIsOpen) {
    return null;
  }
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
  const timeString=formatTime(game.time);
  let count, avgTime, puzzles;
  switch (game.level) {
    case 'Easy':
      count = parseInt(localStorage.getItem('easyCount'));
      avgTime = formatTime(parseInt(localStorage.getItem('easyTime')) / count);
    break;
    case 'Medium':
      count = parseInt(localStorage.getItem('mediumCount'));
      avgTime = formatTime(parseInt(localStorage.getItem('mediumTime')) / count);
    break;
    default:
      count = parseInt(localStorage.getItem('hardCount'));
      avgTime = formatTime(parseInt(localStorage.getItem('hardTime')) / count);
  }
  if (count > 1){
    puzzles='puzzles';
  } else {
    puzzles='puzzle';
  };
  return (
    <div className='dialog-container'>
      <div className='dialog-small' onClick={(e) => e.stopPropagation()}>
        <p className='finished-p1'>
          You finished in {timeString}!
        </p>
        <p className='finished-p2-p3'>
          You have completed {count} {game.level} {puzzles}.
        </p>
        <p className='finished-p2-p3' style={{marginBottom: '.5rem'}}>
          Average time:  {avgTime}
        </p>
        <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '1rem'}} >
          <button className='dialog-button' 
            onClick={handleFinishedReset}>
            Reset
          </button>
          <button className='dialog-button' 
            onClick={handleFinishedClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};