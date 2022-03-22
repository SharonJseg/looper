import React from 'react';

function Track({ onMute, track }) {
  //   console.log(track.name);
  //   let audioElement = props.audio;
  //   console.log(audioElement.current);

  const toggleMute = () => {
    onMute(track);
  };

  return (
    <>
      <p>Audio name {track.name}</p>
      <button onClick={toggleMute}>mute</button>
      <audio src={track.url} preload='metadata' loop></audio>
    </>
  );
}

export default Track;
