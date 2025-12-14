import './dialogs.css';
import {useState} from 'react';

export function DirectionsDialog(props) {
  const {puzzle, game, data} = props;
  const [rule, setRule] = useState('none');
  const directionsValues = [2,1,5,4,7,6,3,6,1,4,2,3,5,4,6,2,7,5,
    1,3,1,4,2,5,4,2,7,6,1,4,3,6,7,7,5,1,2];
  if (!game.directionsIsOpen) {
    return null;
  }
  const handleDirectionsClose = () => {
    if (game.status == 'set' || game.status == 'running'){
      game.startTimer();
    }
    game.setDirectionsDialog(false);
  };
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
    <div className='dialog-container'>    
      <div className='dialog-directions' onClick={(e) => e.stopPropagation()}>
        <DirectionsPuzzleBox className='directions-puzzle-box' 
          rule={rule} 
          puzzle={puzzle}
          data={data}
          values={directionsValues}
        />
        <p className='directions-tip' >
        Click on a rule to see example.
        </p>
        <ul className='directions-hexadu'>
          <li className='hexadu-li' style={{color: (rule == 'hex') ? 'blue' : data.color.fontDark,
            marginTop: '.5rem', marginBottom: '.5rem'}} 
            onClick={() => handleHex()}
            onMouseOver={() => handleHex()}
            onMouseOut={() => handleMouseOut()}
            >
            Each hexagon must contain the numbers 1 through 7.
          </li>
          <li className='hexadu-li' style={{color: (rule == 'center') ? 'blue' : data.color.fontDark,
            marginBottom: '.6rem'}}  
            onClick={() => handleCenters()}
            onMouseOver={() => handleCenters()}
            onMouseOut={() => handleMouseOut()}> 
            The hexagon centers must contain the numbers 1 through 7 without repeating a number in another center.
          </li>
          <li className='hexadu-li' style={{color: (rule == 'axis') ? 'blue' : data.color.fontDark,
            marginBottom: '.6rem'}}  
            onClick={() => handleAxis()}
            onMouseOver={() => handleAxis()}
            onMouseOut={() => handleMouseOut()}>
            The three long diagonals must contain the numbers 1 through 7 without repeating a number along the same line.
          </li>
          <li className='hexadu-li' style={{color: (rule == 'adjacent') ? 'blue' : data.color.fontDark,
            marginBottom: '.6rem'}}
            onClick={() => handleAdjacent()}
            onMouseOver={() => handleAdjacent()}
            onMouseOut={() => handleMouseOut()}>
            The same number can't be placed next to itself.
          </li>
          <li style={{marginBottom: '.6rem'}}>Press <button className='example-button'>
            Easy</button> to change difficulty.
          </li>
          <li style={{marginBottom: '.6rem'}}>Press <button className='example-button'>
            Start</button> to begin a new game.
          </li>
          <li style={{marginBottom: '0'}} >Press <button className='example-button'>
            Check</button> when finished or to see if all values are correct.
          </li>
        </ul>
        <div className='directions-button-container'>
          <button className='dialog-button'
            style={{margin: 'auto'}} 
            onClick={handleDirectionsClose}>
            Close
          </button>
        </div>
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
        fill={fillColor} stroke={strokeColor} strokeWidth='3' 
        />
      <text key={`t${id}`} x={data.position.centerX + (cx * data.position.smallStepX)} 
        y={data.position.centerY + (cy * data.position.smallStepY) + 4} textAnchor='middle' 
        alignmentBaseline='middle' style={{ pointerEvents: 'none' }} fill={fontColor}
        fontFamily='Helvetica' fontSize='30' fontWeight='500'>
        {values[id]}
      </text>
      <ErrorEllipse rule={rule}/>
    </>
  );
};

const DirectionsPuzzleBox = (props) => {
  const {rule, data, values} = props;
  return (
    <svg viewBox='0 0 600 600' style={{width: '100%', height: '90%'}}>
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