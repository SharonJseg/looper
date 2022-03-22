import React from 'react';

function Track({ onMute, track }) {
  const toggleMute = () => {
    onMute(track.audio);
  };

  return (
    <>
      <p>{track.name}</p>
      <button onClick={toggleMute}>mute</button>
      <audio src={track.audio} preload='metadata' loop></audio>
    </>
  );
}

export default Track;
