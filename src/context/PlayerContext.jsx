import { createContext,useEffect,useRef ,useState } from "react";
import { songsData } from "../assets/assets";

const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

   const audioRef = useRef();
   const seekBg = useRef();
   const seekBar = useRef();

   const [track,settrack] = useState(songsData[0]);
   const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
  currentTime: { minute: 0, second: 0 },
  totalTime: { minute: 0, second: 0 },
});

   
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }
 const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }
    const playWithId = async (id) => {
       await settrack(songsData[id]);
       await audioRef.current.play();
       setPlayStatus(true);

    };
    
  const previous = async () => {
    if (track.id > 0){
      await settrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    } 
  }

  const next = async () => {
    if (track.id < songsData.length - 1){
      await settrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    } 
  }

  const handleSeek = (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.clientWidth) * audioRef.current.duration)
  }

useEffect(() => {
  const updateTime = () => {
    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/ audioRef.current.duration * 100) ) + '%';
    setTime({
      currentTime: {
        minute: Math.floor(audioRef.current.currentTime / 60),
        second: Math.floor(audioRef.current.currentTime % 60),
      },
      totalTime: {
        minute: Math.floor(audioRef.current.duration / 60),
        second: Math.floor(audioRef.current.duration % 60),
      },
    });
  };

  const audio = audioRef.current;
  if (audio) {
    audio.ontimeupdate = updateTime;
  }

  return () => {
    if (audio) {
      audio.ontimeupdate = null; // cleanup
    }
  };
}, []);


    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        settrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
         pause,
         playWithId,
         previous,
         next,
         handleSeek
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export { PlayerContext, PlayerContextProvider };