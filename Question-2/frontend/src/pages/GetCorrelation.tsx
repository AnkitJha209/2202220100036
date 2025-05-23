import React, { useState } from "react";
import axios from "axios";
import "../index.css";

const GetCorrelation: React.FC = () => {
  const [ticker1, setTicker1] = useState("");
  const [ticker2, setTicker2] = useState("");
  const [minutes, setMinutes] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await axios.get("http://localhost:8080/stockcorrelation", {
        params: { ticker1, ticker2, minutes },
      });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Get Stock Correlation</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Ticker 1"
          value={ticker1}
          onChange={(e) => setTicker1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ticker 2"
          value={ticker2}
          onChange={(e) => setTicker2(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h4>Result:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetCorrelation;
