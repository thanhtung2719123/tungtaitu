import React, { useState } from 'react';
import { Key, Check } from 'lucide-react';

const ApiKeyInput = ({ onApiKeySet, isConnected }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="card fade-in">
      <div className="section-title">
        <Key size={24} />
        Gemini API Configuration
        {isConnected && <Check size={24} color="#10b981" />}
      </div>
      
      {!isConnected ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Enter your Gemini 2.5 API Key
            </label>
            <div className="flex gap-4">
              <input
                type={showKey ? 'text' : 'password'}
                className="form-input"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowKey(!showKey)}
                style={{ minWidth: '100px' }}
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
              <button type="submit" className="btn btn-success">
                Connect
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Google AI Studio</a>
            </p>
          </div>
        </form>
      ) : (
        <div className="flex-center gap-4" style={{ padding: '20px', background: '#d1fae5', borderRadius: '8px' }}>
          <Check size={24} color="#10b981" />
          <span style={{ color: '#10b981', fontWeight: 600 }}>
            Gemini 2.5 Pro API Connected Successfully ✨
          </span>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;

