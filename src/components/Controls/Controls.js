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
  duration,
}) => {
  return (
    <div className='controls'>
      <button onClick={playPause}>
        {isPlaying ? <IoPause /> : <IoPlay />}
      </button>
      <button onClick={stopPlay}>
        <IoStop />
      </button>
      <button className='loop' onClick={toggleLoop}>
        <IoRepeat />
      </button>
      <div>{calculateTime(currentTime)}</div>
      <div>{(!isNaN(duration) && calculateTime(duration)) || '00:00'}</div>
    </div>
  );
};

export default Controls;
