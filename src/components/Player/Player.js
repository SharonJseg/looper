import React, { useEffect, useRef, useState } from 'react';
import './Player.css';
import drums from '../../tracks/DRUMS.mp3';
import tambourine from '../../tracks/_tambourine_shake_higher.mp3';
import { TRACKS } from '../../utils/constants';
import Track from '../Track/Track';

import { IoPlay } from 'react-icons/io5';
import { IoPause } from 'react-icons/io5';
import { IoStop } from 'react-icons/io5';
import { IoRepeat } from 'react-icons/io5';

const Player = () => {
  const [trackArray, setTrackArray] = useState(TRACKS);
  const [isLooping, setIsLooping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioElement = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      trackArray.forEach((track) => {
        track.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      });
    } else {
      trackArray.forEach((track) => {
        track.pause();
        cancelAnimationFrame(animationRef.current);
      });
    }

    // if (!prevValue) {
    //   audioElement.current.play();
    //   animationRef.current = requestAnimationFrame(whilePlaying);
    // } else {
    //   audioElement.current.pause();
    //   cancelAnimationFrame(animationRef.current);
    // }
  };

  const stopPlay = () => {
    setIsPlaying(false);
    trackArray.forEach((track) => {
      track.pause();
      track.currentTime = 0;
    });
    // audioElement.current.pause();
    // audioElement.current.currentTime = 0;
  };

  const toggleMute = (trackID) => {
    trackID.muted = !trackID.muted;
    console.log(trackID.duration);
  };

  const toggleLoop = () => {
    trackArray.forEach((track) => {
      track.loop = !track.loop;
    });
  };

  const trackDuration = TRACKS[0].duration;

  useEffect(() => {
    const seconds = Math.floor(trackDuration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [TRACKS[0]?.loadedmetadata, TRACKS[0]?.readyState, trackDuration]);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    progressBar.current.value = TRACKS[0].currentTime;
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    TRACKS[0].currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div>
      <div>
        {/* // playlist */}
        {TRACKS.map((trackObj, index) => (
          <div className='audio' key={index}>
            {/* track */}
            <Track onMute={toggleMute} track={trackObj} />
            {/* <audio key={index} src={el.url} preload='metadata' loop></audio> */}
          </div>
        ))}
      </div>
      <audio ref={audioElement} src={drums} preload='metadata' loop></audio>

      <div className='controls'>
        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPause /> : <IoPlay />}
        </button>
        <button onClick={stopPlay}>
          <IoStop />
        </button>
        <button onClick={toggleLoop}>
          <IoRepeat />
        </button>
      </div>

      <input
        onChange={changeRange}
        type='range'
        defaultValue='0'
        ref={progressBar}
      />
      <div>{calculateTime(currentTime)}</div>
      <div>{!isNaN(duration) && calculateTime(duration)}</div>
    </div>
  );
};

export default Player;
