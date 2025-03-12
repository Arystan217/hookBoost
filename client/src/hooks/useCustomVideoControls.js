import React, { useRef, useState, useEffect } from "react";

const useCustomVideoControls = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Toggle play/pause on click
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Update progress bar
  const updateProgress = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Handle buffering
  const handleWaiting = () => setIsBuffering(true);
  const handlePlaying = () => setIsBuffering(false);

  // Change playback speed
  const changeSpeed = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackRate(speed);
    videoRef.current.playbackRate = speed;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateProgress);
      videoRef.current.addEventListener("waiting", handleWaiting);
      videoRef.current.addEventListener("playing", handlePlaying);
      videoRef.current.addEventListener("loadedmetadata", () =>
        setDuration(videoRef.current.duration)
      );
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateProgress);
        videoRef.current.removeEventListener("waiting", handleWaiting);
        videoRef.current.removeEventListener("playing", handlePlaying);
        videoRef.current.removeEventListener("loadedmetadata", () =>
          setDuration(videoRef.current.duration)
        );
      }
    };
  }, []);

  return {
    videoRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    isBuffering,
    playbackRate,
    changeSpeed,
  };
};

export default useCustomVideoControls;
