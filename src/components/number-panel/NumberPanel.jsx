import './numberPanel.css';
import {useState} from 'react';

///* Number Buttons *///
function NumberButton (props){
  const {onNumberClick, buttonId} = props;
  const [transition, setTransition] = useState(false);
  const handleClick = () => {
    if (buttonId != 'X'){
      onNumberClick(parseInt(buttonId));
    } else {
      onNumberClick('');
    }
    setTransition(!transition);
    setTimeout(() => {
      setTransition(false);
    }, 225);
  };
  const handleTransition = () => {
    setTransition(false);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='number-container'>
        <button className='number-base'></button>
        <button 
          className={`number-top ${transition ? 'transition' : ''}`}
          onClick={handleClick}
          onTransitionEnd={handleTransition}>
          {buttonId}
        </button> 
      </div>
    </div>
  );
};

///* Number Panel *///
export function NumberPanel (props){
  const {onNumberClick} = props;
  const buttonId = ['1', '2', '3', '4', '5', '6', '7', 'X'];
  const handleNumberClick = (clickResult) => {
    onNumberClick(clickResult);
  };
  return (
    <>
      {buttonId.map((id) => (
        <NumberButton key={id} buttonId={id} onNumberClick={handleNumberClick}/>
      ))}
    </>
  );
};