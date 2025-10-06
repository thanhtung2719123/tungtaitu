import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader, X, Minimize2, Maximize2, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChatbot = ({ isApiConnected, scoreData, formData, caseStudy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your Credit Scoring AI Assistant powered by Gemini 2.5 Pro. Ask me anything about:\n\n• How credit scores are calculated\n• Formula explanations\n• A Nguyen's case study\n• Improvement recommendations\n• Loan affordability\n• Any criterion details\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContextInfo = () => {
    let context = `
You are an expert credit analyst AI assistant helping users understand credit scoring. Be helpful, clear, and use formulas when explaining calculations.

CREDIT SCORING SYSTEM:
- Total Score = (Personality Score × 40%) + (Capacity Score × 60%)
- Personality: 10 criteria, each weighted 10%
- Capacity: 4 criteria with weights 30%, 30%, 25%, 15%

SCORING CRITERIA:
Personality (40%):
1. Age (10%): 36-55=100, 26-35=75, 56-60=50, 20-25=25, >60/<20=0
2. Academic Level (10%): Post grad=100, Graduated=75, Vocational=50, High school=25, Under HS=0
3. Criminal Record (10%): None=100, Other=0
4. Residence (10%): Owner=100, Co-owner=75, Parent/relatives=50, Renting=25, Other=0
5. Residents (10%): <3=100, 3=75, 4=50, 5=25, >5=0
6. Family Structure (10%): Core=100, Parent/relatives=75, Others=50, Other=0
7. Life Insurance (10%): >100trl=100, 50-100=75, 30-50=50, <30=25, None=0
8. Occupation (10%): Manager=100, Staff=75, Skilled=50, Seasonal=25, Unemployed=0
9. Duration (10%): >7yrs=100, 5-7=75, 3-5=50, 1-3=25, <1=0
10. Place (10%): State=100, Private=75, MNC=50, Freelance=25, None=0

Capacity (60%):
1. Monthly Surplus (30%): >50trl=100, 20-50=75, 10-20=50, 5-10=25, <5=0
2. Debt Ratio (30%): <30%/No debt=100, 30-45%=75, 40-50%=50, 60-70%=25, >75%=0
3. Payment History (25%): Always on time=100, Extended but paying=75, Had bad debt=50, Bad debt+potential OD=25, Extended/No info=0
4. Banking Services (15%): Saving+other=100, Saving OR other=75, Current only=50, Other loans=25, None=0

COLLATERAL EVALUATION (Separate Rating):
1. Type of Collaterals (40%): Gov bonds/Bank papers=100, Other bank papers=75, Real estate housing=50, Trading real estate/stocks=25, No collateral=0
2. Value of Collaterals/Total debts (40%): >200%=100, 150-200%=75, 100-150%=50, 70-100%=25, <70%=0
3. Fluctuation of asset price in 2 years (20%): 0%/no trend=100, 1-10%=75, 10-30%=50, 30-50%=25, >50%=0

RATING SYSTEM:
- AAA (80-100): Excellent, Low Risk, APPROVE
- AA (70-79): Very Good, Low Risk, APPROVE
- A (60-69): Good, Medium Risk, APPROVE with conditions
- BBB (50-59): Average, Medium Risk, Higher interest
- BB (40-49): Below Average, High Risk
- B (<40): Poor, High Risk, DENY

TOTAL SCORE = Personality (40%) + Capacity (60%)

COLLATERAL RATING (Separate Evaluation):
- A (225-300): Strong collateral
- B (75-224): Average collateral  
- C (<75): Low collateral
`;

    if (caseStudy) {
      context += `\n\nA NGUYEN CASE STUDY:
Personal: 22yo, single, NEU graduate, VCB probationary (80% salary), renting with friend
Financial: 3M VND monthly surplus, no debt, no insurance, no credit history
Collateral: VF 5Plus car (vehicle), 70-100% value ratio, 10-30% price fluctuation
Loan Request: 350M VND, 8.5% interest, 48 months for VF 5Plus car

SCORING:
Personality Breakdown:
- Age 20-25: 25 points × 10% = 2.5
- Academic Graduated: 75 × 10% = 7.5
- Criminal None: 100 × 10% = 10.0
- Residence Renting: 25 × 10% = 2.5
- Residents 3: 75 × 10% = 7.5
- Family Others: 50 × 10% = 5.0
- Insurance None: 0 × 10% = 0.0
- Occupation Staff: 75 × 10% = 7.5
- Duration <1yr: 0 × 10% = 0.0
- Place State: 100 × 10% = 10.0
Personality Total: 52.5/100

Capacity Breakdown:
- Monthly Surplus <5trl: 0 × 30% = 0.0
- Debt Ratio No debt: 100 × 30% = 30.0
- Payment History None: 0 × 25% = 0.0
- Banking Current: 50 × 15% = 7.5
Capacity Total: 37.5/100

Collateral Breakdown:
- Type Real estate housing: 50 × 40% = 20.0
- Value 100-150%: 50 × 40% = 20.0
- Fluctuation 10-30%: 50 × 20% = 10.0
Collateral Total: 50/100

FINAL SCORE: (52.5 × 0.4) + (37.5 × 0.6) = 21.0 + 22.5 = 43.5/100
RATING: CC (Extremely Poor) - High Risk

COLLATERAL EVALUATION (Separate):
- Type VF 5Plus car (vehicle): 25 × 40% = 10.0
- Value 70-100%: 25 × 40% = 10.0
- Fluctuation 10-30%: 50 × 20% = 10.0
COLLATERAL TOTAL: 30/100
COLLATERAL RATING: C (Low) - 30 points

MONTHLY PAYMENT CALCULATION:
Formula: PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
P = 350,000,000 VND
r = 8.5%/12 = 0.00708333
n = 48 months
PMT = 350,000,000 × [0.00708333(1.00708333)^48] / [(1.00708333)^48 - 1]
PMT = 8,623,000 VND per month

AFFORDABILITY:
Monthly Payment: 8,623,000 VND
Monthly Surplus: 3,000,000 VND
Payment Ratio: (8,623,000 / 3,000,000) × 100% = 287.4%
Recommended Maximum: 40%
Result: CANNOT AFFORD - payment is 7.2× the recommended ratio

DECISION: DENY
Reasons:
1. Low credit score (43.5 < 50 minimum)
2. Unaffordable monthly payment (287% >> 40% max)
3. Probationary employment (unstable)
4. No life insurance (no protection)
5. No credit history (cannot verify payment behavior)
6. Very low monthly surplus

IMPROVEMENT PLAN:
1. Complete probation, get permanent job (0→25 points)
2. Increase monthly surplus to 10M+ (0→50 points)
3. Get life insurance 30-50M (0→50 points)
4. Build 6mo credit card history (0→100 points)
5. Reduce loan to 150-200M VND
6. Wait 12 months, reapply with score ~84 (AAA)
`;
    }

    if (scoreData) {
      context += `\n\nCURRENT USER'S SCORE:
Total: ${scoreData.totalScore.toFixed(2)}/100
Personality: ${scoreData.personalityScore.toFixed(2)}/100
Capacity: ${scoreData.capacityScore.toFixed(2)}/100
Rating: ${scoreData.rating.grade} (${scoreData.rating.status})
Decision: ${scoreData.recommendation.approve ? 'APPROVE' : 'DENY'}
`;
    }

    return context;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    if (!isApiConnected) {
      alert('Please connect your Gemini API key first!');
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(localStorage.getItem('gemini_api_key'));
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

      const context = getContextInfo();
      
      // Build conversation history
      const conversationHistory = messages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n\n');

      const prompt = `${context}

CONVERSATION HISTORY:
${conversationHistory}

User: ${input}

Please provide a helpful, accurate response. Use formulas and calculations when relevant. Be conversational but precise.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ Error: ${error.message}. Please check your API key and try again.` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            animation: 'pulse 2s infinite'
          }}
        >
          <MessageCircle size={28} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isMinimized ? '300px' : '450px',
        height: isMinimized ? '60px' : '600px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bot size={24} />
          <div>
            <div style={{ fontWeight: 'bold' }}>AI Credit Assistant</div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>Powered by Gemini 2.5 Pro</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '6px',
              padding: '5px',
              cursor: 'pointer',
              color: 'white',
              display: 'flex'
            }}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '6px',
              padding: '5px',
              cursor: 'pointer',
              color: 'white',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, var(--primary), var(--secondary))' 
                      : '#f3f4f6',
                    color: msg.role === 'user' ? 'white' : '#1f2937',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                  }}
                >
                  <Loader size={16} className="spin" />
                  <span style={{ fontSize: '14px' }}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '15px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '10px'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              disabled={!isApiConnected}
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !isApiConnected || !input.trim()}
              className="btn btn-primary"
              style={{
                minWidth: '50px',
                padding: '10px',
                opacity: (loading || !isApiConnected || !input.trim()) ? 0.5 : 1,
                cursor: (loading || !isApiConnected || !input.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
if (!document.head.querySelector('style[data-chatbot-animation]')) {
  style.setAttribute('data-chatbot-animation', 'true');
  document.head.appendChild(style);
}

export default AIChatbot;

