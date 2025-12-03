import './navBar.css';

export function NavBar (props){
  const {game} = props;
  return (
    <div className='nav-bar'>
      <div className='message-box'>
        <MessageBox 
          newMessage={game.message}/>
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