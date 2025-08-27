import { useEffect, useRef, useState } from "react";
import type { HistoricType } from "./historic.type";
import { useHandleHistoric } from "./useHandleHistoric";
import { useTimer } from "./useTimer";
import { formatTime } from "./utils";
import { tailwindMerge } from "./tailwindMerge";

type UnitType = "m" | "h";

type PredefinitionProps = {
  value: number;
  unity: UnitType;
  onClick: () => void;
};

const Predefinition = ({ unity, value, onClick }: PredefinitionProps) => {
  return (
    <button
      type="button"
      className="bg-[#60abbf] cursor-pointer text-white font-black flex flex-col rounded-full p-2 aspect-square items-center justify-center border-white border-8"
      onClick={() => onClick()}
    >
      <span className="text-[10vw] leading-[6vw]">{value}</span>
      <span className="text-[4vw] font-normal">{unity}</span>
    </button>
  );
};

const SvgX = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
    </svg>
  );
};

const SvgPlay = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
    </svg>
  );
};

const SvgStop = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
    </svg>
  );
};

const Historic = ({
  timer,
  text,
  deleteItem,
}: Omit<HistoricType, "id"> & { deleteItem: () => void }) => {
  return (
    <div className="px-[3vw] flex items-center justify-center">
      <div className="overflow-hidden flex gap-2 flex-1">
        <div className="text-blue-400 text-[5vw]">{timer}</div>

        <span className="text-blue-400 text-[5vw] whitespace-nowrap block overflow-ellipsis flex-1">
          {text}
        </span>
      </div>

      <button
        type="button"
        className="text-blue-400  text-[5vw] p-2 rounded-full"
        onClick={() => deleteItem()}
      >
        <SvgX />
      </button>
    </div>
  );
};

const listPredefinitions: {
  value: number;
  unity: UnitType;
  valueInSeconds: number;
}[] = [
    {
      unity: "m",
      value: 5,
      valueInSeconds: 60 * 5,
    },
    {
      unity: "m",
      value: 10,
      valueInSeconds: 60 * 10,
    },
    {
      unity: "m",
      value: 15,
      valueInSeconds: 60 * 15,
    },
    {
      unity: "m",
      value: 30,
      valueInSeconds: 60 * 30,
    },
    {
      unity: "m",
      value: 45,
      valueInSeconds: 60 * 45,
    },
    {
      unity: "h",
      value: 1,
      valueInSeconds: 60 * 60 * 1,
    },
    {
      unity: "h",
      value: 2,
      valueInSeconds: 60 * 60 * 2,
    },
    {
      unity: "h",
      value: 3,
      valueInSeconds: 60 * 60 * 3,
    },
    {
      unity: "h",
      value: 4,
      valueInSeconds: 60 * 60 * 4,
    },
  ];

export function App() {
  const [input, setInput] = useState<string>("");
  const { addItem, deleteItem, historic } = useHandleHistoric();
  const { isRunning, setTarget, timer, tooglePlayPause, play } = useTimer();
  const [currentScreen, setCurrentScreen] = useState<"cronometer" | "home">(
    "home"
  );

  // timer circle
  const refTimer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refTimer.current) {
      const percent =
        timer.timer === 0 || timer.target === 0
          ? 0
          : (100 * timer.timer) / timer.target;

      refTimer.current.style.background = `conic-gradient(oklch(0.7 0.08 217) ${percent}%, #444 0)`;
    }

    if (timer.timer === 0 && timer.target != 0 && timer.targetName) {
      addItem(timer.targetName, timer.missionTo);
    }
  }, [timer]);

  const styleCronometerIsOn = currentScreen === "cronometer" ? "" : "hidden";
  const styleHomeIsOn = currentScreen === "home" ? "" : "hidden";

  // timer circle
  return (
    <div>
      <div
        className={tailwindMerge(
          "flex items-center justify-center pt-[5vw]",
          styleCronometerIsOn
        )}
      >
        <div className="px-6 relative w-[80vw] h-[80vw]">
          <div
            className="w-[80vw] h-[80vw] rounded-[50%] timer text-white absolute left-0 to-0 z-0"
            ref={refTimer}
          >
            {" "}
          </div>
          <div className="w-[80vw] h-[80vw] flex flex-col  absolute left-0 to-0 z-10 text-white items-center justify-center">
            <div className="invisible">to use space</div>
            <div className="text-[4vw] min-h-[6vw]">{timer.targetName}</div>
            <div className="text-[14vw] leading-[15vw]">
              {formatTime(timer.timer)}
            </div>

            <div className="text-[4vw] min-h-[6vw]">
              {timer.missionTo ? `to ${timer.missionTo}` : ""}
            </div>
            <div className="pt-[3vw] flex gap-4">
              <button
                type="button"
                className="text-[7vw] p-[3vw] rounded-full aspect-square bg-gray-500"
                onClick={() => {
                  setTarget(0, "", "");
                  setCurrentScreen("home");
                }}
              >
                {" "}
                <SvgX />
              </button>
              <button
                type="button"
                className="text-[7vw] p-[3vw] rounded-full aspect-square bg-red-500"
                onClick={() => tooglePlayPause()}
              >
                {isRunning ? <SvgStop /> : <SvgPlay />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={tailwindMerge(styleHomeIsOn)}>
        <label
          htmlFor="to"
          className="flex items-center justify-center flex-col pt-[5vw] px-[3vw]"
        >
          <span className="sr-only">to</span>
          <input
            type="text"
            id="to"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="To"
            className="text-[4vw] px-3 py-2 bg-black outline-white border-white border-4 rounded-md placeholder:text-gray-500 w-full text-white"
          />
        </label>

        <section
          id="timer"
          className="grid grid-cols-3 gap-4 px-[3vw] pt-[4vw]"
        >
          {listPredefinitions.map((predefinition) => {
            return (
              <Predefinition
                onClick={() => {
                  setTarget(
                    predefinition.valueInSeconds,
                    predefinition.value.toString() + predefinition.unity,
                    input
                  );
                  play();
                  setCurrentScreen("cronometer");
                }}
                key={`${predefinition.value}-${predefinition.unity}`}
                unity={predefinition.unity}
                value={predefinition.value}
              />
            );
          })}
        </section>

        <section id="history" className="">
          <h1 className="text-white text-[5vw] text-center pt-[5vw]">
            history
          </h1>

          {historic.map((historicitem) => {
            return (
              <Historic
                key={historicitem.id}
                text={historicitem.text}
                timer={historicitem.timer}
                deleteItem={() => deleteItem(historicitem.id)}
              />
            );
          })}

          <h2 className="text-[3vw] text-gray-400 text-center">
            {historic.length === 0 ? "No Items" : ""}
          </h2>
        </section>
      </div>
    </div>
  );
}
