import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, DollarSign, Building, Users, Calendar, CheckCircle, AlertTriangle, Lightbulb, BarChart3, PieChart, LineChart } from 'lucide-react';
import { analyzeCreditProfile } from '../utils/geminiAPI';

const ComprehensiveImprovementGuide = ({ scoreData, formData }) => {
  const [improvementAnalysis, setImprovementAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projectedScores, setProjectedScores] = useState(null);

  // Real Vietnamese banking data
  const vietnameseBankData = {
    majorBanks: [
      { name: 'Vietcombank', rating: 'BB+', interestRate: '7.5-8.5%', minScore: 70 },
      { name: 'BIDV', rating: 'BB', interestRate: '8.0-9.0%', minScore: 65 },
      { name: 'Agribank', rating: 'BB-', interestRate: '8.5-9.5%', minScore: 60 },
      { name: 'VietinBank', rating: 'BB', interestRate: '8.0-9.0%', minScore: 65 },
      { name: 'Techcombank', rating: 'BB+', interestRate: '7.0-8.0%', minScore: 75 },
      { name: 'ACB', rating: 'BB-', interestRate: '8.5-9.5%', minScore: 60 }
    ],
    creditScoreThresholds: {
      'AAA': { min: 95, max: 100, interestRate: '6.0-7.0%', approval: 'Instant' },
      'AA': { min: 90, max: 94, interestRate: '6.5-7.5%', approval: 'Fast' },
      'A': { min: 85, max: 89, interestRate: '7.0-8.0%', approval: 'Standard' },
      'BBB': { min: 80, max: 84, interestRate: '7.5-8.5%', approval: 'Standard' },
      'BB': { min: 70, max: 79, interestRate: '8.0-9.0%', approval: 'Conditional' },
      'B': { min: 60, max: 69, interestRate: '9.0-10.0%', approval: 'Strict' },
      'CCC': { min: 50, max: 59, interestRate: '10.0-12.0%', approval: 'High Risk' },
      'CC': { min: 40, max: 49, interestRate: '12.0-15.0%', approval: 'Very High Risk' },
      'C': { min: 35, max: 39, interestRate: '15.0-18.0%', approval: 'Extreme Risk' },
      'D': { min: 0, max: 34, interestRate: 'N/A', approval: 'Denied' }
    }
  };

  useEffect(() => {
    if (scoreData && formData) {
      generateImprovementAnalysis();
    }
  }, [scoreData, formData]);

  const generateImprovementAnalysis = async () => {
    setLoading(true);
    try {
      const analysis = await analyzeCreditProfile(scoreData, formData);
      setImprovementAnalysis(analysis);
      generateProjectedScores();
    } catch (error) {
      console.error('Error generating improvement analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateProjectedScores = () => {
    const currentScore = scoreData.totalScore;
    const projections = [
      {
        timeframe: '1 tháng',
        improvements: [
          'Hoàn thành thời gian thử việc tại VCB',
          'Đăng ký bảo hiểm nhân thọ cơ bản',
          'Mở tài khoản tiết kiệm'
        ],
        scoreIncrease: 8,
        projectedScore: Math.min(currentScore + 8, 100),
        rating: getRatingFromScore(Math.min(currentScore + 8, 100)),
        strategies: [
          'Chiến thuật 1: Tăng điểm nghề nghiệp (+5 điểm)',
          'Chiến thuật 2: Tăng điểm bảo hiểm (+3 điểm)'
        ]
      },
      {
        timeframe: '3 tháng',
        improvements: [
          'Nhận lương chính thức 100%',
          'Mua bảo hiểm nhân thọ 30-50M VND',
          'Đăng ký thẻ tín dụng VCB',
          'Bắt đầu xây dựng lịch sử thanh toán'
        ],
        scoreIncrease: 25,
        projectedScore: Math.min(currentScore + 25, 100),
        rating: getRatingFromScore(Math.min(currentScore + 25, 100)),
        strategies: [
          'Chiến thuật 1: Cải thiện thu nhập ổn định (+15 điểm)',
          'Chiến thuật 2: Tăng điểm bảo hiểm (+5 điểm)',
          'Chiến thuật 3: Bắt đầu lịch sử tín dụng (+5 điểm)'
        ]
      },
      {
        timeframe: '6 tháng',
        improvements: [
          'Xây dựng lịch sử thanh toán 6 tháng',
          'Tăng thặng dư hàng tháng lên 10-15M VND',
          'Mở tài khoản tiết kiệm có kỳ hạn',
          'Sử dụng thẻ tín dụng thông minh'
        ],
        scoreIncrease: 45,
        projectedScore: Math.min(currentScore + 45, 100),
        rating: getRatingFromScore(Math.min(currentScore + 45, 100)),
        strategies: [
          'Chiến thuật 1: Hoàn thiện lịch sử thanh toán (+20 điểm)',
          'Chiến thuật 2: Tăng thu nhập ổn định (+15 điểm)',
          'Chiến thuật 3: Đa dạng hóa dịch vụ ngân hàng (+10 điểm)'
        ]
      },
      {
        timeframe: '9 tháng',
        improvements: [
          'Lịch sử thanh toán hoàn hảo 9 tháng',
          'Tăng thặng dư lên 15-20M VND',
          'Mở sản phẩm đầu tư cơ bản',
          'Xây dựng mối quan hệ ngân hàng toàn diện'
        ],
        scoreIncrease: 65,
        projectedScore: Math.min(currentScore + 65, 100),
        rating: getRatingFromScore(Math.min(currentScore + 65, 100)),
        strategies: [
          'Chiến thuật 1: Tối ưu hóa lịch sử tín dụng (+15 điểm)',
          'Chiến thuật 2: Tăng thu nhập và tiết kiệm (+25 điểm)',
          'Chiến thuật 3: Mở rộng quan hệ ngân hàng (+15 điểm)',
          'Chiến thuật 4: Đầu tư và tích lũy tài sản (+10 điểm)'
        ]
      },
      {
        timeframe: '12 tháng',
        improvements: [
          'Lịch sử thanh toán hoàn hảo 12 tháng',
          'Thặng dư hàng tháng 20M+ VND',
          'Quan hệ ngân hàng toàn diện',
          'Sản phẩm đầu tư đa dạng',
          'Bảo hiểm nhân thọ cao cấp'
        ],
        scoreIncrease: 80,
        projectedScore: Math.min(currentScore + 80, 100),
        rating: getRatingFromScore(Math.min(currentScore + 80, 100)),
        strategies: [
          'Chiến thuật 1: Hoàn thiện hồ sơ tín dụng (+20 điểm)',
          'Chiến thuật 2: Tối đa hóa thu nhập và tiết kiệm (+25 điểm)',
          'Chiến thuật 3: Xây dựng danh mục tài chính (+20 điểm)',
          'Chiến thuật 4: Tối ưu hóa bảo hiểm và bảo vệ (+10 điểm)',
          'Chiến thuật 5: Phát triển mạng lưới tài chính (+5 điểm)'
        ]
      }
    ];
    setProjectedScores(projections);
  };

  const getRatingFromScore = (score) => {
    for (const [rating, data] of Object.entries(vietnameseBankData.creditScoreThresholds)) {
      if (score >= data.min && score <= data.max) {
        return rating;
      }
    }
    return 'D';
  };

  const getCurrentRating = () => {
    return getRatingFromScore(scoreData.totalScore);
  };

  const getEligibleBanks = (score) => {
    return vietnameseBankData.majorBanks.filter(bank => score >= bank.minScore);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex-center" style={{ padding: '40px' }}>
          <div className="loading-spinner"></div>
          <span style={{ marginLeft: '15px' }}>Generating comprehensive improvement analysis...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card fade-in">
      <div className="section-title">
        <TrendingUp size={24} />
        Comprehensive Credit Improvement Guide
      </div>

      {/* Current Status Overview */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--primary)' }}>
          Current Credit Status
        </h3>
        <div className="grid grid-3" style={{ gap: '15px' }}>
          <div className="card" style={{ background: '#f0f9ff', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Current Score</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {scoreData.totalScore.toFixed(1)}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{getCurrentRating()} Rating</div>
          </div>
          <div className="card" style={{ background: '#f0fdf4', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Eligible Banks</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success)' }}>
              {getEligibleBanks(scoreData.totalScore).length}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>out of 6 major banks</div>
          </div>
          <div className="card" style={{ background: '#fef3c7', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Interest Rate Range</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--warning)' }}>
              {vietnameseBankData.creditScoreThresholds[getCurrentRating()].interestRate}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Current eligibility</div>
          </div>
        </div>
      </div>

      {/* Projected Score Dashboard */}
      {projectedScores && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--secondary)' }}>
            <BarChart3 size={20} style={{ marginRight: '8px', display: 'inline' }} />
            Bảng Dự Kiến Phát Triển Điểm Tín Dụng
          </h3>
          <div className="grid grid-5" style={{ gap: '12px' }}>
            {projectedScores.map((projection, index) => (
              <div key={index} className="card" style={{ 
                background: index === 0 ? '#fef3c7' : index === 1 ? '#e0e7ff' : index === 2 ? '#f0fdf4' : index === 3 ? '#f0f9ff' : '#f3e8ff',
                border: `2px solid ${index === 0 ? '#f59e0b' : index === 1 ? '#3b82f6' : index === 2 ? '#10b981' : index === 3 ? '#06b6d4' : '#8b5cf6'}`,
                position: 'relative'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '3px', fontWeight: '600' }}>
                    Sau {projection.timeframe}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {projection.projectedScore.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '500' }}>
                    {projection.rating} Rating
                  </div>
                </div>
                
                <div style={{ fontSize: '11px', color: '#059669', marginBottom: '8px', textAlign: 'center', fontWeight: '600' }}>
                  +{projection.scoreIncrease} điểm
                </div>
                
                <div style={{ fontSize: '10px', color: '#4b5563', marginBottom: '8px' }}>
                  <strong style={{ color: '#1f2937' }}>Hành động chính:</strong>
                  <ul style={{ marginTop: '3px', paddingLeft: '12px' }}>
                    {projection.improvements.slice(0, 2).map((improvement, i) => (
                      <li key={i} style={{ marginBottom: '1px', lineHeight: '1.3' }}>{improvement}</li>
                    ))}
                    {projection.improvements.length > 2 && (
                      <li style={{ color: '#6b7280', fontStyle: 'italic' }}>+{projection.improvements.length - 2} hành động khác</li>
                    )}
                  </ul>
                </div>
                
                <div style={{ fontSize: '9px', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '6px' }}>
                  <strong>Chiến thuật:</strong>
                  <div style={{ marginTop: '2px' }}>
                    {projection.strategies.slice(0, 2).map((strategy, i) => (
                      <div key={i} style={{ marginBottom: '1px', lineHeight: '1.2' }}>{strategy}</div>
                    ))}
                    {projection.strategies.length > 2 && (
                      <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>+{projection.strategies.length - 2} chiến thuật</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Timeline Progress Bar */}
          <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: 'var(--primary)' }}>
              📈 Lộ Trình Phát Triển 12 Tháng
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', minWidth: '60px' }}>Hiện tại:</div>
              <div style={{ 
                flex: 1, 
                height: '8px', 
                background: '#e5e7eb', 
                borderRadius: '4px',
                position: 'relative'
              }}>
                <div style={{
                  width: `${(scoreData.totalScore / 100) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ef4444, #f97316)',
                  borderRadius: '4px'
                }}></div>
                <div style={{
                  position: 'absolute',
                  right: '-30px',
                  top: '-5px',
                  fontSize: '10px',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  {scoreData.totalScore.toFixed(1)}
                </div>
              </div>
            </div>
            
            {projectedScores.map((projection, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', minWidth: '60px' }}>
                  {projection.timeframe}:
                </div>
                <div style={{ 
                  flex: 1, 
                  height: '6px', 
                  background: '#e5e7eb', 
                  borderRadius: '3px',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${(projection.projectedScore / 100) * 100}%`,
                    height: '100%',
                    background: index === 0 ? '#f59e0b' : index === 1 ? '#3b82f6' : index === 2 ? '#10b981' : index === 3 ? '#06b6d4' : '#8b5cf6',
                    borderRadius: '3px'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    right: '-30px',
                    top: '-3px',
                    fontSize: '10px',
                    color: '#6b7280',
                    fontWeight: '600'
                  }}>
                    {projection.projectedScore.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vietnamese Banking Landscape */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--primary)' }}>
          <Building size={20} style={{ marginRight: '8px', display: 'inline' }} />
          Vietnamese Banking Landscape
        </h3>
        <div className="grid grid-2" style={{ gap: '15px' }}>
          <div className="card" style={{ background: '#f0f9ff' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>
              Major Banks & Requirements
            </h4>
            <div style={{ fontSize: '12px' }}>
              {vietnameseBankData.majorBanks.map((bank, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < vietnameseBankData.majorBanks.length - 1 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div>
                    <strong>{bank.name}</strong>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>Rating: {bank.rating}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Min Score: {bank.minScore}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{bank.interestRate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ background: '#f0fdf4' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: 'var(--success)' }}>
              Credit Score Benefits
            </h4>
            <div style={{ fontSize: '12px' }}>
              {Object.entries(vietnameseBankData.creditScoreThresholds).slice(0, 6).map(([rating, data], index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '6px 0',
                  borderBottom: index < 5 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div>
                    <strong>{rating}</strong>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{data.min}-{data.max} points</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{data.interestRate}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{data.approval}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Improvement Roadmap */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--secondary)' }}>
          <Target size={20} style={{ marginRight: '8px', display: 'inline' }} />
          Lộ Trình Cải Thiện Chi Tiết với Nhiều Chiến Thuật
        </h3>
        
        {/* Immediate Actions (1-3 months) */}
        <div className="card" style={{ background: '#fef3c7', marginBottom: '15px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: '#d97706' }}>
            <Calendar size={16} style={{ marginRight: '8px', display: 'inline' }} />
            Phase 1: Immediate Actions (1-3 months) - Target: +25 points
          </h4>
          <div className="grid grid-2" style={{ gap: '15px' }}>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#92400e' }}>
                Employment & Income
              </h5>
              <ul style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>✅ Complete probation period at VCB</li>
                <li style={{ marginBottom: '5px' }}>✅ Get permanent position (100% salary)</li>
                <li style={{ marginBottom: '5px' }}>✅ Document salary increase</li>
                <li style={{ marginBottom: '5px' }}>✅ Maintain stable employment record</li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#92400e' }}>
                Insurance & Protection
              </h5>
              <ul style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>🏥 Purchase life insurance (30-50M VND coverage)</li>
                <li style={{ marginBottom: '5px' }}>🏥 Cost: ~500k-1M VND/year</li>
                <li style={{ marginBottom: '5px' }}>🏥 Choose reputable providers (Bao Viet, Prudential)</li>
                <li style={{ marginBottom: '5px' }}>🏥 Document insurance payments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Medium-term Goals (3-6 months) */}
        <div className="card" style={{ background: '#e0e7ff', marginBottom: '15px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: '#3730a3' }}>
            <TrendingUp size={16} style={{ marginRight: '8px', display: 'inline' }} />
            Phase 2: Medium-term Goals (3-6 months) - Target: +50 points
          </h4>
          <div className="grid grid-2" style={{ gap: '15px' }}>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1e40af' }}>
                Credit History Building
              </h5>
              <ul style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>💳 Apply for VCB credit card</li>
                <li style={{ marginBottom: '5px' }}>💳 Start with small limit (5-10M VND)</li>
                <li style={{ marginBottom: '5px' }}>💳 Use 30% of limit monthly</li>
                <li style={{ marginBottom: '5px' }}>💳 Pay full balance on time</li>
                <li style={{ marginBottom: '5px' }}>💳 Build 6+ months payment history</li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1e40af' }}>
                Financial Management
              </h5>
              <ul style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>💰 Increase monthly surplus to 10-15M VND</li>
                <li style={{ marginBottom: '5px' }}>💰 Open savings account at VCB</li>
                <li style={{ marginBottom: '5px' }}>💰 Set up automatic transfers</li>
                <li style={{ marginBottom: '5px' }}>💰 Build emergency fund (50M VND)</li>
                <li style={{ marginBottom: '5px' }}>💰 Track expenses and optimize budget</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Long-term Strategy (6-12 months) */}
        <div className="card" style={{ background: '#f0fdf4', marginBottom: '15px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: '#166534' }}>
            <Lightbulb size={16} style={{ marginRight: '8px', display: 'inline' }} />
            Phase 3: Long-term Strategy (6-12 months) - Target: +75 points
          </h4>
          <div className="grid grid-2" style={{ gap: '15px' }}>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#15803d' }}>
                Career & Income Growth
              </h5>
              <ul style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>🚀 Seek promotion to Senior/Manager</li>
                <li style={{ marginBottom: '5px' }}>🚀 Increase monthly surplus to 20M+ VND</li>
                <li style={{ marginBottom: '5px' }}>🚀 Consider side income opportunities</li>
                <li style={{ marginBottom: '5px' }}>🚀 Document all income sources</li>
                <li style={{ marginBottom: '5px' }}>🚀 Build professional network</li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#15803d' }}>
                Banking Relationship
              </h5>
              <ul style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '15px' }}>
                <li style={{ marginBottom: '5px' }}>🏦 Perfect payment history (12+ months)</li>
                <li style={{ marginBottom: '5px' }}>🏦 Multiple banking services</li>
                <li style={{ marginBottom: '5px' }}>🏦 Investment products</li>
                <li style={{ marginBottom: '5px' }}>🏦 Insurance products</li>
                <li style={{ marginBottom: '5px' }}>🏦 Build comprehensive relationship</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Strategies Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--primary)' }}>
          <Lightbulb size={20} style={{ marginRight: '8px', display: 'inline' }} />
          Chiến Thuật Nâng Cao & Phương Pháp Đa Dạng
        </h3>
        
        <div className="grid grid-2" style={{ gap: '15px' }}>
          {/* Strategy 1: Income Optimization */}
          <div className="card" style={{ background: '#f0f9ff', border: '2px solid #0ea5e9' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#0369a1' }}>
              💰 Chiến Thuật Tối Ưu Thu Nhập
            </h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#1e40af' }}>Phương pháp 1: Tăng thu nhập chính</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Xin tăng lương sau 6 tháng làm việc</li>
                  <li>Tham gia các dự án OT có thù lao</li>
                  <li>Học thêm kỹ năng để thăng tiến</li>
                </ul>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#1e40af' }}>Phương pháp 2: Thu nhập phụ</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Dạy thêm online (2-3 triệu/tháng)</li>
                  <li>Freelance viết content</li>
                  <li>Bán hàng online nhỏ lẻ</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#1e40af' }}>Phương pháp 3: Tiết kiệm thông minh</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Sử dụng app quản lý chi tiêu</li>
                  <li>Mua sắm thông minh, tận dụng khuyến mãi</li>
                  <li>Chia sẻ chi phí với bạn bè</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 2: Credit Building */}
          <div className="card" style={{ background: '#f0fdf4', border: '2px solid #22c55e' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#15803d' }}>
              🏦 Chiến Thuật Xây Dựng Tín Dụng
            </h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#166534' }}>Phương pháp 1: Thẻ tín dụng thông minh</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Sử dụng 30% hạn mức tối đa</li>
                  <li>Thanh toán đúng hạn 100%</li>
                  <li>Đa dạng hóa giao dịch</li>
                </ul>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#166534' }}>Phương pháp 2: Quan hệ ngân hàng</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Mở nhiều sản phẩm tại VCB</li>
                  <li>Tham gia chương trình khách hàng VIP</li>
                  <li>Xây dựng mối quan hệ với nhân viên</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#166534' }}>Phương pháp 3: Lịch sử thanh toán</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Thanh toán hóa đơn đúng hạn</li>
                  <li>Tránh nợ quá hạn dù chỉ 1 ngày</li>
                  <li>Đặt nhắc nhở thanh toán tự động</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 3: Risk Management */}
          <div className="card" style={{ background: '#fef3c7', border: '2px solid #f59e0b' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#d97706' }}>
              🛡️ Chiến Thuật Quản Lý Rủi Ro
            </h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#92400e' }}>Phương pháp 1: Bảo hiểm toàn diện</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Bảo hiểm nhân thọ 50M VND</li>
                  <li>Bảo hiểm sức khỏe bổ sung</li>
                  <li>Bảo hiểm tai nạn cá nhân</li>
                </ul>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#92400e' }}>Phương pháp 2: Quỹ dự phòng</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Tiết kiệm 6 tháng chi phí sinh hoạt</li>
                  <li>Đầu tư an toàn (trái phiếu, tiết kiệm)</li>
                  <li>Đa dạng hóa nguồn thu nhập</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#92400e' }}>Phương pháp 3: Giảm thiểu nợ</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Tránh vay nợ không cần thiết</li>
                  <li>Ưu tiên trả nợ lãi suất cao trước</li>
                  <li>Không sử dụng quá 40% thu nhập cho nợ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 4: Investment & Growth */}
          <div className="card" style={{ background: '#f3e8ff', border: '2px solid #8b5cf6' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#7c3aed' }}>
              📈 Chiến Thuật Đầu Tư & Phát Triển
            </h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#6b21a8' }}>Phương pháp 1: Đầu tư an toàn</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Gửi tiết kiệm có kỳ hạn</li>
                  <li>Mua trái phiếu chính phủ</li>
                  <li>Đầu tư quỹ mở ít rủi ro</li>
                </ul>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#6b21a8' }}>Phương pháp 2: Phát triển bản thân</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Học thêm chứng chỉ chuyên môn</li>
                  <li>Tham gia khóa học kỹ năng mềm</li>
                  <li>Xây dựng mạng lưới nghề nghiệp</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#6b21a8' }}>Phương pháp 3: Tài sản tích lũy</strong>
                <ul style={{ marginTop: '3px', paddingLeft: '15px' }}>
                  <li>Mua vàng tích lũy</li>
                  <li>Đầu tư bất động sản nhỏ</li>
                  <li>Xây dựng danh mục tài chính đa dạng</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Analysis */}
      {improvementAnalysis && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--primary)' }}>
            <Lightbulb size={20} style={{ marginRight: '8px', display: 'inline' }} />
            AI-Powered Analysis & Recommendations
          </h3>
          <div className="card" style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#4b5563' }}>
              {improvementAnalysis}
            </div>
          </div>
        </div>
      )}

      {/* Success Metrics */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: 'var(--secondary)' }}>
          <CheckCircle size={20} style={{ marginRight: '8px', display: 'inline' }} />
          Success Metrics & Milestones
        </h3>
        <div className="grid grid-2" style={{ gap: '15px' }}>
          <div className="card" style={{ background: '#f0f9ff' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>
              Key Performance Indicators
            </h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Credit Score Improvement</span>
                <span style={{ fontWeight: 'bold' }}>+75 points in 12 months</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Monthly Surplus Growth</span>
                <span style={{ fontWeight: 'bold' }}>3M → 20M+ VND</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Banking Services</span>
                <span style={{ fontWeight: 'bold' }}>1 → 5+ services</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Payment History</span>
                <span style={{ fontWeight: 'bold' }}>0 → 12+ months</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Insurance Coverage</span>
                <span style={{ fontWeight: 'bold' }}>0 → 50M VND</span>
              </div>
            </div>
          </div>
          <div className="card" style={{ background: '#f0fdf4' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: 'var(--success)' }}>
              Expected Outcomes
            </h4>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Loan Approval:</strong> High probability at major banks
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Interest Rate:</strong> 7.5-8.5% (vs current 12%+)
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Loan Amount:</strong> Up to 500M VND
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Processing Time:</strong> 3-5 days (vs 2+ weeks)
              </div>
              <div>
                <strong>Additional Benefits:</strong> Credit cards, investment products
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '15px' }}>
          Ready to Transform Your Credit Profile?
        </h3>
        <p style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.9 }}>
          Follow this comprehensive roadmap to improve your credit score from {scoreData.totalScore.toFixed(1)} to 84+ 
          and unlock better loan terms at Vietnamese banks.
        </p>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          💡 Use the AI Chatbot for personalized advice and real-time guidance!
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveImprovementGuide;
