import React from "react";
import useCustomVideoControls from "../../../hooks/useCustomVideoControls";
import { tailChase } from 'ldrs'

const VideoPlayer = ({ src }) => {

  tailChase.register()

  const {
    videoRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    isBuffering,
    playbackRate,
    changeSpeed,
  } = useCustomVideoControls();

  // Format time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="video-container">
      {/* Video element */}
      <video ref={videoRef} src={src} className="video" onClick={togglePlay} />

      {/* Loader while buffering */}
      {isBuffering && (
        <div className="loader-overlay">
          <l-tail-chase
            size="42"
            speed="1.75"
            color="#fff"
          ></l-tail-chase>
        </div>
      )}

      {/* Custom controls */}
      <div className="controls">
        <span onClick={togglePlay} className="play-button">
          {isPlaying ? "⏸️" : "▶️"}
        </span>
        <span className="time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => (videoRef.current.currentTime = e.target.value)}
          className="progress-bar"
        />
        <select value={playbackRate} onChange={changeSpeed} className="speed-control">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
