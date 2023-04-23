import React, { useEffect } from "react";
import { getHours, getMinutes, getSeconds } from "./utils";

const Timer = () => {
  const timerRef = React.useRef<any>();
  const [time, setTime] = React.useState(0); // time in seconds
  const [isRunning, setRunning] = React.useState(false);

  const clearTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimer();
      }
    };
  }, []);

  const onStart = () => {
    if (timerRef.current) {
      // pause the timer
      clearTimer();
    } else {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
  };

  const formatTime = (time: number): string => {
    if (time < 10) {
      return "0" + time;
    }
    return time.toString();
  };

  const hours = formatTime(getHours(time));
  const minutes = formatTime(getMinutes(time));
  const seconds = formatTime(getSeconds(time));

  return (
    <>
      <div>
        {hours}:{minutes}:{seconds}
      </div>
      <button onClick={onStart}>
        {isRunning ? "Pause" : time ? "Resume" : "Start"}
      </button>
      <button>Reset</button>
    </>
  );
};

export default Timer;
