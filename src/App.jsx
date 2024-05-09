import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FaArrowUp} from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';

function App() {


const [sessionLength, setSessionLength] = React.useState(25);
const [breakLength, setBreakLength] = React.useState(5);

const [isPlaying, setIsPlaying] = React.useState(false);
const [isPaused, setIsPaused] = React.useState(false);

const [currentSec, setCurrentSec] = React.useState(25*60);

const [intervalID, setIntervalID] = React.useState(null);

const [timerTitle, setTimerTitle] = React.useState("Session");

const audioRef = useRef(null);

const [counter, setCounter] = React.useState(0);

React.useEffect(() => {
  if(currentSec === 0){
    audioRef.current.play();
    if(timerTitle === "Session"){
      setTimerTitle("Break");
      setCurrentSec(breakLength * 60);
    } else {
      setTimerTitle("Session");
      setCurrentSec(sessionLength * 60);
    }
  }
console.log('currentSec', currentSec)
console.log('timerTitle', timerTitle)
console.log('breakLength', breakLength)
console.log('sessionLength', sessionLength)
}, [currentSec, timerTitle]);

const playTimer = () => {
  console.log(isPlaying)
  console.log(isPaused)
  if(!isPlaying && !isPaused){
    setIsPlaying(true);
    setCurrentSec(sessionLength * 60);
    setIntervalID(setInterval(timerFunction, 1000));
  } else if(isPlaying && !isPaused){
    setIsPaused(true);
    clearInterval(intervalID);
  } else if(isPlaying && isPaused){
    setIsPaused(false);
    setIntervalID(setInterval(timerFunction, 1000));
  } 
}


const timerFunction = () => {
  setCurrentSec((prevCurrentSec) => prevCurrentSec - 1);
};

const handleReset = () => {
  clearInterval(intervalID);
  setIsPlaying(false);
  setIsPaused(false);
  setTimerTitle("Session");
  setBreakLength(5);
  setSessionLength(25);
  setCurrentSec(25*60);
  audioRef.current.pause();
  audioRef.current.currentTime = 0;
};

const formattedTime = () => {
  let seconds = currentSec % 60;
  let minutes = (currentSec - seconds) / 60;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;  
  minutes = (minutes < 10) ? `0${minutes}` : minutes;    
  return `${minutes}:${seconds}`;
}

const handleIncreaseBreak = () => {
  if(counter === 0 && !isPlaying && !isPaused && breakLength < 60){
    setBreakLength(breakLength + 1);
  }
};

const  handleDecreaseBreak = () => {
  if(counter === 0 && !isPlaying && !isPaused && breakLength > 1){
    setBreakLength(breakLength - 1);
  }
};

const handleIncreaseSession = () => {
  if(!isPlaying && !isPaused && sessionLength < 60){
    setSessionLength(sessionLength + 1);
    setCurrentSec(currentSec + 60);
  }
}

const handleDecreaseSession = () => {
  if(!isPlaying && !isPaused && sessionLength > 1){
    setSessionLength(sessionLength - 1);
    setCurrentSec(currentSec - 60);
  }
};

const title = timerTitle === "Session" ? "Session" : "Break";


return (
  <div>
  <div id="clock" className="ClockApp">
    <div id="container" className="clock-container">
        <div id="break-session-container">
        <div id="break-control">
          <div id="break-label" className="break">
              Break Length
          </div>
          <div id="break">
                <button id="break-decrement" onClick={handleDecreaseBreak}><FaArrowDown /></button>
                <div id="break-length">{breakLength}</div>
                <button id="break-increment" onClick={handleIncreaseBreak}><FaArrowUp /></button>
          </div>
        </div>
        <div id="session-control">
          <div id="session-label" className="session">
              Session Length
          </div>
          <div id="session">
              <button id="session-decrement" onClick={handleDecreaseSession}><FaArrowDown /></button>
              <div id="session-length">{sessionLength}</div>
              <button id="session-increment" onClick={handleIncreaseSession}><FaArrowUp /></button>
          </div>
        </div>
      </div>
      <div id="timer-container">
        <div id="timer">
            <div id="timer-label">
            {title}
            </div>
            <div id="time-left">
            {formattedTime()}
            </div>
        </div>
        <div id="timer-control">
           <button id="start_stop" onClick={playTimer}>Play/Pause</button>
           <button id="reset" onClick={handleReset}>Reset</button>
         </div>
      </div>
    </div>
    </div>
    <audio 
    id="beep"
    preload="auto" ref={audioRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" type="audio/mp3"></audio>
    </div>
  );
}

export default App;