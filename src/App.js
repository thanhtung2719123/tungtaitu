import React, { useState } from 'react';
import Header from './components/Header';
import ApiKeyInput from './components/ApiKeyInput';
import ScoringForm from './components/ScoringForm';
import ScoreDashboard from './components/ScoreDashboard';
import CaseStudy from './components/CaseStudy';
import GeminiAnalysis from './components/GeminiAnalysis';
import CaseStudyAnswers from './components/CaseStudyAnswers';
import AIChatbot from './components/AIChatbot';
import { calculateScore, aNguyenCaseStudy, allCaseStudies } from './utils/scoringEngine';
import { initializeGemini } from './utils/geminiAPI';
import { Calculator, FileText, BarChart3, Sparkles, BookOpen } from 'lucide-react';
import './index.css';

function App() {
  const [formData, setFormData] = useState({});
  const [scoreData, setScoreData] = useState(null);
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('case');

  // Auto-connect API key and load case study on mount
  React.useEffect(() => {
    // Connect Gemini API
    const apiKey = 'AIzaSyDpewH4MoD8nBpKkyXEeHiGpYfINvSg-vY';
    const success = initializeGemini(apiKey);
    if (success) {
      setIsApiConnected(true);
    }

    // Auto-load A Nguyen case study
    setFormData(aNguyenCaseStudy);
    const score = calculateScore(aNguyenCaseStudy);
    setScoreData(score);
  }, []);

  const handleApiKeySet = (apiKey) => {
    const success = initializeGemini(apiKey);
    if (success) {
      setIsApiConnected(true);
      alert('Gemini API connected successfully!');
    } else {
      alert('Failed to connect to Gemini API. Please check your API key.');
    }
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const handleCalculate = () => {
    // Check if all required fields are filled
    const requiredFields = [
      'age', 'academicLevel', 'criminalRecord', 'residenceStatus', 
      'numberOfResidents', 'familyStructure', 'lifeInsurance', 
      'occupation', 'durationOfOccupation', 'placeOfOccupation',
      'stableMonthlyMoney', 'debtPaymentsRatio', 'debtPaymentSituation', 
      'otherBankingServices'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields. Missing: ${missingFields.join(', ')}`);
      return;
    }

    const score = calculateScore(formData);
    setScoreData(score);
    setActiveTab('dashboard');
  };

  const handleLoadCase = (caseData) => {
    setFormData(caseData);
    const score = calculateScore(caseData);
    setScoreData(score);
    setActiveTab('dashboard');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      setFormData({});
      setScoreData(null);
      setActiveTab('form');
    }
  };

  return (
    <div className="container">
      <Header />
      
      <ApiKeyInput onApiKeySet={handleApiKeySet} isConnected={isApiConnected} />

      {/* Teacher Instructions */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>
          👩‍🏫 Hướng dẫn cho Giáo viên
        </h3>
        <p style={{ fontSize: '14px', marginBottom: '0', opacity: 0.9 }}>
          Nếu cô giáo có thắc mắc về công thức tính điểm, cách tính toán, hoặc bất kỳ câu hỏi nào khác, 
          có thể hỏi AI Chatbot ở góc màn hình bên phải! 🤖💬
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <button
            className={`btn ${activeTab === 'case' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('case')}
            style={{ 
              background: activeTab === 'case' ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : '#e5e7eb',
              color: activeTab === 'case' ? 'white' : '#6b7280'
            }}
          >
            <FileText size={20} />
            Case Study Analysis
          </button>

          <button
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            disabled={!scoreData}
            style={{ 
              background: activeTab === 'dashboard' && scoreData ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : '#e5e7eb',
              color: activeTab === 'dashboard' && scoreData ? 'white' : '#6b7280',
              cursor: !scoreData ? 'not-allowed' : 'pointer'
            }}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>

          <button
            className={`btn ${activeTab === 'answers' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('answers')}
            disabled={!scoreData}
            style={{ 
              background: activeTab === 'answers' && scoreData ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : '#e5e7eb',
              color: activeTab === 'answers' && scoreData ? 'white' : '#6b7280',
              cursor: !scoreData ? 'not-allowed' : 'pointer'
            }}
          >
            <BookOpen size={20} />
            Case Answers
          </button>


          <button
            className="btn btn-danger"
            onClick={handleReset}
            style={{ marginLeft: 'auto' }}
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'case' && (
        <CaseStudy onLoadCase={handleLoadCase} scoreData={scoreData} />
      )}

      {activeTab === 'dashboard' && scoreData && (
        <ScoreDashboard scoreData={scoreData} />
      )}

      {activeTab === 'answers' && scoreData && (
        <CaseStudyAnswers scoreData={scoreData} />
      )}


      {/* AI Chatbot - Always available */}
      <AIChatbot 
        isApiConnected={isApiConnected}
        scoreData={scoreData}
        formData={formData}
        caseStudy={aNguyenCaseStudy}
      />

      {/* Footer */}
      <div className="card" style={{ marginTop: '40px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)' }}>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Credit Scoring System | Powered by Gemini 2.5 Pro | Built with React
        </p>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '10px' }}>
          Total Score = Personality (40%) + Capacity (60%) | Chat with AI Assistant anytime! 💬
        </p>
      </div>
    </div>
  );
}

export default App;

