import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList({ tracks, onMute }) {
  return (
    <div className='tracks__container'>
      <ul>
        {tracks.map((trackObj, index) => (
          <li className='track__item' key={index}>
            <Track onMute={onMute} track={trackObj} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
