import './controlPanel.css';
import {useState} from 'react';

///* Labels *///
const DifficultyLabel = ({level}) => {
  return (
    <span>{level}</span>
  );
};
const PauseLabel = (props) => {
  const {game} = props;
  let label;
  if (game.status == 'paused'){
    label = 'Resume';
  } else {
    label = 'Pause';
  }
  return (
    <span>{label}</span>
  );
};

///* Control Button *///
function ControlButton (props){
  const {id, game, data, disable, size, onControlClick, buttonLabel} = props;
  const [transition, setTransition] = useState(false);
  const handleClick = () => {
    onControlClick(id);
    setTransition(!transition);
    setTimeout(() => {
      setTransition(false);
    }, 225);
  };
  const endTransition = () => {
    setTransition(false);
  };
  let className;
  switch (size) {
    case 'small':
      className ='control control-small';
      break;
    case 'medium':
      className ='control control-medium';
      break;
    case 'large':
      className ='control control-large';
      break;
    case 'xl':
      className ='control control-xl';
      break;
  }
  return (
    <>
      <div className={className}>
        <button className='control-base'></button>
        <button 
          className={`control-top ${transition ? 'transition' : ''}`}
          disabled={game.status == 'finished' ? true : disable}
          data={data}
          onClick={handleClick}
          onTransitionEnd={endTransition}>
            {buttonLabel}
        </button>  
      </div>
    </>
  );
};

///* Control Panel *///
export function ControlPanel (props){
  const {game, data} = props;
  const handleControlClick = (clickResult) => {
    props.onControlClick(clickResult);
  };
  return (
    <>
      <ControlButton id={'difficulty'} 
        game={game} data={data} size={'medium'} 
        disable={false} 
        onControlClick={handleControlClick}
        buttonLabel={<DifficultyLabel level={game.level} />} />
      <ControlButton id={'start'} 
        game={game} data={data} size={'small'} 
        disable={false} 
        onControlClick={handleControlClick} 
        buttonLabel={'Start'}/>
      <ControlButton id={'hint'} 
        game={game} data={data} size={'small'} 
        disable={false} 
        onControlClick={handleControlClick} 
        buttonLabel={'Hint'}/>
      <ControlButton id={'pause'} 
        game={game} data={data} size={'large'} 
        disable={game.status == 'waiting' ? true : false} 
        onControlClick={handleControlClick} 
        buttonLabel={<PauseLabel game={game} />} />
    </>
  );    
};