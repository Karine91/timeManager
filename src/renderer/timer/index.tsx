import { useTimer } from "./hooks/useTimer";

const Timer = () => {
  const { hours, minutes, seconds, onStart, time, isRunning } = useTimer();

  return (
    <>
      <div>
        {hours}:{minutes}:{seconds}
      </div>
      <button onClick={onStart}>
        {isRunning ? "Pause" : time ? "Resume" : "Start"}
      </button>
      <button>Stop</button>
    </>
  );
};

export default Timer;
