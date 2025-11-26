import {setColors} from '../utils/setColors.jsx'
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

///* Control Buttons *///
function ControlButton (props){
  const {id, game, data, disable, onControlClick, buttonLabel} = props;
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
  return (
    <>
      <div className='control-container'>
        <button className='control-base'></button>
        <button 
          className={`control-top ${transition ? 'transition' : ''}`}
          disabled={game.status == 'finished' ? true : disable}
          data={data}
          onClick={handleClick}
          onTransitionEnd={endTransition}
          >
          {buttonLabel}
        </button>  
      </div>
    </>
  );
};

///* Control Panel *///
function ControlPanel (props){
  const {game, data} = props;
  setColors(game, data);
  const handleControlClick = (clickResult) => {
    props.onControlClick(clickResult);
  };
  return (
    <>
      <ControlButton id={'difficulty'} game={game} data={data} disable={false} 
        onControlClick={handleControlClick}
        buttonLabel={<DifficultyLabel level={game.level} />} />
      <ControlButton id={'new'} game={game} data={data} disable={false} 
        onControlClick={handleControlClick} buttonLabel={'New'}/>
      <ControlButton id={'check'} game={game} data={data}
        disable={(game.status == 'waiting' || game.status == 'paused') ? true : false} 
        onControlClick={handleControlClick} buttonLabel={'Check'}/>
      <ControlButton id={'hint'} game={game} data={data} disable={false} 
        onControlClick={handleControlClick} buttonLabel={'Hint'}/>
      <ControlButton id={'pause'} game={game} data={data} 
        disable={game.status == 'waiting' ? true : false} 
        onControlClick={handleControlClick} 
        buttonLabel={<PauseLabel game={game} />} />
      <ControlButton id={'directions'} game={game} data={data} disable={false} 
        onControlClick={handleControlClick} 
        buttonLabel={'Directions'}/>
    </>
  );    
};

export default ControlPanel;