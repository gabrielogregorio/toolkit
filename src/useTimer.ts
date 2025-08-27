import { useEffect, useState } from "react";
import { ONE_SECOND_IN_MS } from "./utils";

export const useTimer = () => {
  const [timer, setTimer] = useState<{
    timer: number;
    target: number;
    targetName: string;
    missionTo: string;
  }>({ target: 0, targetName: "", timer: 0, missionTo: "" });

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const defineTarget = (
    timeInSeonds: number,
    targetName: string,
    missionTo: string
  ) => {
    setTimer({
      target: timeInSeonds,
      targetName,
      timer: timeInSeonds,
      missionTo,
    });
  };

  const tooglePlayPause = () => {
    setIsRunning((prev) => !prev);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const play = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setTimer((prev) => {
          if (prev.timer > 0) {
            return {
              ...prev,
              timer: prev.timer - 1,
            };
          }
          return prev;
        });
      }
    }, ONE_SECOND_IN_MS);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    isRunning,
    pause,
    play,
    tooglePlayPause,
    setTarget: defineTarget,
    timer,
  };
};
