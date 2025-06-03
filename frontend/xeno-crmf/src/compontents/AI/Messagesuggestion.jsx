import React, { useState } from 'react';
import axios from 'axios';

const MessageSuggestions = ({ onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.post('/api/ai/suggestions', {
        prompt: 'Generate 3 promotional messages for inactive users.',
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchSuggestions}>Get Message Suggestions</button>
      <ul>
        {suggestions.map((msg, index) => (
          <li key={index}>
            {msg}
            <button onClick={() => onSelect(msg)}>Use</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageSuggestions;
