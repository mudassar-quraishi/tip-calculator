import { useMemo, useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(15);
  const [customTip, setCustomTip] = useState("");
  const [people, setPeople] = useState(1);

  const presetTips = [5, 10, 15, 25, 50];

  const billValue = parseFloat(bill) || 0;
  const activeTip = customTip !== "" ? parseFloat(customTip) || 0 : tip;
  const peopleValue = parseInt(people, 10) || 0;

  const errors = {
    bill: billValue <= 0 ? "Bill must be greater than 0" : "",
    tip: activeTip < 0 ? "Tip percent must be 0 or greater" : "",
    people: peopleValue < 1 ? "People must be at least 1" : ""
  };

  const hasError = Object.values(errors).some(Boolean);

  const calculations = useMemo(() => {
    if (
      hasError ||
      isNaN(billValue) ||
      isNaN(activeTip) ||
      peopleValue === 0
    ) {
      return {
        tipAmount: 0,
        total: 0,
        perPerson: 0
      };
    }

    const tipAmount = (billValue * activeTip) / 100;
    const total = billValue + tipAmount;

    const perPerson = Math.ceil((total / peopleValue) * 100) / 100;

    return {
      tipAmount,
      total,
      perPerson
    };
  }, [billValue, activeTip, peopleValue, hasError]);

  const resetAll = () => {
    setBill("");
    setTip(15);
    setCustomTip("");
    setPeople(1);
  };

  return (
    <main className="app">
      <section className="card">
        <div className="header">
          <h1>Tip Calculator</h1>
          <p>Split bills instantly with live updates.</p>
        </div>

        <div className="layout">
          <div className="inputs-panel">
            <div className="field">
              <label htmlFor="bill">Bill Amount (₹)</label>
              <input
                id="bill"
                type="number"
                inputMode="decimal"
                placeholder="Enter bill amount"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                aria-invalid={!!errors.bill}
              />
              {errors.bill && <span className="error">{errors.bill}</span>}
            </div>

            <div className="field">
              <label>Select Tip %</label>

              <div className="tip-grid">
                {presetTips.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`tip-btn ${customTip === "" && tip === value ? "active" : ""}`}
                    onClick={() => {
                      setCustomTip("");
                      setTip(value);
                    }}
                  >
                    {value}%
                  </button>
                ))}

                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Custom"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="custom-tip"
                  aria-label="Custom tip percentage"
                />
              </div>

              {errors.tip && <span className="error">{errors.tip}</span>}
            </div>

            <div className="field">
              <label htmlFor="people">Number of People</label>
              <input
                id="people"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                aria-invalid={!!errors.people}
              />
              {errors.people && (
                <span className="error">{errors.people}</span>
              )}
            </div>

            <button className="reset-btn" onClick={resetAll}>
              Reset
            </button>
          </div>

          <div className="results-panel">
            <div className="result-row">
              <span>Total Tip</span>
              <strong>₹{calculations.tipAmount.toFixed(2)}</strong>
            </div>

            <div className="result-row">
              <span>Grand Total</span>
              <strong>₹{calculations.total.toFixed(2)}</strong>
            </div>

            <div className="result-row highlight">
              <span>Per Person</span>
              <strong>₹{calculations.perPerson.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}