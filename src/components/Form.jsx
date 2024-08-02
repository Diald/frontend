import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState([
    "Characters",
    "Numbers",
    "Highest alphabet",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://backend-pptdeqos2-dialds-projects.vercel.app/bfhl",
        parsedJson
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or API error");
      setResponse(null);
    }
  };

  const handleVisibilityChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setVisibleSections(selectedOptions);
  };

  return (
    <div>
      <h1>RA2111053010067</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="10"
          cols="50"
          placeholder='{"data": ["A","B","1","2"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <label>
            Toggle Visibility:
            <select
              multiple={true}
              value={visibleSections}
              onChange={handleVisibilityChange}
            >
              <option value="Characters">Characters</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest alphabet">Highest alphabet</option>
            </select>
          </label>
          <div>
            {visibleSections.includes("Characters") && (
              <p>Characters: {JSON.stringify(response.alphabets)}</p>
            )}
            {visibleSections.includes("Numbers") && (
              <p>Numbers: {JSON.stringify(response.numbers)}</p>
            )}
            {visibleSections.includes("Highest alphabet") && (
              <p>
                Highest alphabet: {JSON.stringify(response.highest_alphabet)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
