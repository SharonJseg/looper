import React, { useState } from 'react';
import './Track.css';
import { IoVolumeHigh } from 'react-icons/io5';
import { IoVolumeMute } from 'react-icons/io5';

function Track({ onMute, track }) {
  const [mute, setIsMute] = useState(false);

  const toggleMute = () => {
    setIsMute(() => !mute);
    onMute(track.audio);
  };

  return (
    <div className='track__container'>
      <div className='track__details'>
        <button className='track__mute' onClick={toggleMute}>
          {mute ? <IoVolumeHigh size={28} /> : <IoVolumeMute size={28} />}
        </button>
        <p className='track__name'>{track.name}</p>
      </div>
      <audio src={track.audio} preload='metadata' loop></audio>
    </div>
  );
}

export default Track;
