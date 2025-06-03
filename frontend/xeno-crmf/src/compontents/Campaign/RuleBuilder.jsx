import React, { useState } from 'react';
const operators = ['>', '<', '>=', '<=', '==', '!='];


function RuleBuilder({ onChange }) {
  const [logic, setLogic] = useState('AND');
  const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);

  const updateParent = (newLogic, newRules) => {
    if (onChange) {
      onChange(newLogic, newRules);
    }
  };

  const handleLogicChange = (e) => {
    const newLogic = e.target.value;
    setLogic(newLogic);
    updateParent(newLogic, rules);
  };

  const handleRuleChange = (index, key, value) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
    updateParent(logic, newRules);
  };

  const addRule = () => {
    const newRules = [...rules, { field: '', operator: '', value: '' }];
    setRules(newRules);
    updateParent(logic, newRules);
  };

  const deleteRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
    updateParent(logic, newRules);
  };

  return (
    <div>
      <h4>Segment Rule Builder</h4>

      <div>
        <label>Logic: </label>
        <select value={logic} onChange={handleLogicChange}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {rules.map((rule, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <input
            type="text"
            placeholder="Field"
            value={rule.field}
            onChange={(e) => handleRuleChange(index, 'field', e.target.value)}
          />

          <select
            value={rule.operator}
            onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
          >
            <option value="">Op</option>
            {operators.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Value"
            value={rule.value}
            onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
          />

          <button onClick={() => deleteRule(index)}>Delete</button>
        </div>
      ))}

      <button style={{ marginTop: '10px' }} onClick={addRule}>
        Add Rule
      </button>
    </div>
  );
}

export default RuleBuilder;
