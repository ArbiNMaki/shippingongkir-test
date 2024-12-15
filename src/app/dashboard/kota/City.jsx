import axios from "axios";
import { useState, useEffect } from "react";
import "./City.css";

export default function CityDropdown() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
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

  useEffect(() => {
    if (!selectedProvince) return;

    const fetchCities = async () => {
      setLoading(true);

      try {
        const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
        const API_URL = `https://api.rajaongkir.com/starter/city?province=${selectedProvince.province_id}`;

        const response = await axios.get(PROXY_URL + API_URL, {
          headers: { key: API_KEY },
        });

        if (response.data && response.data.rajaongkir && response.data.rajaongkir.results) {
          setCities(response.data.rajaongkir.results);
        } else {
          setError("Invalid response structure for cities.");
        }
      } catch (error) {
        console.error("Error fetching cities:", error.response ? error.response.data : error.message);
        setError("Failed to fetch cities.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [selectedProvince]);

  const handleSelectProvince = (event) => {
    const provinceId = event.target.value;
    const province = provinces.find((p) => p.province_id === provinceId);
    setSelectedProvince(province);
    setCities([]);
    setSelectedCity("");
  };

  const handleSelectCity = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Select Province and City</h1>

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
        <div className="form-group">
          <label>City: </label>
          <select
            disabled={loading || cities.length === 0}
            onChange={handleSelectCity}
            style={{ width: "200px", padding: "8px" }}
          >
            <option value="">
              {loading ? "Loading cities..." : "Select City"}
            </option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name} (ID: {city.city_id})
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedProvince && selectedCity && (
        <div className="result">
          <h2>Selected Location</h2>
          <p>Province ID: {selectedProvince.province_id}</p>
          <p>Province Name: {selectedProvince.province}</p>
          <p>City ID: {selectedCity}</p>
          <p>City Name: {cities.find((city) => city.city_id === selectedCity)?.city_name}</p>
        </div>
      )}
    </div>
  );
}
