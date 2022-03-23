import React from 'react';
import './Controls.css';

import { IoPlay } from 'react-icons/io5';
import { IoPause } from 'react-icons/io5';
import { IoStop } from 'react-icons/io5';
import { IoRepeat } from 'react-icons/io5';

const calculateTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(sec % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
};

const Controls = ({
  playPause,
  isPlaying,
  stopPlay,
  toggleLoop,
  currentTime,
  isLooping,
  // duration,
}) => {
  return (
    <div className='controls'>
      <div className='controls__button-container'>
        <button
          className={
            isPlaying ? 'controls__button playing' : 'controls__button'
          }
          onClick={playPause}
        >
          {isPlaying ? <IoPause /> : <IoPlay />}
        </button>
        <button className='controls__button' onClick={stopPlay}>
          <IoStop />
        </button>
        <button
          className={
            !isLooping ? 'controls__button' : 'controls__button active'
          }
          onClick={toggleLoop}
        >
          <IoRepeat />
        </button>
      </div>
      <div className='controls__time-container'>
        <div className='controls__time'>{calculateTime(currentTime)}</div>
        {/* used the lower div to debugg time left */}
        {/* <div>{(!isNaN(duration) && calculateTime(duration)) || '00:00'}</div> */}
      </div>
    </div>
  );
};

export default Controls;
