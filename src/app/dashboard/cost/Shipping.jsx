import axios from "axios";
import { useState } from "react";
import "./Shipping.css";

export default function ShippingCostCalculator() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "b7089f02f2cb3ab352beeed0cb0ff13a";

  const handleCalculate = async () => {
    setError("");
    setResult(null);

    if (!origin || !destination || !weight || !courier) {
      setError("All fields are required!");
      return;
    }

    try {
      const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
      const API_URL = "https://api.rajaongkir.com/starter/cost";

      const response = await axios.post(
        PROXY_URL + API_URL,
        {
          origin,
          destination,
          weight: parseInt(weight),
          courier,
        },
        {
          headers: {
            key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data.rajaongkir.results);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to fetch data. Please check your inputs and try again.");
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Origin City ID: </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="e.g., 501"
        />
      </div>

      <div className="form-group">
        <label>Destination City ID: </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., 114"
        />
      </div>

      <div className="form-group">
        <label>Weight (grams): </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 1000"
        />
      </div>

      <div className="form-group">
        <label>Courier: </label>
        <input
          type="text"
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
          placeholder="e.g., jne"
        />
      </div>

      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result">
          <h2>Shipping Costs</h2>
          {result.map((res, idx) => (
            <div key={idx} className="result-item">
              <h3>Service: {res.name}</h3>
              {res.costs.map((cost, i) => (
                <div key={i} className="cost-detail">
                  <p>Service: {cost.service}</p>
                  <p>Description: {cost.description}</p>
                  <p>Cost: {cost.cost[0].value}</p>
                  <p>ETD: {cost.cost[0].etd} days</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
