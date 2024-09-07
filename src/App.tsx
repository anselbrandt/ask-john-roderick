import { useEffect, useCallback } from "react";
import { filelist } from "./filelist";
import "./App.css";
import { useAudioPlayerContext, Track } from "./context/audio-player-context";

function App() {
  const {
    currentTrack,
    audioRef,
    setDuration,
    duration,
    setTimeProgress,
    progressBarRef,
    setTrackIndex,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
  } = useAudioPlayerContext();

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);

      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      updateProgress(); // Ensure progress is updated immediately when paused
    }

    return () => {};
  }, [isPlaying, updateProgress, audioRef]);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };

  const handleNext = useCallback(() => {
    setTrackIndex((prev) => {
      const newIndex = prev >= filelist.length - 1 ? 0 : prev + 1;
      setCurrentTrack(filelist[newIndex]);
      return newIndex;
    });
  }, [setCurrentTrack, setTrackIndex]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        handleNext();
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [handleNext, audioRef]);

  const handleClick = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="header">
        <div>
          <div className="logo">
            <a href="https://www.johnroderick.com/">
              <h1>Ask John Roderick</h1>
            </a>
          </div>
          <div className="searchbar">search bar</div>
        </div>
      </div>
      <div>
        <audio
          src={`/audio/roadwork/001/${currentTrack.file}`}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
      </div>

      <div className="results">
        {filelist.map((entry, idx) => (
          <span
            key={idx}
            onClick={() => handleClick(entry)}
            className="sentence"
          >
            {entry.text}
          </span>
        ))}
      </div>
    </>
  );
}

export default App;
