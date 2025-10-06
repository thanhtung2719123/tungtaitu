import React, { useState } from 'react';
import { Brain, Loader, AlertCircle, TrendingUp, Award, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { analyzeCreditProfile, getImprovementSuggestions } from '../utils/geminiAPI';

const GeminiAnalysis = ({ scoreData, formData, isApiConnected }) => {
  const [analysis, setAnalysis] = useState(null);
  const [improvements, setImprovements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!isApiConnected) {
      setError('Please connect Gemini API first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeCreditProfile(scoreData, formData);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetImprovements = async () => {
    if (!isApiConnected) {
      setError('Please connect Gemini API first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Find weakest areas
      const allScores = {
        ...scoreData.breakdown.personality,
        ...scoreData.breakdown.capacity
      };
      
      const weakestAreas = Object.keys(allScores)
        .map(key => ({
          criterion: key,
          score: allScores[key].score
        }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 5);

      const result = await getImprovementSuggestions(scoreData, weakestAreas);
      setImprovements(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!scoreData) {
    return (
      <div className="card">
        <div className="section-title">
          <Brain size={24} />
          AI Analysis (Gemini 2.5)
        </div>
        <div className="flex-center" style={{ padding: '40px', color: '#6b7280' }}>
          <AlertCircle size={24} style={{ marginRight: '10px' }} />
          <span>Calculate a credit score first to get AI analysis</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="card">
        <div className="section-title">
          <Brain size={24} />
          AI-Powered Credit Analysis
        </div>

        {!isApiConnected && (
          <div style={{ padding: '15px', background: '#fef3c7', borderRadius: '8px', marginBottom: '20px' }}>
            <AlertCircle size={20} color="#f59e0b" style={{ marginRight: '10px', display: 'inline' }} />
            <span style={{ color: '#92400e' }}>Please connect your Gemini API key to use AI analysis</span>
          </div>
        )}

        <div className="flex gap-4" style={{ marginBottom: '20px' }}>
          <button 
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={loading || !isApiConnected}
            style={{ flex: 1 }}
          >
            {loading ? <Loader size={20} className="spin" /> : <Brain size={20} />}
            Full Credit Analysis
          </button>
          
          <button 
            className="btn btn-success"
            onClick={handleGetImprovements}
            disabled={loading || !isApiConnected}
            style={{ flex: 1 }}
          >
            {loading ? <Loader size={20} className="spin" /> : <Lightbulb size={20} />}
            Get Improvement Plan
          </button>
        </div>

        {error && (
          <div style={{ padding: '15px', background: '#fee2e2', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #ef4444' }}>
            <AlertCircle size={20} color="#ef4444" style={{ marginRight: '10px', display: 'inline' }} />
            <span style={{ color: '#991b1b' }}>{error}</span>
          </div>
        )}

        {loading && (
          <div className="flex-center" style={{ padding: '40px' }}>
            <Loader size={40} className="spin" color="var(--primary)" />
            <span style={{ marginLeft: '15px', fontSize: '16px', color: '#6b7280' }}>
              AI is analyzing the credit profile...
            </span>
          </div>
        )}

        {analysis && !loading && (
          <div className="card" style={{ background: '#f0f9ff', marginTop: '20px' }}>
            <div className="section-title" style={{ color: 'var(--primary)' }}>
              <Award size={20} />
              Detailed Credit Analysis
            </div>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '14px', 
              lineHeight: '1.8',
              color: '#1f2937'
            }}>
              {analysis}
            </div>
          </div>
        )}

        {improvements && !loading && (
          <div className="card" style={{ background: '#f0fdf4', marginTop: '20px' }}>
            <div className="section-title" style={{ color: 'var(--success)' }}>
              <Lightbulb size={20} />
              Improvement Recommendations
            </div>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '14px', 
              lineHeight: '1.8',
              color: '#1f2937'
            }}>
              {improvements}
            </div>
          </div>
        )}
      </div>

      {/* Quick Insights */}
      {scoreData && !loading && (
        <div className="grid grid-3" style={{ marginTop: '20px' }}>
          <div className="card">
            <div className="flex" style={{ gap: '10px', marginBottom: '10px' }}>
              {scoreData.recommendation.approve ? 
                <CheckCircle size={20} color="#10b981" /> : 
                <AlertTriangle size={20} color="#ef4444" />
              }
              <strong style={{ fontSize: '14px' }}>Loan Decision</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              {scoreData.recommendation.message}
            </p>
          </div>

          <div className="card">
            <div className="flex" style={{ gap: '10px', marginBottom: '10px' }}>
              <TrendingUp size={20} color="var(--primary)" />
              <strong style={{ fontSize: '14px' }}>Score Breakdown</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              Personality: {scoreData.personalityScore.toFixed(1)}/100 (40%)<br/>
              Capacity: {scoreData.capacityScore.toFixed(1)}/100 (60%)
            </p>
          </div>

          <div className="card">
            <div className="flex" style={{ gap: '10px', marginBottom: '10px' }}>
              <Award size={20} color={scoreData.rating.color} />
              <strong style={{ fontSize: '14px' }}>Credit Rating</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              Grade: {scoreData.rating.grade}<br/>
              Status: {scoreData.rating.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS for spin animation
const style = document.createElement('style');
style.textContent = `
  .spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default GeminiAnalysis;

