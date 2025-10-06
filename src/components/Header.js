import React from 'react';
import { TrendingUp, Shield, Brain } from 'lucide-react';

const Header = () => {
  return (
    <div className="header fade-in">
      <div className="flex-center gap-4 mb-4">
        <Shield size={48} />
        <h1>Credit Scoring System</h1>
        <TrendingUp size={48} />
      </div>
      <p className="flex-center gap-4">
        <Brain size={24} />
        AI-Powered Credit Analysis with Gemini 2.5 Pro
      </p>
      <div style={{ marginTop: '20px', opacity: 0.8, fontSize: '14px' }}>
        <p>Comprehensive credit scoring based on Personality (40%) + Capacity (60%)</p>
      </div>
    </div>
  );
};

export default Header;

