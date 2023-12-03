import React, { useEffect } from "react";
import { getHours, getMinutes, getSeconds } from "../utils";

export function useTimer() {
  const timerRef = React.useRef<any>();
  const [time, setTime] = React.useState(0); // time in seconds
  const [startTime, setStartTime] = React.useState(null);
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
      setStartTime(Date.now());
      timerRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
  };

  const onStop = () => {
    if (timerRef.current) {
      // pause the timer
      clearTimer();
    }
    setTime(0);
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

  const endTime = startTime + time * 1000;

  return {
    hours,
    minutes,
    seconds,
    isRunning,
    onStart,
    onStop,
    time,
    startTime: new Date(startTime).toISOString(),
    endTime: new Date(endTime).toISOString(),
  };
}
