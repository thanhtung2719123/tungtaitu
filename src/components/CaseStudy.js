import React, { useState } from 'react';
import { User, DollarSign, Calendar, Briefcase, Home, TrendingUp, Users, ChevronDown } from 'lucide-react';
import { allCaseStudies, calculateMonthlyPayment, analyzeAffordability } from '../utils/scoringEngine';

const CaseStudy = ({ onLoadCase, scoreData }) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const selectedCase = allCaseStudies[selectedCaseIndex];

  const loanAmount = parseInt(selectedCase.loanAmount.replace(/[^\d]/g, ''));
  const interestRate = parseFloat(selectedCase.interestRate.replace('%', ''));
  const duration = parseInt(selectedCase.duration);
  const monthlySurplus = parseInt(selectedCase.monthlySurplus.replace(/[^\d]/g, ''));

  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, duration);
  const affordability = analyzeAffordability(monthlySurplus, loanAmount, interestRate, duration);

  const getAgeFromBirth = (dateOfBirth) => {
    const birthYear = parseInt(dateOfBirth.split('/')[2]);
    return new Date().getFullYear() - birthYear;
  };

  return (
    <div className="card fade-in">
      <div className="section-title">
        <Users size={24} />
        Case Study Analysis
      </div>

      {/* Case Study Info */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '5px', color: 'var(--primary)' }}>
          📋 Case Study: A Nguyen
        </h4>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Fresh graduate seeking car loan - comprehensive credit analysis with improvement roadmap
        </p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '20px' }}>
        {/* Personal Information */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: 'var(--primary)' }}>
            Personal Information
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="flex" style={{ gap: '10px' }}>
              <User size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Name:</strong> {selectedCase.name}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <Calendar size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}>
                <strong>Date of Birth:</strong> {selectedCase.dateOfBirth} ({getAgeFromBirth(selectedCase.dateOfBirth)} years old)
              </span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <User size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Status:</strong> {selectedCase.familyStructure}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <Briefcase size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Education:</strong> {selectedCase.academicLevel}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <Briefcase size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Occupation:</strong> {selectedCase.occupation} ({selectedCase.durationOfOccupation})</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <Home size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Residence:</strong> {selectedCase.residenceStatus}</span>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: 'var(--secondary)' }}>
            Financial Information
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="flex" style={{ gap: '10px' }}>
              <DollarSign size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Monthly Surplus:</strong> {selectedCase.monthlySurplus}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <TrendingUp size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Income Level:</strong> {selectedCase.stableMonthlyMoney}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <User size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Life Insurance:</strong> {selectedCase.lifeInsurance}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <DollarSign size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Other Debt:</strong> {selectedCase.debtPaymentsRatio}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <Briefcase size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Banking Services:</strong> {selectedCase.otherBankingServices}</span>
            </div>
            <div className="flex" style={{ gap: '10px' }}>
              <Calendar size={16} color="#6b7280" />
              <span style={{ fontSize: '14px' }}><strong>Payment History:</strong> {selectedCase.debtPaymentSituation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Collateral Information */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: 'var(--warning)' }}>
          Collateral Information
        </h4>
        <div className="grid grid-3">
          <div className="card" style={{ background: '#fef3c7', marginBottom: '0' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Type of Collateral</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--warning)' }}>
              VF 5Plus Car (Vehicle)
            </div>
          </div>

          <div className="card" style={{ background: '#e0e7ff', marginBottom: '0' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Value Ratio</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>
              70-100%
            </div>
          </div>

          <div className="card" style={{ background: '#f0fdf4', marginBottom: '0' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Price Fluctuation</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--success)' }}>
              10-30%
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Loan Request */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: 'var(--primary)' }}>
          Loan Request Details
        </h4>
        <div className="grid grid-2">
          <div className="card" style={{ background: '#f0f9ff', marginBottom: '0' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Loan Amount</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)' }}>
              {selectedCase.loanAmount}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
              {selectedCase.purpose}
            </div>
          </div>

          <div className="card" style={{ background: '#f0fdf4', marginBottom: '0' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Terms</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--success)' }}>
              {selectedCase.interestRate} / {selectedCase.duration} months
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
              Secured by collateral
            </div>
          </div>
        </div>
      </div>

      {/* Affordability Analysis */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: 'var(--secondary)' }}>
          Affordability Analysis
        </h4>
        <div className="grid grid-3">
          <div className="card" style={{ background: '#fef3c7', marginBottom: '0', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Monthly Payment</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--warning)' }}>
              {monthlyPayment.toLocaleString('vi-VN')} VND
            </div>
          </div>

          <div className="card" style={{ background: '#e0e7ff', marginBottom: '0', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Payment Ratio</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>
              {affordability.ratio.toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
              of monthly surplus
            </div>
          </div>

          <div className={`card ${affordability.canAfford ? 'badge-success' : 'badge-danger'}`} style={{ marginBottom: '0', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', marginBottom: '5px' }}>Risk Level</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>
              {affordability.riskLevel}
            </div>
          </div>
        </div>

        {!affordability.canAfford && (
          <div style={{ marginTop: '15px', padding: '15px', background: '#fee2e2', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Warning:</strong>
            <span style={{ fontSize: '14px', marginLeft: '10px' }}>
              Monthly payment ({affordability.ratio.toFixed(1)}%) exceeds the recommended 40% debt-to-income ratio.
            </span>
          </div>
        )}
      </div>

      <div className="flex-center">
        <button 
          className="btn btn-primary"
          onClick={() => onLoadCase(selectedCase)}
        >
          <TrendingUp size={20} />
          Load {selectedCase.name} Case Study & Calculate Score
        </button>
      </div>

      {scoreData && (
        <div style={{ marginTop: '30px', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px' }}>
            Analysis Summary
          </h4>
          <div className="grid grid-2">
            <div>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <strong>Total Credit Score:</strong> {scoreData.totalScore.toFixed(2)}/100
              </p>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <strong>Rating:</strong> {scoreData.rating.grade} - {scoreData.rating.status}
              </p>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <strong>Risk Level:</strong> {scoreData.rating.risk}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <strong>Decision:</strong> 
                <span className={`badge ${scoreData.recommendation.approve ? 'badge-success' : 'badge-danger'}`} style={{ marginLeft: '10px' }}>
                  {scoreData.recommendation.approve ? 'APPROVE' : 'DENY'}
                </span>
              </p>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <strong>Monthly Payment Feasibility:</strong>
                <span className={`badge ${affordability.canAfford ? 'badge-success' : 'badge-danger'}`} style={{ marginLeft: '10px' }}>
                  {affordability.canAfford ? 'Affordable' : 'Not Affordable'}
                </span>
              </p>
              <p style={{ fontSize: '14px' }}>
                <strong>Terms:</strong> {scoreData.recommendation.terms}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudy;