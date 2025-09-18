import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import { AnimatePresence, motion } from "framer-motion";

export function Timer({ timeLeft }) {
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <div className="timer-container">
      <AnimatePresence mode="wait">
        {h != 0 && (
          <>
            <Counter fontSize={50}  value={h} places={[10, 1]} />:
          </>
        )}

        <>
          <Counter value={m} places={[10, 1]} />
          :
          <Counter value={s} places={[10, 1]} />
        </>
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [timerData, setTimerData] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });
  const [backgroundFile, setBackgroundFile] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function startTimer() {
    const totalSeconds =
      timerData.hours * 3600 + timerData.minutes * 60 + timerData.seconds;

    setTimeLeft(totalSeconds);
    setIsRunning(true);
  }

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <>
      {backgroundFile && (
        <img
          src={URL.createObjectURL(backgroundFile)}
          alt="Tło"
          className="background-file"
        />
      )}

      <Timer timeLeft={timeLeft} />

      <AnimatePresence mode="wait">
        {!isRunning && (
          <motion.form
            exit={{ opacity: 0 }}
            className="timer-wrapper"
            onSubmit={(e) => {
              e.preventDefault();
              startTimer();
            }}
            transition={{ type: "spring", damping: 23 }}
          >
            <motion.div
              className="timer-setup"
              exit={{ marginTop: "200vh" }}
              transition={{ ease: "circOut", duration: 2 }}
            >
              <div className="input-container">
                <input
                  type="file"
                  id="file-upload"
                  className="file-input"
                  onChange={(e) => {
                    setBackgroundFile(e.target.files[0]);
                  }}
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  Wybierz plik
                </label>
              </div>

              <div className="input-container">
                <p
                  className={
                    timerData.hours != null ? "input-text hidden" : "input-text"
                  }
                >
                  Godziny
                </p>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={timerData.hours != null ? timerData.hours : ""}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTimerData((prev) => ({
                      ...prev,
                      hours: value === "" ? null : Number(value),
                    }));
                  }}
                ></input>
              </div>

              <div className="input-container">
                <p
                  className={
                    timerData.minutes != null
                      ? "input-text hidden"
                      : "input-text"
                  }
                >
                  Minuty
                </p>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={timerData.minutes != null ? timerData.minutes : ""}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTimerData((prev) => ({
                      ...prev,
                      minutes: value === "" ? null : Number(value),
                    }));
                  }}
                />
              </div>

              <div className="input-container">
                <p
                  className={
                    timerData.seconds != null
                      ? "input-text hidden"
                      : "input-text"
                  }
                >
                  Sekundy
                </p>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={timerData.seconds != null ? timerData.seconds : ""}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTimerData((prev) => ({
                      ...prev,
                      seconds: value === "" ? null : Number(value),
                    }));
                  }}
                ></input>
              </div>
              <input
                type="submit"
                className="submit-button"
                value={"start"}
              ></input>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
