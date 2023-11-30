import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContext = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorStarted = useRef(false);
  const [volume, setVolume] = useState(10)
  const [pitch, setPitch] = useState()

  useEffect(() => {
    // Create the audio context and the nodes only once
    audioContext.current = new AudioContext();
    oscillatorRef.current = audioContext.current.createOscillator();
    gainNodeRef.current = audioContext.current.createGain();

    // Set the frequency and the gain values
    
    // Connect the nodes together
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.current.destination);
    
    // Clean up the nodes when the component unmounts
    return () => {
      oscillatorRef.current.disconnect();
      gainNodeRef.current.disconnect();
    };
  }, []);
  
  const handleAudioPlayback = () => {
    // Toggle the isPlaying state
    setIsPlaying((prev) => !prev);
    
    // Start or stop the oscillator depending on the state
    if (!isPlaying) {
      // Start the oscillator only if it is not already started
      if (!oscillatorStarted.current) {
        oscillatorRef.current.start();
        oscillatorStarted.current = true;
      }
    } else {
      // Stop the oscillator only if it is already started
      if (oscillatorStarted.current) {
        oscillatorRef.current.frequency.value = 500 || pitch;
        gainNodeRef.current.gain.value = 0.25 ||  volume / 100;
        oscillatorRef.current.stop();
        oscillatorStarted.current = false;
      }
    }
  };

  useEffect(() => {
  handleAudioPlayback()
})

  return (
    <div className="App">
      {/* <button onClick={handleAudioPlayback}>{isPlaying ? "Stop" : "Start"}</button> */}
      <input type="range" name="pitch" value={pitch} max="15000" onChange={(e) => setPitch(e.target.value)} id="" />
      <input type="number" name="volume" max="100" min='5' value={volume} onChange={(e) => setVolume(e.target.value)} id="" />
    </div>
  );
}

export default App;

