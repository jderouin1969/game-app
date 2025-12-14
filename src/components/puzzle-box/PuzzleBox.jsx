import './puzzleBox.css';
import {formatTime} from '../../utils/formatTime.jsx';
import {CombinedShadows} from './svgFilters.jsx';
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
    ? data.color.hint
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
        alignmentBaseline='middle' fontFamily='Helvetica' fontSize='44' fontWeight='500'
        style={{textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', 
          pointerEvents: 'none' }}
        fill={fontColor}
        >
        {(game.status == 'paused') ? '' : puzzle.values[id]}
      </text>
    </>
  );
};

export const PuzzleBox = (props) => {
  const {puzzle, game, data, onCircleClick, onCheckClick} = props;
  const [transition, setTransition] = useState(false);
  const handleCircleClick = (pos) => {
    onCircleClick(pos);
  };
  const handleCheckClick = () => {
    if (game.status != 'waiting' && game.status != 'paused') { 
      onCheckClick();
      setTransition(!transition);
      setTimeout(() => {
      setTransition(false);
      }, 225);
    }
  };
  const handleCheckHover = () => {
    if (game.status != 'waiting' && game.status != 'paused') { 
      const checkText = document.getElementById('check-text');
      checkText.setAttribute('class', 'check-text-hover');
    } 
  };
  const handleCheckLeave = () => {
    const checkText = document.getElementById('check-text');
    checkText.setAttribute('class', 'check-text'); 
  };
  const endTransition = () => {
    setTransition(false);
  };
  return (
    <svg viewBox='0 0 600 600' 
      style={{width: '100%', height: '100%' }}>
      <CombinedShadows/>
      <g style={{pointerEvents: 'none'}}>
        <rect className='time-display' 
          x='-40' y='20'
          width='102' height='40'
          rx='20' ry='20'/> 
        <text className='time-display-text' 
          x='24' y='44'
          fontSize='24'
          textAnchor='middle'
          dominantBaseline='middle'
          >
          {formatTime(game.time)}
        </text>
      </g>
      <g style={{cursor: 'pointer'}}>
        <rect className={`check-base ${transition ? 'transition' : ''}`}
          x='535' y='20' 
          width='102' height='40'
          rx='20' ry='20'
        />
        <text id='check-text' className={`check-text ${transition ? 'transition' : ''}`}
          x='585' y='42'
          fontSize='24' 
          textAnchor='middle' 
          dominantBaseline='middle'>
          Check
        </text>
        <rect className='check-click' 
          x='535' y='20' 
          width='102' height='40'
          rx='20' ry='20' 
          onClick={() => handleCheckClick()}
          onMouseEnter={() => handleCheckHover()}
          onMouseLeave={() => handleCheckLeave()}
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