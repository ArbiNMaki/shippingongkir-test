import axios from "axios";
import { useState, useEffect } from "react";
import "./Provinsi.css";

export default function ProvinsiDropdown() {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "b7089f02f2cb3ab352beeed0cb0ff13a";

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
        const API_URL = "https://api.rajaongkir.com/starter/province";

        const response = await axios.get(PROXY_URL + API_URL, {
          headers: { key: API_KEY },
        });

        if (response.data && response.data.rajaongkir && response.data.rajaongkir.results) {
          setProvinces(response.data.rajaongkir.results);
        } else {
          setError("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching provinces:", error.response ? error.response.data : error.message);
        setError("Failed to fetch provinces.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleSelectProvince = (event) => {
    const provinceId = event.target.value;
    const province = provinces.find((p) => p.province_id === provinceId);
    setSelectedProvince(province);
  };

  return (
    <div>
      <h1>Select Province</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label>Province: </label>
        <select
          disabled={loading}
          onChange={handleSelectProvince}
          style={{ width: "200px", padding: "8px" }}
        >
          <option value="">
            {loading ? "Loading provinces..." : "Select Province"}
          </option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province} (ID: {province.province_id})
            </option>
          ))}
        </select>
      </div>

      {selectedProvince && (
        <div className="result">
          <h2>Selected Province</h2>
          <p>ID: {selectedProvince.province_id}</p>
          <p>Name: {selectedProvince.province}</p>
        </div>
      )}
    </div>
  );
}
