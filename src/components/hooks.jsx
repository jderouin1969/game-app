import {useState, useEffect, useRef} from 'react';

export function usePuzzle() {  
  const [values, setArrayValues] = useState(Array(37).fill(''));
  const [finalValues, setArrayFinalValues] = useState(Array(37).fill(''));
  const [clickable, setNewClickable] = useState(Array(37).fill(false));
  const [hint, setNewHint] = useState(Array(37).fill(false));
  const [entered, setEntered] = useState([]);
  
  const setValues = (newArray) => {
    setArrayValues(newArray);
  }
  const updateValues = (index, value) => {
    setArrayValues((prevArray) =>
      prevArray.map((item, i) => (i === index ? value : item))
    );
  };
  const resetValues = () => {
    setArrayValues((prevArray) =>
      prevArray.map(() => (''))
    );
  };

  const replaceFinalValues = (newValues) => {
      setArrayFinalValues(Array.from(newValues));
  };

  const updateClickable = (index, value) => {
    setNewClickable((prevArray) =>
      prevArray.map((item, i) => (i === index ? value : item))
    );
  };

  const updateHint = (index, value) => {
    setNewHint((prevArray) =>
      prevArray.map((item, i) => (i === index ? value : item))
    );
  };
  const resetHint = () => {
    setNewHint((prevArray) =>
      prevArray.map(() => (false))
    );
  };

  const pushEntered = (indexValue) => 
    setEntered((prevArray) => [...prevArray, indexValue]
  );
  const popEntered = () => {
    const lastValue = entered[entered.length - 1];
    setEntered(prevItems => prevItems.slice(0, -1));
    return lastValue;
  };
  const removeEntered = (indexValue) => {
    const newItems = entered.filter(item => item !== indexValue);
    setEntered(newItems);
  };
  const getEntered = () => {return entered};
  const resetEntered = () => setEntered([]);

  return {values, finalValues, hint, clickable, entered, 
    setValues, updateValues, resetValues, replaceFinalValues, updateClickable, 
    updateHint, resetHint, pushEntered, popEntered, removeEntered,
    getEntered, resetEntered};
};

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
    
  const timerStart = () => {
    setIsRunning(true);
  };
  const timerStop = () => {
    setIsRunning(false);
  };
  const timerReset = () => {
    setIsRunning(false);
    setTime(0);
  };
  return {time, timerStart, timerStop, timerReset};
};

function useLevel() {
  const [count, setCount] = useState(0);
  const levelUpdate = () => setCount(prevCount => prevCount + 1);
  const number = count % 3;
  let level;
  switch (number) {
    case 1:
      level = 'Medium';
      break;
    case 2:
      level = 'Hard';
      break;
    default:
      level = 'Easy';
  }
  return {level, levelUpdate};
};

function useGameStatus() {
  const [status, setStatus] = useState('waiting');
  const statusUpdate =(newStatus) => {
    setStatus(newStatus);
  };
  return {status, statusUpdate};
};

function useMessage() {
  const [message, setMessage] = useState('');
  function messageUpdate(newMessage) {
    setMessage(newMessage);
  };
  return {message, messageUpdate};
};

export function useGame() {
  const {time, timerStart, timerStop, timerReset} = useTimer();
  const {level, levelUpdate} = useLevel();
  const {status, statusUpdate} = useGameStatus();
  const {message, messageUpdate} = useMessage();
  
  const startTimer = () => {
    timerStart();
  };
  const stopTimer = () => {
    timerStop();
  } ; 
  const resetTimer = () => {
    timerReset();
  };
  
  const updateLevel = () => {
    levelUpdate();
  };
  const updateStatus = (newStatus) => {
    statusUpdate(newStatus);
  };
  const updateMessage = (newMessage) => {
    messageUpdate(newMessage);
  };

  const animationId = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);    
  const animationRunning = (value) => {
    setStartAnimation(value);
  };
  const getAnimation = () => {
    return startAnimation;
  };

  const lastClicked = useRef(99);  

  const [startIsOpen, setStartIsOpen] = useState(false);  
  const setStartDialog = (value) => {
    setStartIsOpen(value);
  };

  const [difficultyIsOpen, setDifficultyIsOpen] = useState(false);  
  const setDifficultyDialog = (value) => {
    setDifficultyIsOpen(value);
  };

  const [directionsIsOpen, setDirectionsIsOpen] = useState(false);  
  const setDirectionsDialog = (value) => {
    setDirectionsIsOpen(value);
  };

  const [finishedIsOpen, setFinishedIsOpen] = useState(false);  
  const setFinishedDialog = (value) => {
    setFinishedIsOpen(value);
  };

  return {time, startTimer, stopTimer, resetTimer, level, updateLevel,
    status, updateStatus, message, updateMessage, 
    animationId, animationRunning, getAnimation, lastClicked, startIsOpen, setStartDialog,
    difficultyIsOpen, setDifficultyDialog, directionsIsOpen, setDirectionsDialog,
    finishedIsOpen, setFinishedDialog};
}; 