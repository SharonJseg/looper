import React, { useEffect, useRef, useState } from 'react';
import './Player.css';
import { TRACKS } from '../../utils/constants';
import TrackList from '../TrackList/TrackList';
import Controls from '../Controls/Controls';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBar = useRef();
  const animationRef = useRef();

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      TRACKS.forEach(({ audio }) => {
        audio.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      });
    } else {
      TRACKS.forEach(({ audio }) => {
        audio.pause();
        cancelAnimationFrame(animationRef.current);
      });
    }
  };

  const stopPlay = () => {
    setIsPlaying(false);
    TRACKS.forEach(({ audio }) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const toggleMute = (trackID) => {
    trackID.muted = !trackID.muted;
  };

  const toggleLoop = () => {
    TRACKS.forEach(({ audio }) => {
      audio.loop = !audio.loop;
    });
  };

  const trackDuration = TRACKS[0].audio.duration;

  useEffect(() => {
    const seconds = Math.floor(trackDuration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    TRACKS[0].audio?.loadedmetadata,
    TRACKS[0].audio?.readyState,
    trackDuration,
  ]);

  useEffect(() => {
    if (currentTime == 17 && TRACKS[0].audio.loop === false) {
      setIsPlaying(false);
    }
  }, [currentTime]);

  const whilePlaying = () => {
    progressBar.current.value = TRACKS[0].audio.currentTime;
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    TRACKS.forEach(({ audio }) => {
      audio.currentTime = progressBar.current.value;
    });
    setCurrentTime(progressBar.current.value);
  };

  return (
    <section className='player'>
      <input
        className='player__range'
        onChange={changeRange}
        type='range'
        min='0'
        max='17'
        defaultValue='0'
        ref={progressBar}
      />
      <TrackList tracks={TRACKS} onMute={toggleMute} />
      <Controls
        playPause={togglePlayPause}
        isPlaying={isPlaying}
        stopPlay={stopPlay}
        toggleLoop={toggleLoop}
        duration={duration}
        currentTime={currentTime}
      />
    </section>
  );
};

export default Player;
