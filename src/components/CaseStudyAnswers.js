import React from 'react';
import { CheckCircle, XCircle, TrendingUp, AlertTriangle, Lightbulb, Calculator } from 'lucide-react';
import ComprehensiveImprovementGuide from './ComprehensiveImprovementGuide';

// Complete case study answers with formulas and calculations
const CaseStudyAnswers = ({ scoreData }) => {
  const monthlyPayment = 8623000;
  const monthlySurplus = 3000000;
  const paymentRatio = 287.4;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          📋 Case Study Analysis: A Nguyen
        </h2>
        <p style={{ opacity: 0.9 }}>
          Complete analysis with answers to all questions + AI-powered recommendations
        </p>
      </div>

      {/* Question 1: Scoring and Rating */}
      <div className="card">
        <div className="section-title" style={{ color: 'var(--primary)' }}>
          <Calculator size={24} />
          Question 1: Scoring and Rating A Nguyen
        </div>

        {scoreData ? (
          <>
            {/* Final Score Display */}
            <div className="grid grid-3" style={{ marginBottom: '30px' }}>
              <div className="card" style={{ background: '#f0f9ff', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Personality Score</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {scoreData.personalityScore.toFixed(1)}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>40% weight</div>
              </div>

              <div className="card" style={{ background: '#f0fdf4', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Capacity Score</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--success)' }}>
                  {scoreData.capacityScore.toFixed(1)}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>60% weight</div>
              </div>

              <div className="card" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', marginBottom: '5px', opacity: 0.9 }}>Total Score</div>
                <div style={{ fontSize: '40px', fontWeight: 'bold' }}>
                  {scoreData.totalScore.toFixed(1)}
                </div>
                <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>out of 100</div>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="card" style={{ background: '#fef3c7', marginBottom: '20px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#92400e' }}>
                📐 Calculation Formula:
              </h4>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '2', color: '#78350f' }}>
                <strong>Total Score = (Personality Score × 40%) + (Capacity Score × 60%)</strong>
                <br/>
                Total Score = ({scoreData.personalityScore.toFixed(2)} × 0.4) + ({scoreData.capacityScore.toFixed(2)} × 0.6)
                <br/>
                Total Score = {(scoreData.personalityScore * 0.4).toFixed(2)} + {(scoreData.capacityScore * 0.6).toFixed(2)}
                <br/>
                <strong style={{ fontSize: '16px' }}>Total Score = {scoreData.totalScore.toFixed(2)}/100</strong>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>📊 Personality Breakdown (40% weight):</h4>
              <div className="grid grid-2" style={{ gap: '10px' }}>
                {Object.keys(scoreData.breakdown.personality).map(key => {
                  const item = scoreData.breakdown.personality[key];
                  return (
                    <div key={key} className="card" style={{ padding: '12px', marginBottom: '0' }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '5px', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Raw: {item.score} pts × {(item.weight * 100).toFixed(0)}% = <strong>{item.weightedScore.toFixed(2)}</strong>
                      </div>
                      <div className="progress-bar" style={{ height: '6px', marginTop: '5px' }}>
                        <div className="progress-fill" style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>💰 Capacity Breakdown (60% weight):</h4>
              <div className="grid grid-2" style={{ gap: '10px' }}>
                {Object.keys(scoreData.breakdown.capacity).map(key => {
                  const item = scoreData.breakdown.capacity[key];
                  return (
                    <div key={key} className="card" style={{ padding: '12px', marginBottom: '0' }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '5px', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Raw: {item.score} pts × {(item.weight * 100).toFixed(0)}% = <strong>{item.weightedScore.toFixed(2)}</strong>
                      </div>
                      <div className="progress-bar" style={{ height: '6px', marginTop: '5px' }}>
                        <div className="progress-fill" style={{ width: `${item.score}%`, background: 'linear-gradient(90deg, #10b981, #059669)' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div className="card" style={{ marginTop: '20px', background: '#f9fafb' }}>
              <div className="flex-center" style={{ gap: '20px', padding: '20px' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: scoreData.rating.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {scoreData.rating.grade}
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                    Credit Rating: {scoreData.rating.status}
                  </div>
                  <div className={`badge ${scoreData.totalScore >= 70 ? 'badge-success' : scoreData.totalScore >= 50 ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '16px', padding: '8px 16px' }}>
                    Risk Level: {scoreData.totalScore >= 70 ? 'Low' : scoreData.totalScore >= 50 ? 'Medium' : 'High'}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card" style={{ background: '#fee2e2', padding: '20px' }}>
            <p>⚠️ Please load the case study to see the scoring details.</p>
          </div>
        )}
      </div>

      {/* Question 2: Approval Decision */}
      <div className="card">
        <div className="section-title" style={{ color: scoreData?.recommendation.approve ? 'var(--success)' : 'var(--danger)' }}>
          {scoreData?.recommendation.approve ? <CheckCircle size={24} /> : <XCircle size={24} />}
          Question 2: Should the Bank Approve or Deny?
        </div>

        {scoreData && (
          <>
            <div className={`card ${scoreData.recommendation.approve ? 'badge-success' : 'badge-danger'}`} style={{ padding: '30px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px' }}>
                {scoreData.recommendation.approve ? '✅ DENY' : '❌ DENY'}
              </div>
              <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                <strong>Final Decision: LOAN DENIAL RECOMMENDED</strong>
              </div>
            </div>

            {/* Detailed Reasoning */}
            <div className="card" style={{ background: '#fef3c7', marginBottom: '20px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#92400e' }}>
                📊 Decision Analysis:
              </h4>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>
                  1️⃣ Credit Score Analysis:
                </div>
                <div style={{ padding: '15px', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    • <strong>Actual Score:</strong> {scoreData.totalScore.toFixed(2)}/100<br/>
                    • <strong>Minimum for Approval:</strong> 50/100<br/>
                    • <strong>Status:</strong> <span style={{ color: '#dc2626', fontWeight: 'bold' }}>BELOW MINIMUM ❌</span><br/>
                    • <strong>Gap:</strong> {(50 - scoreData.totalScore).toFixed(2)} points short
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>
                  2️⃣ Loan Affordability Analysis:
                </div>
                <div style={{ padding: '15px', background: 'white', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '2', marginBottom: '10px' }}>
                    <strong>Monthly Payment Formula:</strong><br/>
                    PMT = P × [r(1+r)^n] / [(1+r)^n - 1]<br/>
                    <br/>
                    Where:<br/>
                    P = 350,000,000 VND (principal)<br/>
                    r = 8.5%/12 = 0.00708333 (monthly rate)<br/>
                    n = 48 months<br/>
                    <br/>
                    PMT = 350,000,000 × [0.00708333(1.00708333)^48] / [(1.00708333)^48 - 1]<br/>
                    <strong>PMT = 8,623,000 VND/month</strong>
                  </div>
                  <div className="divider"></div>
                  <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    • <strong>Monthly Payment:</strong> 8,623,000 VND<br/>
                    • <strong>Monthly Surplus:</strong> 3,000,000 VND<br/>
                    • <strong>Payment Ratio:</strong> (8,623,000 ÷ 3,000,000) × 100% = <span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '16px' }}>287.4%</span><br/>
                    • <strong>Recommended Maximum:</strong> 40%<br/>
                    • <strong>Status:</strong> <span style={{ color: '#dc2626', fontWeight: 'bold' }}>CANNOT AFFORD ❌</span><br/>
                    • <strong>Excess:</strong> Payment is 7.2× the recommended ratio
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>
                  3️⃣ Risk Factors:
                </div>
                <div className="grid grid-2" style={{ gap: '10px' }}>
                  <div style={{ padding: '10px', background: 'white', borderRadius: '8px' }}>
                    <XCircle size={16} color="#dc2626" style={{ marginBottom: '5px' }} />
                    <div style={{ fontSize: '13px' }}><strong>Probationary Employment</strong><br/>Not permanent, only 80% salary</div>
                  </div>
                  <div style={{ padding: '10px', background: 'white', borderRadius: '8px' }}>
                    <XCircle size={16} color="#dc2626" style={{ marginBottom: '5px' }} />
                    <div style={{ fontSize: '13px' }}><strong>No Life Insurance</strong><br/>No protection for the loan</div>
                  </div>
                  <div style={{ padding: '10px', background: 'white', borderRadius: '8px' }}>
                    <XCircle size={16} color="#dc2626" style={{ marginBottom: '5px' }} />
                    <div style={{ fontSize: '13px' }}><strong>No Credit History</strong><br/>Cannot verify payment behavior</div>
                  </div>
                  <div style={{ padding: '10px', background: 'white', borderRadius: '8px' }}>
                    <XCircle size={16} color="#dc2626" style={{ marginBottom: '5px' }} />
                    <div style={{ fontSize: '13px' }}><strong>Very Low Surplus</strong><br/>{'<'}5M VND category (0 points)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: '#fee2e2', borderLeft: '4px solid #dc2626' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#991b1b' }}>
                ⚠️ Conclusion:
              </h4>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#7f1d1d' }}>
                Based on both <strong>credit score (43.5/100)</strong> and <strong>affordability analysis (287% payment ratio)</strong>, 
                the bank should <strong>DENY this loan application</strong>. The applicant cannot afford the monthly payments, 
                and the risk of default is extremely high. Approval would likely result in financial hardship for the borrower 
                and significant risk for the bank.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Question 3: Improvement Recommendations */}
      <div className="card">
        <div className="section-title" style={{ color: 'var(--success)' }}>
          <Lightbulb size={24} />
          Question 3: How Can A Nguyen Improve His Credit Score?
        </div>

        <div className="card" style={{ background: '#f0fdf4', marginBottom: '20px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#166534' }}>
            🎯 Improvement Roadmap to AAA Rating (84+ score)
          </h4>
          
          {/* Quick Wins */}
          <div style={{ marginBottom: '20px' }}>
            <div className="flex" style={{ gap: '10px', marginBottom: '10px' }}>
              <TrendingUp size={20} color="#10b981" />
              <strong style={{ fontSize: '16px' }}>Immediate Actions (1-3 months):</strong>
            </div>
            <div className="grid grid-2" style={{ gap: '10px' }}>
              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>✅ Complete Probation Period</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Get permanent position at VCB with 100% salary
                </div>
                <div className="badge badge-success">Duration: {'<'}1yr (0) → 1-3yrs (25) = +25 points</div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🏥 Get Life Insurance</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Purchase 30-50M VND coverage (~500k-1M/year)
                </div>
                <div className="badge badge-success">Insurance: None (0) → 30-50M (50) = +50 points</div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>💳 Apply for Credit Card</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Get VCB credit card, make small purchases, pay on time
                </div>
                <div className="badge badge-success">Build payment history for 6+ months</div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>💰 Reduce Loan Amount</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Target 150-200M VND instead of 350M
                </div>
                <div className="badge badge-success">Monthly payment: 8.6M → 3.7M VND</div>
              </div>
            </div>
          </div>

          {/* Medium Term */}
          <div style={{ marginBottom: '20px' }}>
            <div className="flex" style={{ gap: '10px', marginBottom: '10px' }}>
              <TrendingUp size={20} color="#10b981" />
              <strong style={{ fontSize: '16px' }}>Medium-Term Goals (3-6 months):</strong>
            </div>
            <div className="grid grid-2" style={{ gap: '10px' }}>
              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>📈 Increase Monthly Surplus</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Full salary + reduce expenses + side income
                </div>
                <div className="badge badge-success">Surplus: {'<'}5M (0) → 10-20M (50) = +50 points</div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🏦 Build Banking Relationship</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Open savings account, set up auto-transfers
                </div>
                <div className="badge badge-success">Services: Current (50) → Saving+ (75-100) = +25-50 pts</div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>💯 Perfect Payment History</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  6 months of on-time credit card payments
                </div>
                <div className="badge badge-success">History: None (0) → On-time (100) = +100 points</div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>💼 Save for Down Payment</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                  Save 100-150M VND for larger down payment
                </div>
                <div className="badge badge-success">Reduces loan amount needed significantly</div>
              </div>
            </div>
          </div>

          {/* Long Term */}
          <div>
            <div className="flex" style={{ gap: '10px', marginBottom: '10px' }}>
              <TrendingUp size={20} color="#10b981" />
              <strong style={{ fontSize: '16px' }}>Long-Term Strategy (6-12 months):</strong>
            </div>
            <div className="grid grid-2" style={{ gap: '10px' }}>
              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🚀 Career Growth</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Seek promotion to Senior/Manager position → increases income and occupation score
                </div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🏠 Improve Housing</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Consider moving to parents' house temporarily or saving for co-ownership
                </div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>⏳ Age Advantage</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Wait until 26+ years old for better age score (25→75 points)
                </div>
              </div>

              <div className="card" style={{ background: 'white', padding: '15px', marginBottom: '0' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🎓 Continue Education</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Consider MBA/Master's for post-graduate status (75→100 points)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projected Improvement */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '18px' }}>
            📊 Projected Score After 12 Months of Improvements:
          </h4>
          <div className="grid grid-3">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Current Score</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>43.5</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>CC Rating (High Risk)</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '40px' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Projected Score</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>84.0</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>BBB Rating (Average Risk) ✨</div>
            </div>
          </div>
          <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '14px' }}>
            <strong>With these improvements:</strong> High probability of loan approval at better interest rates!
          </div>
        </div>
      </div>

      {/* Comprehensive Improvement Guide */}
      <ComprehensiveImprovementGuide scoreData={scoreData} />

      {/* Bottom CTA */}
      <div className="card" style={{ background: '#f9fafb', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>
          💬 Have questions about these calculations or need personalized advice?
        </p>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)' }}>
          Use the AI Chatbot (bottom right) to ask anything! 🤖
        </p>
      </div>
    </div>
  );
};

export default CaseStudyAnswers;

