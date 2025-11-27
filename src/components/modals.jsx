import {setColors} from '../utils/setColors.jsx'
import {formatTime} from '../utils/formatTime.jsx'
import {useState} from 'react';

export function NewDialog({ isOpen, onYes, onNo }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="dialog-container">
      <div className="dialog-small" onClick={(e) => e.stopPropagation()}>
          <p>Do you want to start a new game?</p>
          <button className='dialog-button' 
            style={{margin: '0px 15px 20px 15px'}} 
            onClick={onYes}>
            Yes
          </button>
          <button className='dialog-button' 
            style={{margin: '0px 15px 20px 15px'}} 
            onClick={onNo}>
            No
          </button>
      </div>
    </div>
  );
};

export function DifficultyDialog({ isOpen, onYes, onNo }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="dialog-container">
      <div className='dialog-small' onClick={(e) => e.stopPropagation()}>
          <p>End game and change difficulty?</p>
          <button className='dialog-button'
            style={{margin: '-20px 15px 20px 15px'}} 
            onClick={onYes}>
            Yes
          </button>
          <button className='dialog-button'
            style={{margin: '-20px 15px 20px 15px'}} 
            onClick={onNo}>
            No
          </button>
      </div>
    </div>
  );
};

export function FinishedDialog(props) {
  const {game, isOpen, onReset, onClose} = props;
  if (!isOpen) {
    return null;
  }
  const timeString=formatTime(game.time);
  const level=game.level;
  let count, avgTime;

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
  
  return (
    <div className="dialog-container">
      <div className='dialog-small' onClick={(e) => e.stopPropagation()}>
        <p style={{fontSize: '2dvw', marginBottom: '0dvw', color: 'blue'}}>
        You finished in {timeString}!</p>
        <p style={{fontSize: '1.3dvw', marginTop: '1dvw', marginBottom: '0dvw'}}>
        You have completed {count} {level} puzzles.</p>
        <p style={{fontSize: '1.3dvw', marginTop: '1dvw'}}>
        Average time: {avgTime}</p>
        <button className='dialog-button'
          style={{margin: '-20px 15px 20px 15px'}} 
          onClick={onReset}>
          Reset
        </button>
        <button className='dialog-button'
          style={{margin: '-20px 15px 20px 15px'}} 
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export function DirectionsDialog(props) {
  const {puzzle, game, data, isOpen, onClose} = props;
  const [rule, setRule] = useState('none');
  const directionsValues = [2,1,5,4,7,6,3,6,1,4,2,3,5,4,6,2,7,5,
    1,3,1,4,2,5,4,2,7,6,1,4,3,6,7,7,5,1,2];
  if (!isOpen) {
    return null;
  }
  const handleHex = () => {
    setRule('hex');
  };
  const handleCenters = () => {
    setRule('center');
  };
  const handleAxis = () => {
    setRule('axis');
  };
  const handleAdjacent = () => {
    setRule('adjacent');
  };
  const handleMouseOut = () => {
    setRule('none');
  };
  return (
    <div className="dialog-container">    
      <div className='dialog-directions' onClick={(e) => e.stopPropagation()}>
        <div className='directions-hexadu'>
          <ul className='directions-hexadu-list'>
            <li className='hexadu-li' style={{color: (rule == 'hex') ? 'blue' : data.color.fontDark}} 
              onClick={() => handleHex()}
              onMouseOver={() => handleHex()}
              onMouseOut={() => handleMouseOut()}
              >
              Each hexagon must contain the numbers 1 through 7.
            </li>
            <li className='hexadu-li' style={{color: (rule == 'center') ? 'blue' : data.color.fontDark}}  
              onClick={() => handleCenters()}
              onMouseOver={() => handleCenters()}
              onMouseOut={() => handleMouseOut()}> 
              The hexagon centers must contain the numbers 1 through 7 without repeating a number in another center.</li>
            <li className='hexadu-li' style={{color: (rule == 'axis') ? 'blue' : data.color.fontDark}}  
              onClick={() => handleAxis()}
              onMouseOver={() => handleAxis()}
              onMouseOut={() => handleMouseOut()}
              >
              The three long diagonals must contain the numbers 1 through 7 without repeating a number along the same line.</li>
            <li className='hexadu-li' style={{color: (rule == 'adjacent') ? 'pink' : data.color.fontDark}}
              onClick={() => handleAdjacent()}
              onMouseOver={() => handleAdjacent()}
              onMouseOut={() => handleMouseOut()}>
              The same number can't be placed next to itself.</li>
          </ul>
          <p className='directions-p' >
            Click on a rule to see example.
          </p>
        </div>
        <DirectionsPuzzleBox
          rule={rule} 
          puzzle={puzzle}
          game={game}
          data={data}
          values={directionsValues}
        />
          <ul className='directions-game-list'>
            <li>Press <button className='example-button'>
              Easy</button> to change difficulty.</li>
            <li>Press <button className='example-button'>
              Start</button> to begin a new game.</li>
            <li>Press <button className='example-button'>
              Check</button> when finished or to see if all values are correct.</li>
          </ul>
          <button className='dialog-button directions-spanning'
            style={{margin: '-10px auto 10px auto'}} 
            onClick={onClose}>
            Close
          </button>
      </div>
    </div>
  );
};

function ErrorEllipse (props){
  const rule = props.rule;
  switch (rule){
    case 'none':
      return null;
    case 'hex':
      return(
        <ellipse cx='149' cy='111' rx='40' ry='80' transform='rotate(30 149 111)'
          fill='none' stroke='red' strokeWidth='3'/>
      );
    case 'center':
      return(
        <ellipse cx='173' cy='225' rx='45' ry='130' transform='rotate(30 173 220)'
          fill='none' stroke='red' strokeWidth='3'/>
      );
    case 'axis':
      return(
        <ellipse cx='321' cy='335' rx='50' ry='175' transform='rotate(330 321 335)'
          fill='none' stroke='red' strokeWidth='3'/>
      );
    case 'adjacent':
      return(
        <ellipse cx='105' cy='187' rx='40' ry='80' transform='rotate(30 105 187)'
          fill='none' stroke='red' strokeWidth='3'/>
      );
  }
};

function CircleText (props) {
  const {rule, id, data, values} = props;
  const cx = data.circle[id].cx;
  const cy = data.circle[id].cy;

  let fillColor;
  let strokeColor;
  if (data.circle[id].type == 'axis') {
    fillColor = data.color.axisFill;
    if (data.circle[id].center) {
      strokeColor = data.color.centerBorder;
    } else {
      strokeColor = data.color.axisBorder;
    }
  } else {
    fillColor = data.color.otherFill;
    strokeColor = data.color.otherBorder;
  }
  let fontColor = data.color.fontDark;
  switch (rule){
    case 'hex':
      values[1] = 5;
      if (id == 1 || id == 2) {
        fontColor = 'red';
      }
      break;
    case 'center':
      values[13] = 2;
      values[15] = 4;
      if (id == 0 || id == 13) {
        fontColor = 'red';
      }
      break;
    case 'axis':
      values[33] = 6;
      if (id == 5 || id == 33) {
        fontColor = 'red';
      }
      break;
    case 'adjacent':
      values[15] = 1;
      values[18] = 2;
      if (id == 1 || id == 15) {
        fontColor = 'red';
      }
      break;
  }
  return (
    <>
      <circle key={`c${id}`} cx={data.position.centerX + (cx * data.position.smallStepX)} 
        cy={data.position.centerY + (cy * data.position.smallStepY)} r={data.position.circleRadius} 
        fill={fillColor} stroke={strokeColor} strokeWidth="3" 
        />
      <text key={`t${id}`} x={data.position.centerX + (cx * data.position.smallStepX)} 
        y={data.position.centerY + (cy * data.position.smallStepY) + 4} textAnchor="middle" 
        alignmentBaseline="middle" style={{ pointerEvents: 'none' }} fill={fontColor}
        fontFamily="Helvetica" fontSize="1.5em" fontWeight="500">
        {values[id]}
      </text>
      <ErrorEllipse rule={rule}/>
    </>
  );
};

const DirectionsPuzzleBox = (props) => {
  const {rule, game, data, values} = props;
  setColors(game, data);
  return (
    <svg viewBox="0 0 600 600" style={{width: '100%', height: '100%' }}>
      {data.hexagonSmall.map((num) => (
        <polygon 
          key={`h${num.id}`} 
          points={`${num.x1} ${num.y1}, ${num.x2} ${num.y2},
            ${num.x3} ${num.y3}, ${num.x4} ${num.y4}, ${num.x5} ${num.y5},
            ${num.x6} ${num.y6}`} 
          fill='none' 
          stroke={`${data.color.hex}`} 
          strokeWidth='6'
        />
      ))}
      {data.circle.map((num) => (
        <CircleText key={`circleText${num.id}`} id={num.id}
          rule={rule}
          data={data}
          values={values}
        />
      ))}
    </svg>
  );
};