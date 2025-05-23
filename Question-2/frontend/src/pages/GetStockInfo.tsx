import React, { useState } from "react";
import axios from "axios";
import "../index.css";

const GetStockInfo: React.FC = () => {
  const [ticker, setTicker] = useState("");
  const [minutes, setMinutes] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await axios.get(`http://localhost:8080/stock/${ticker}?minutes=${minutes}&aggregation=average`);
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Get Stock Average</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Ticker (e.g. AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button type="submit">Fetch</button>
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

export default GetStockInfo;
