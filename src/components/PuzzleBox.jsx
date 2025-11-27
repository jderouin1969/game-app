import {setColors} from '../utils/setColors.jsx'
import {formatTime} from '../utils/formatTime.jsx'
import {useState} from 'react';

function CircleText (props) {
  const {id, puzzle, game, data, onCircleClick} = props;
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
  const fontColor = (puzzle.clickable[id])
    ? data.color.fontLight
    : data.color.fontDark;
  const handleCircleClick = (pos) => {
    onCircleClick(pos);
  };
  if (id == game.lastClicked.current){
    document.documentElement.style.setProperty('--fillColor', fillColor);
  }
  fillColor = (puzzle.hint[id])
    ? 'orange'
    : fillColor;
  return (
    <>
      <circle key={`c${id}`} cx={data.position.centerX + (cx * data.position.stepX)} 
        cy={data.position.centerY + (cy * data.position.stepY)} r={data.position.circleRadius} 
        fill={fillColor} stroke={strokeColor} strokeWidth="3" 
        style={puzzle.clickable[id] 
          ? { cursor: 'pointer', outline: 'none' } 
          : {pointerEvents: 'none'}}
        className={(game.lastClicked.current == id) ? 'cursor' : ''} 
        onClick={() => handleCircleClick(id)}
        />
      <text key={`t${id}`} x={data.position.centerX + (cx * data.position.stepX)} 
        y={data.position.centerY + (cy * data.position.stepY) + 4} textAnchor='middle' 
        alignmentBaseline='middle' fontFamily="Helvetica" fontSize='2.5em' fontWeight='500'
        style={{textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', 
          pointerEvents: 'none' }}
        fill={fontColor}
        >
        {(game.status == 'paused') ? '' : puzzle.values[id]}
      </text>
    </>
  );
};

const PuzzleBox = (props) => {
  const {puzzle, game, data, onCircleClick, onCheckClick} = props;
  setColors(game, data);
  const handleCircleClick = (pos) => {
    onCircleClick(pos);
  };
  const [transition, setTransition] = useState(false);
  const handleCheckClick = () => {
    if (game.status != 'waiting' && game.status != 'paused') { 
      onCheckClick();
      setTransition(!transition);
      setTimeout(() => {
      setTransition(false);
      }, 225);
    }
  };
  const endTransition = () => {
    setTransition(false);
  };
  return (
    <svg viewBox="0 0 600 600" style={{width: '100%', height: '100%' }}>
      <g id='time-display'>
        <rect className='svg-shadow' x='-50' y='20' 
          width='105' height='45' fill={`${data.color.offWhite}`}  rx="15" ry="15" 
        />
        <text x='14' y='45' fontFamily="Arial" fontSize="32" fill={`${data.color.fontDark}`}
          textAnchor="middle" dominantBaseline="middle">{formatTime(game.time)}</text>
      </g>
      <g className={`checkButton ${transition ? 'transition' : ''}`}>
        <rect className='checkBase'  
          x='545' y='20' 
          width='105' height='45' fill={`${data.color.offWhite}`}  
          rx="15" ry="15"
        />
        <text className='checkText'
          x='595' y='45' 
          fontFamily="Arial" fontSize="26" fill={`${data.color.fontBlue}`}
          textAnchor="middle" dominantBaseline="middle">
          Check
        </text>
        <rect id='check-button' 
          x='545' y='20' 
          width='105' height='45' fill='transparent'  
          rx="15" ry="15"
          onClick={() => handleCheckClick()}
          onTransitionEnd={endTransition}
        />
      </g>
      {data.hexagon.map((num) => (
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
          game={props.game}
          puzzle={puzzle}
          data={data}
          onCircleClick={handleCircleClick}
          onCheckClick={handleCheckClick}
        />
      ))}
    </svg>
  );
};

export default PuzzleBox;