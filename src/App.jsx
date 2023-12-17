import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleClick = (e) => {
    const displayValue = e.target.innerHTML;
    if ("1234567890.".includes(displayValue)) {
      setValue2((preValue) => preValue + displayValue);
    } else {
      if (displayValue == "C") {
        setValue1("");
        setValue2("");
      } else if (displayValue == "DEL") {
        setValue2((value2) => {
          if (value2 != "") {
            console.log(`Value2: ${value2}`);
            return value2.slice(0, -1);
          } else {
            setValue1((value1) => {
              if (value1 != "") {
                console.log(`Value1: ${value1}`);
                return value1.slice(0, -1);
              } else {
                return "";
              }
            });
            return "";
          }
        });
      } else if (displayValue == "=") {
        setValue1((value1) => {
          setValue2((value2) => {
            if (value1 || value2) {
              try {
                return evaluate(value1 + value2);
              } catch (err) {
                return "Syntax Err";
              }
            } else return "🤨..!?";
          });
          return "";
        });
      } else {
        setValue2((value1) => {
          setValue1((value2) => {
            return value2 + value1 + displayValue;
          });
          return "";
        });
      }
    }
  };

  const evaluate = (e) => {
    console.log(`Expression: ${e} | value: ${eval(e)}`);
    return eval(e).toString();
  };

  useEffect(() => {
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", handleClick);
    });
    return () => {
      btns.forEach((btn) => {
        btn.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">
          <input readOnly id="small" type="text" value={value1} />
          <input readOnly id="big" type="text" value={value2} />
        </div>
        <div className="keypad">
          <button className="btn gray">C</button>
          <button className="btn gray">DEL</button>
          <button className="btn gray"> %</button>
          <button className="btn orange">/</button>
          <button className="btn black">7</button>
          <button className="btn black">8</button>
          <button className="btn black">9</button>
          <button className="btn orange">*</button>
          <button className="btn black">4</button>
          <button className="btn black">5</button>
          <button className="btn black">6</button>
          <button className="btn orange">-</button>
          <button className="btn black">1</button>
          <button className="btn black">2</button>
          <button className="btn black">3</button>
          <button className="btn orange">+</button>
          <button className="btn black zero">0</button>
          <button className="btn black">.</button>
          <button className="btn black">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;