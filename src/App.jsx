import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import { AnimatePresence, motion } from "framer-motion";
const fonts = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Helvetica", value: "Helvetica, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier New", value: "Courier New, monospace" },
  { name: "Lucida Console", value: "Lucida Console, monospace" },
  { name: "Tahoma", value: "Tahoma, sans-serif" },
  { name: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { name: "Impact", value: "Impact, sans-serif" },
  { name: "Comic Sans MS", value: "Comic Sans MS, cursive" },
  { name: "Palatino Linotype", value: "Palatino Linotype, serif" },
  { name: "Book Antiqua", value: "Book Antiqua, serif" },
  { name: "Candara", value: "Candara, sans-serif" },
  { name: "Consolas", value: "Consolas, monospace" },
  { name: "Constantia", value: "Constantia, serif" },
  { name: "Corbel", value: "Corbel, sans-serif" },
  {
    name: "Franklin Gothic Medium",
    value: "Franklin Gothic Medium, sans-serif",
  },
  { name: "Futura", value: "Futura, sans-serif" },
  { name: "Garamond", value: "Garamond, serif" },
  { name: "Geneva", value: "Geneva, sans-serif" },
  { name: "Lucida Bright", value: "Lucida Bright, serif" },
  { name: "Lucida Sans Unicode", value: "Lucida Sans Unicode, sans-serif" },
  { name: "MS Sans Serif", value: "MS Sans Serif, sans-serif" },
  { name: "MS Serif", value: "MS Serif, serif" },
  { name: "Palatino", value: "Palatino, serif" },
  { name: "Perpetua", value: "Perpetua, serif" },
  { name: "Rockwell", value: "Rockwell, serif" },
  { name: "Gill Sans", value: "Gill Sans, sans-serif" },
  { name: "Optima", value: "Optima, sans-serif" },
  { name: "Didot", value: "Didot, serif" },
  { name: "Baskerville", value: "Baskerville, serif" },
  { name: "Avant Garde", value: "Avant Garde, sans-serif" },
  { name: "Arial Black", value: "Arial Black, sans-serif" },
  { name: "Century Gothic", value: "Century Gothic, sans-serif" },
  { name: "Lucida Handwriting", value: "Lucida Handwriting, cursive" },
  { name: "Brush Script MT", value: "Brush Script MT, cursive" },
  { name: "Copperplate", value: "Copperplate, serif" },
  { name: "Copperplate Gothic", value: "Copperplate Gothic, serif" },
  { name: "Papyrus", value: "Papyrus, fantasy" },
  { name: "Segoe UI", value: "Segoe UI, sans-serif" },
  { name: "Segoe Print", value: "Segoe Print, cursive" },
  { name: "Segoe Script", value: "Segoe Script, cursive" },
  { name: "Candara", value: "Candara, sans-serif" },
  { name: "Rockwell Extra Bold", value: "Rockwell Extra Bold, serif" },
  { name: "Trebuchet MS Bold", value: "Trebuchet MS Bold, sans-serif" },
  { name: "Franklin Gothic Book", value: "Franklin Gothic Book, sans-serif" },
  { name: "Gill Sans MT", value: "Gill Sans MT, sans-serif" },
  { name: "Lucida Grande", value: "Lucida Grande, sans-serif" },
  { name: "Tahoma Bold", value: "Tahoma Bold, sans-serif" },
  { name: "Verdana Bold", value: "Verdana Bold, sans-serif" },
  { name: "Helvetica Neue", value: "Helvetica Neue, sans-serif" },
];

export function Timer({ timeLeft }) {
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <div className="timer-container">
      <AnimatePresence mode="wait">
        {h != 0 && (
          <>
            <Counter fontSize={50} value={h} places={[10, 1]} />:
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

  const [timerSettings, setTimerSettings] = useState(() => {
    const saved = localStorage.getItem("timerSettings");
    return saved
      ? JSON.parse(saved)
      : {
          font: "Arial, sans-serif",
          color: "#ffffff",
          background: "#000000",
        };
  });

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

  useEffect(() => {
    localStorage.setItem("timerSettings", JSON.stringify(timerSettings));

    const root = document.getElementById("root");
    console.log(root);
    root.style.setProperty("--timer-font", timerSettings.font);
    root.style.setProperty("--timer-color", timerSettings.color);
    root.style.setProperty("--timer-bg", timerSettings.background);
  }, [timerSettings]);

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

              <div className="settings-container">
                <label>
                  Czcionka:
                  <select
                    value={timerSettings.font}
                    onChange={(e) =>
                      setTimerSettings({
                        ...timerSettings,
                        font: e.target.value,
                      })
                    }
                  >
                    {fonts.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Color picker dla tekstu */}
                <label>
                  Kolor tekstu:
                  <input
                    type="color"
                    value={timerSettings.color}
                    onChange={(e) =>
                      setTimerSettings({
                        ...timerSettings,
                        color: e.target.value,
                      })
                    }
                  />
                </label>

                {/* Color picker dla tła */}
                <label>
                  Kolor tła:
                  <input
                    type="color"
                    value={timerSettings.background}
                    onChange={(e) =>
                      setTimerSettings({
                        ...timerSettings,
                        background: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <input
                type="submit"
                className="submit-button"
                value={"start"}
              ></input>
            </motion.div>
            <div className="timer-container">
              <AnimatePresence mode="wait">
                {timerData.hours != 0 && (
                  <>
                    <Counter
                      fontSize={50}
                      value={timerData.hours}
                      places={[10, 1]}
                    />
                    :
                  </>
                )}

                <>
                  <Counter value={timerData.minutes} places={[10, 1]} />
                  :
                  <Counter value={timerData.seconds} places={[10, 1]} />
                </>
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
