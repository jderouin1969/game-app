import './puzzleBox.css';
import {formatTime} from '../../utils/formatTime.jsx'
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
      const checkButton = document.getElementById('checkText');
      checkButton.setAttribute('fill', `${data.color.fontGreen}`);
    } 
  };
  const handleCheckLeave = () => {
    const checkButton = document.getElementById('checkText');
    checkButton.setAttribute('fill', `${data.color.fontBlue}`); 
  };
  const endTransition = () => {
    setTransition(false);
  };
  return (
    <svg viewBox="0 0 600 600" 
      style={{width: '100%', height: '100%' }}>
      <defs>
        <filter id="combined-shadows" 
          x="-50%" y="-50%" 
          width="200%" height="200%">
          <feDropShadow dx='2' dy='4' stdDeviation='5' 
            floodColor="black" floodOpacity='0.7' result='dropShadow'/>
          <feOffset dx='-2' dy='-5'/>
          <feGaussianBlur stdDeviation='6' result='offset-blur'/>
          <feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse'/>
          <feFlood floodColor='black' floodOpacity='.99' result='color'/>
          <feComposite operator='in' in='color' in2='inverse' result='shadow'/>
          <feComposite operator='over' in='shadow' in2='SourceGraphic' result='blur'/>
          <feMerge>
            <feMergeNode in="dropShadow" />
            <feMergeNode in="blur" />
          </feMerge>
        </filter>
      </defs> 
            <defs>
        <filter id="combined-shadows-transition" 
          x="-50%" y="-50%" 
          width="200%" height="200%">
          <feDropShadow dx='1' dy='1' stdDeviation='3' 
            floodColor='black' floodOpacity='0.6' result='dropShadow'/>
          <feOffset dx='0' dy='0'/>
          <feGaussianBlur stdDeviation='6' result='offset-blur'/>
          <feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse'/>
          <feFlood floodColor='black' floodOpacity='.85' result='color'/>
          <feComposite operator='in' in='color' in2='inverse' result='shadow'/>
          <feComposite operator='over' in='shadow' in2='SourceGraphic' result='blur'/>
          <feMerge>
            <feMergeNode in="dropShadow"/>
            <feMergeNode in="blur"/>
          </feMerge>
        </filter>
      </defs> 
      <g style={{pointerEvents: 'none'}}>
        <rect className='filtered-rect' x='-40' y='20' 
          width='105' height='45' 
          fill={`${data.color.offWhite}`}
          rx="20" ry="20" 
        />
        <text
          x='24' y='45' 
          fontFamily="Arial" fontSize="32" 
          fill={`${data.color.fontBlue}`}
          textAnchor="middle" dominantBaseline="middle">
          {formatTime(game.time)}
        </text>
      </g>
      <g style={{cursor: 'pointer'}}>
        <rect className={`checkBase ${transition ? 'transition' : ''}`}
          x='535' y='20' 
          width='105' height='45'
          fill={`${data.color.offWhite}`}
          filter="url(#combined-shadows)"
          rx="20" ry="20"
        />
        <text id='checkText'
          x='585' y='45' 
          fill={`${data.color.fontBlue}`}
          fontFamily='Arial' fontSize='26' 
          textAnchor='middle' dominantBaseline='middle'>
          Check
        </text>
        <rect id='check-button' 
          x='535' y='20' 
          width='105' height='45' 
          fill='transparent'  
          rx="15" ry="15"
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