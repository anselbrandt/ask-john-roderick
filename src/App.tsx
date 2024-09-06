import { useEffect } from "react";
import { filelist } from "./filelist";
import "./App.css";
import { useAudioPlayerContext, Track } from "./context/audio-player-context";

function App() {
  const { audioRef, currentTrack, isPlaying, setIsPlaying, setCurrentTrack } =
    useAudioPlayerContext();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 50 / 100;
    }
  }, [audioRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }

    return () => {};
  }, [isPlaying, audioRef]);

  const handleClick = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <>
      <div>
        <a href="https://www.johnroderick.com/" className="logo">
          <h1>Ask John Roderick</h1>
        </a>
      </div>
      <div>
        <audio
          src={`/audio/roadwork/001/${currentTrack.file}`}
          ref={audioRef}
          onLoadedMetadata={() => ({})}
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
