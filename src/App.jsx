import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    id: 1,
    text: 'Cluster',
    subquestions: [
      { id: '1-1', text: 'Production Cluster?', options: ['Yes', 'No'] },
      { id: '1-2', text: 'Expired Contract?', options: ['Yes', 'No'] },
      { id: '1-3', text: 'Customer Induced Outage?', options: ['Yes', 'No'] },
      { id: '1-4', text: 'Cluster Reboot/ Power Outage/ Network Issue', options: ['Yes', 'No'] },
    ],
  },
  {
    id: 2,
    text: 'Account Sensitivity',
    subquestions: [
      { id: '2-1', options: ['High', 'Moderate/Low'] },
    ],
  },
  {
    id: 3,
    text: 'Node Health',
    subquestions: [
      { id: '3-1', text: 'Number of Nodes in Cluster', options: ['1 or 2', 'More than 2'] },
      { id: '3-2', text: 'Outage Duration', options: ['Around 10 minutes', '60 minutes or more'] },
      { id: '3-3', text: 'Outage affects multiple VMs?', options: ['Yes', 'No'] },
    ],
  },
  {
    id: 4,
    text: 'Security',
    subquestions: [
      { id: '4-1', text: 'Threat of Malicious Software?', options: ['Yes', 'No'] },
      { id: '4-2', text: 'Does center director need it to be external?', options: ['Yes', 'No'] },
    ],
  },
  {
    id: 5,
    text: 'Data Availability',
    subquestions: [
      { id: '5-1', text: 'Data Unavailable?', options: ['Yes', 'No'] },
      { id: '5-2', text: 'Handoff required?', options: ['Yes', 'No'] },
      
    ],
  },
];

const App = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleOptionChange = (questionId, subquestionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: {
        ...prevData[questionId],
        [subquestionId]: value,
      },
    }));
  };

  const handlePredict = () => {
    const json = JSON.stringify(formData, null, 2);
    console.log(json);
    // You can also download the JSON file if needed
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    a.click();
  };

  return (
    <div className="app">
      <div className="sidebar"></div>
      <div className="form-container">
        {questions.map((question) => (
          <div key={question.id} className="dropdown">
            <div className="dropdown-header-container">
              <div className={`number-box ${openDropdown === question.id ? 'open' : ''}`}>
                {question.id}
              </div>
              <div
                className="dropdown-header"
                onClick={() => toggleDropdown(question.id)}
              >
                <span>{question.text}</span>
                <span className="arrow">{openDropdown === question.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {openDropdown === question.id && (
              <div className="dropdown-content">
                {question.subquestions.map((subquestion) => (
                  <div key={subquestion.id} className="subquestion">
                    <p>{subquestion.text}</p>
                    {subquestion.options.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name={`subquestion-${subquestion.id}`}
                          value={option}
                          checked={formData[question.id]?.[subquestion.id] === option}
                          onChange={() => handleOptionChange(question.id, subquestion.id, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="predict-button" onClick={handlePredict}>Predict</button>
      </div>
    </div>
  );
};

export default App;