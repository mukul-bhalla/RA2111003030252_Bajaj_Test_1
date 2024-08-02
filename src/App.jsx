import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "bootstrap/dist/css/bootstrap.min.css"

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highestAlphabet', label: 'Highest Alphabet' },
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);
      if (!Array.isArray(parsedData.data)) {
        throw new Error('JSON must have an array in "data" key');
      }

      // Send POST request to backend
      const response = await axios.post('https://bajaj-test-backend.onrender.com/bfhl', {
        data: parsedData.data,
      });

      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON input: ' + error.message);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div>
        {selectedOptions.map((option) => {
          switch (option.value) {
            case 'alphabets':
              return (
                <div key="alphabets">
                  <h3>Alphabets:</h3>
                  <p>{responseData.alphabets.join(', ') || 'None'}</p>
                </div>
              );
            case 'numbers':
              return (
                <div key="numbers">
                  <h3>Numbers:</h3>
                  <p>{responseData.numbers.join(', ') || 'None'}</p>
                </div>
              );
            case 'highestAlphabet':
              return (
                <div key="highestAlphabet">
                  <h3>Highest Alphabet:</h3>
                  <p>{responseData.highest_alphabet || 'None'}</p>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="App " >
      <div className="row">
        <div className="col-md-6 offset-md-4">
          <h1>Bajaj Test -1 </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label >
                Please provide JSON Input:
                <textarea
                  class="form-control"
                  value={jsonInput}
                  onChange={handleInputChange}
                  rows="4"
                  cols="50"
                  placeholder='Enter JSON like { "data": ["A", "C", "z", 1, 2, 3] }'
                />
              </label>
            </div>

            <button type="submit" className="mt-4 btn btn-block btn-success col-6">Submit</button>

          </form>
          {responseData && (
            <div>
              <h2>Options:</h2>
              <Select
                isMulti
                options={options}
                onChange={handleSelectChange}
                value={selectedOptions}
              />
              {renderResponse()}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
