import React from 'react';
import { scoringCriteria } from '../utils/scoringEngine';
import { User, Briefcase, Home, DollarSign } from 'lucide-react';

const ScoringForm = ({ formData, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  const renderSelect = (field, label, options, icon) => (
    <div className="form-group">
      <label className="form-label">
        <div className="flex" style={{ gap: '8px', alignItems: 'center' }}>
          {icon}
          {label}
        </div>
      </label>
      <select
        className="form-select"
        value={formData[field] || ''}
        onChange={(e) => handleChange(field, e.target.value)}
      >
        <option value="">Select...</option>
        {Object.keys(options).map(option => (
          <option key={option} value={option}>
            {option} ({options[option]} pts)
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="card fade-in">
      <div className="section-title">
        <User size={24} />
        Credit Scoring Form
      </div>

      {/* Personality Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          marginBottom: '20px',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <User size={20} />
          Part I: Personality (40% Weight)
        </h3>
        
        <div className="grid grid-2">
          {renderSelect(
            'age',
            'Age',
            scoringCriteria.personality.criteria.age.scores,
            <User size={16} />
          )}
          
          {renderSelect(
            'academicLevel',
            'Academic Level',
            scoringCriteria.personality.criteria.academicLevel.scores,
            <Briefcase size={16} />
          )}
          
          {renderSelect(
            'criminalRecord',
            'Criminal Record',
            scoringCriteria.personality.criteria.criminalRecord.scores,
            <User size={16} />
          )}
          
          {renderSelect(
            'residenceStatus',
            'Residence Status',
            scoringCriteria.personality.criteria.residenceStatus.scores,
            <Home size={16} />
          )}
          
          {renderSelect(
            'numberOfResidents',
            'Number of Residents',
            scoringCriteria.personality.criteria.numberOfResidents.scores,
            <User size={16} />
          )}
          
          {renderSelect(
            'familyStructure',
            'Family Structure',
            scoringCriteria.personality.criteria.familyStructure.scores,
            <User size={16} />
          )}
          
          {renderSelect(
            'lifeInsurance',
            'Life Insurance',
            scoringCriteria.personality.criteria.lifeInsurance.scores,
            <DollarSign size={16} />
          )}
          
          {renderSelect(
            'occupation',
            'Occupation',
            scoringCriteria.personality.criteria.occupation.scores,
            <Briefcase size={16} />
          )}
          
          {renderSelect(
            'durationOfOccupation',
            'Duration of Current Occupation',
            scoringCriteria.personality.criteria.durationOfOccupation.scores,
            <Briefcase size={16} />
          )}
          
          {renderSelect(
            'placeOfOccupation',
            'Place of Occupation',
            scoringCriteria.personality.criteria.placeOfOccupation.scores,
            <Briefcase size={16} />
          )}
        </div>
      </div>

      <div className="divider"></div>

      {/* Capacity Section */}
      <div>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          marginBottom: '20px',
          color: 'var(--secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <DollarSign size={20} />
          Part II: Capacity (60% Weight)
        </h3>
        
        <div className="grid grid-2">
          {renderSelect(
            'stableMonthlyMoney',
            'Stable Monthly Net Surplus Money (30%)',
            scoringCriteria.capacity.criteria.stableMonthlyMoney.scores,
            <DollarSign size={16} />
          )}
          
          {renderSelect(
            'debtPaymentsRatio',
            'Debt Payments / Total Income (30%)',
            scoringCriteria.capacity.criteria.debtPaymentsRatio.scores,
            <DollarSign size={16} />
          )}
          
          {renderSelect(
            'debtPaymentSituation',
            'Debt Payment Situation (25%)',
            scoringCriteria.capacity.criteria.debtPaymentSituation.scores,
            <DollarSign size={16} />
          )}
          
          {renderSelect(
            'otherBankingServices',
            'Other Banking Services (15%)',
            scoringCriteria.capacity.criteria.otherBankingServices.scores,
            <DollarSign size={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoringForm;

