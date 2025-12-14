import './navBar.css';
import img from './favicon.png';
import {useState} from 'react';

export function NavBar (props){
  const {game} = props;
  const [transition, setTransition] = useState(false);
  const handleDirectionsClick = () => {
    setTransition(!transition);
    game.stopTimer();
    game.setDirectionsDialog(true);
    setTimeout(() => {
      setTransition(false);
    }, 225);
  };
  const endTransition = () => {
    setTransition(false);
  };
  return (
    <div className='nav-bar'>
      <div id='logo-box' className='logo-box'>
        <img src={img} className='logo-image'/>
      </div>
      <div className='message-box'>
        <MessageBox newMessage={game.message}/>
      </div>
      <div className='button-box'>
        <button className='directions-base'></button>
        <button className={`directions-top ${transition ? 'transition' : ''}`}
          onClick={handleDirectionsClick}
          onTransitionEnd={endTransition}
        >
          ?
        </button> 
      </div>
    </div>
  );
};

function MessageBox (props){
  return (
    <>
      {props.newMessage}
    </>
  );
};