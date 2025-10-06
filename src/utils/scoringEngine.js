// Credit Scoring Engine based on the provided criteria

export const scoringCriteria = {
  personality: {
    weight: 0.4,
    criteria: {
      age: {
        weight: 0.1,
        scores: {
          '36-55': 100,
          '26-35': 75,
          '56-60': 50,
          '20-25': 25,
          '>60 or <18-20': 0
        }
      },
      academicLevel: {
        weight: 0.1,
        scores: {
          'Post graduated': 100,
          'Graduated': 75,
          'Vocational college': 50,
          'High school degree': 25,
          'Under high school degree': 0
        }
      },
      criminalRecord: {
        weight: 0.1,
        scores: {
          'None': 100,
          'Other': 0
        }
      },
      residenceStatus: {
        weight: 0.1,
        scores: {
          'Owner a house': 100,
          'Co-owner a house': 75,
          'Live in parent/relatives house': 50,
          'Renting': 25,
          'Other': 0
        }
      },
      numberOfResidents: {
        weight: 0.1,
        scores: {
          '<3': 100,
          '3': 75,
          '4': 50,
          '5': 25,
          '>5': 0
        }
      },
      familyStructure: {
        weight: 0.1,
        scores: {
          'Core family': 100,
          'Live with parent/relatives': 75,
          'Live with others': 50,
          'Other': 0
        }
      },
      lifeInsurance: {
        weight: 0.1,
        scores: {
          '>100 trl': 100,
          '50-100 trl': 75,
          '30-50 trl': 50,
          '<30 trl': 25,
          'None': 0
        }
      },
      occupation: {
        weight: 0.1,
        scores: {
          'Manager': 100,
          'Staff': 75,
          'Skilled worker': 50,
          'Seasonal labor': 25,
          'Unemployment': 0
        }
      },
      durationOfOccupation: {
        weight: 0.1,
        scores: {
          '>7 years': 100,
          '5-7 years': 75,
          '3-5 years': 50,
          '1-3 years': 25,
          '<1 years': 0
        }
      },
      placeOfOccupation: {
        weight: 0.1,
        scores: {
          'State agency': 100,
          'Private company': 75,
          'MNCs': 50,
          'Freelance': 25,
          'None': 0
        }
      }
    }
  },
  capacity: {
    weight: 0.6,
    criteria: {
      stableMonthlyMoney: {
        weight: 0.3,
        scores: {
          '>50 trl': 100,
          '20-50 trl': 75,
          '10-20 trl': 50,
          '5-10 trl': 25,
          '<5 trl': 0
        }
      },
      debtPaymentsRatio: {
        weight: 0.3,
        scores: {
          '<30% or No other debts': 100,
          '30-45%': 75,
          '40%-50%': 50,
          '60%-70%': 25,
          '>75%': 0
        }
      },
      debtPaymentSituation: {
        weight: 0.25,
        scores: {
          'Always on time': 100,
          'Had extended debts, currently paying on time': 75,
          'Had bad debt/new client': 50,
          'Had bad debt, potential being overdraft debt': 25,
          'Having extended debts or No information': 0
        }
      },
      otherBankingServices: {
        weight: 0.15,
        scores: {
          'Saving and other banking services': 100,
          'Saving or other banking services': 75,
          'Current account or payment services only': 50,
          'Other loans': 25,
          'None': 0
        }
      }
    }
  }
};

export const calculateScore = (formData) => {
  let personalityScore = 0;
  let capacityScore = 0;
  const breakdown = {
    personality: {},
    capacity: {}
  };

  // Calculate Personality Score
  Object.keys(scoringCriteria.personality.criteria).forEach(criterion => {
    const criterionData = scoringCriteria.personality.criteria[criterion];
    const value = formData[criterion];
    const score = criterionData.scores[value] || 0;
    const weightedScore = score * criterionData.weight;
    personalityScore += weightedScore;
    breakdown.personality[criterion] = {
      score,
      weightedScore,
      weight: criterionData.weight
    };
  });

  // Calculate Capacity Score
  Object.keys(scoringCriteria.capacity.criteria).forEach(criterion => {
    const criterionData = scoringCriteria.capacity.criteria[criterion];
    const value = formData[criterion];
    const score = criterionData.scores[value] || 0;
    const weightedScore = score * criterionData.weight;
    capacityScore += weightedScore;
    breakdown.capacity[criterion] = {
      score,
      weightedScore,
      weight: criterionData.weight
    };
  });

  // Calculate Total Score
  const totalPersonality = personalityScore * scoringCriteria.personality.weight;
  const totalCapacity = capacityScore * scoringCriteria.capacity.weight;
  const totalScore = totalPersonality + totalCapacity;

  return {
    personalityScore,
    capacityScore,
    totalScore,
    breakdown,
    rating: getRating(totalScore),
    recommendation: getRecommendation(totalScore)
  };
};

export const getRating = (score) => {
  if (score >= 95) return { grade: 'AAA', status: 'Excellent', color: '#10b981', risk: 'Low' };
  if (score >= 90) return { grade: 'AA', status: 'Very Good', color: '#34d399', risk: 'Low' };
  if (score >= 85) return { grade: 'A', status: 'Good', color: '#84cc16', risk: 'Low' };
  if (score >= 80) return { grade: 'BBB', status: 'Average', color: '#fbbf24', risk: 'Average' };
  if (score >= 70) return { grade: 'BB', status: 'Below Average', color: '#fb923c', risk: 'Average' };
  if (score >= 60) return { grade: 'B', status: 'Poor', color: '#f97316', risk: 'Average' };
  if (score >= 50) return { grade: 'CCC', status: 'Very Poor', color: '#ef4444', risk: 'High' };
  if (score >= 40) return { grade: 'CC', status: 'Extremely Poor', color: '#dc2626', risk: 'High' };
  if (score >= 35) return { grade: 'C', status: 'Default Risk', color: '#991b1b', risk: 'High' };
  return { grade: 'D', status: 'Default', color: '#7f1d1d', risk: 'High' };
};

export const getRecommendation = (score) => {
  if (score >= 95) {
    return {
      approve: true,
      message: 'Excellent candidate. Prime lending rate available.',
      terms: 'Best interest rates with maximum loan amount and flexible terms.'
    };
  } else if (score >= 85) {
    return {
      approve: true,
      message: 'Very good candidate. Low risk profile.',
      terms: 'Favorable interest rates with standard terms.'
    };
  } else if (score >= 80) {
    return {
      approve: true,
      message: 'Good candidate. Average risk profile.',
      terms: 'Standard interest rates with normal terms.'
    };
  } else if (score >= 70) {
    return {
      approve: true,
      message: 'Acceptable candidate. Higher risk profile.',
      terms: 'Above-average interest rates or reduced loan amount.'
    };
  } else if (score >= 60) {
    return {
      approve: true,
      message: 'Marginal candidate. High risk profile.',
      terms: 'High interest rates and strict conditions required.'
    };
  } else if (score >= 50) {
    return {
      approve: false,
      message: 'Very high risk profile. Conditional approval only.',
      terms: 'Requires co-signer, collateral, or significant down payment.'
    };
  } else {
    return {
      approve: false,
      message: 'Extremely high risk. Loan denial recommended.',
      terms: 'Customer must significantly improve credit profile before reapplying.'
    };
  }
};

// Case Study 1: A Nguyen - Fresh Graduate (Low Score)
export const aNguyenCaseStudy = {
  name: 'A Nguyen',
  age: '20-25',
  academicLevel: 'Graduated',
  criminalRecord: 'None',
  residenceStatus: 'Renting',
  numberOfResidents: '3',
  familyStructure: 'Live with others',
  lifeInsurance: 'None',
  occupation: 'Staff',
  durationOfOccupation: '<1 years',
  placeOfOccupation: 'State agency',
  stableMonthlyMoney: '<5 trl',
  debtPaymentsRatio: '<30% or No other debts',
  debtPaymentSituation: 'Having extended debts or No information',
  otherBankingServices: 'Current account or payment services only',
  
  // Additional case details
  dateOfBirth: '15/3/2003',
  loanAmount: '350,000,000 VND',
  interestRate: '8.5%',
  duration: '48 months',
  monthlySurplus: '3,000,000 VND',
  purpose: 'Buy VF 5Plus electric car'
};

// Case Study 2: B Tran - Experienced Professional (High Score)
export const bTranCaseStudy = {
  name: 'B Tran',
  age: '35-40',
  academicLevel: 'Post-graduate',
  criminalRecord: 'None',
  residenceStatus: 'Own house',
  numberOfResidents: '2',
  familyStructure: 'Married with children',
  lifeInsurance: '>100 trl',
  occupation: 'Manager',
  durationOfOccupation: '>5 years',
  placeOfOccupation: 'State agency',
  stableMonthlyMoney: '>50 trl',
  debtPaymentsRatio: 'No other debts',
  debtPaymentSituation: 'Always pay on time',
  otherBankingServices: 'Current account, savings, credit card, investment',
  
  // Additional case details
  dateOfBirth: '10/8/1985',
  loanAmount: '500,000,000 VND',
  interestRate: '7.5%',
  duration: '60 months',
  monthlySurplus: '25,000,000 VND',
  purpose: 'Buy luxury car'
};

// Case Study 3: C Le - Young Entrepreneur (Medium Score)
export const cLeCaseStudy = {
  name: 'C Le',
  age: '26-30',
  academicLevel: 'Graduated',
  criminalRecord: 'None',
  residenceStatus: 'Renting',
  numberOfResidents: '1',
  familyStructure: 'Single',
  lifeInsurance: '30-50 trl',
  occupation: 'Business owner',
  durationOfOccupation: '3-5 years',
  placeOfOccupation: 'Private company',
  stableMonthlyMoney: '20-30 trl',
  debtPaymentsRatio: 'No other debts',
  debtPaymentSituation: 'Always pay on time',
  otherBankingServices: 'Current account, savings, credit card',
  
  // Additional case details
  dateOfBirth: '22/5/1995',
  loanAmount: '200,000,000 VND',
  interestRate: '8.0%',
  duration: '36 months',
  monthlySurplus: '15,000,000 VND',
  purpose: 'Business equipment loan'
};

// Case Study 4: D Pham - Senior Executive (Excellent Score)
export const dPhamCaseStudy = {
  name: 'D Pham',
  age: '45-50',
  academicLevel: 'Post-graduate',
  criminalRecord: 'None',
  residenceStatus: 'Own house',
  numberOfResidents: '4',
  familyStructure: 'Married with children',
  lifeInsurance: '>100 trl',
  occupation: 'Director',
  durationOfOccupation: '>5 years',
  placeOfOccupation: 'State agency',
  stableMonthlyMoney: '>50 trl',
  debtPaymentsRatio: 'No other debts',
  debtPaymentSituation: 'Always pay on time',
  otherBankingServices: 'Current account, savings, credit card, investment, insurance',
  
  // Additional case details
  dateOfBirth: '5/12/1975',
  loanAmount: '800,000,000 VND',
  interestRate: '6.5%',
  duration: '72 months',
  monthlySurplus: '40,000,000 VND',
  purpose: 'Real estate investment'
};

// Case Study 5: E Vo - Recent Graduate with Issues (Poor Score)
export const eVoCaseStudy = {
  name: 'E Vo',
  age: '20-25',
  academicLevel: 'High school',
  criminalRecord: 'None',
  residenceStatus: 'Renting',
  numberOfResidents: '5',
  familyStructure: 'Live with others',
  lifeInsurance: 'None',
  occupation: 'Worker',
  durationOfOccupation: '<1 years',
  placeOfOccupation: 'Private company',
  stableMonthlyMoney: '<5 trl',
  debtPaymentsRatio: 'Having other debts',
  debtPaymentSituation: 'Having overdue debts or No historical payment',
  otherBankingServices: 'Current account or payment services (salary only)',
  
  // Additional case details
  dateOfBirth: '18/7/2002',
  loanAmount: '100,000,000 VND',
  interestRate: '12.0%',
  duration: '24 months',
  monthlySurplus: '2,000,000 VND',
  purpose: 'Personal loan'
};

// All case studies array (only A Nguyen)
export const allCaseStudies = [aNguyenCaseStudy];

export const calculateMonthlyPayment = (principal, annualRate, months) => {
  const monthlyRate = annualRate / 100 / 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
};

export const analyzeAffordability = (monthlySurplus, loanAmount, interestRate, duration) => {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, duration);
  const ratio = (monthlyPayment / monthlySurplus) * 100;
  
  return {
    monthlyPayment,
    monthlySurplus,
    ratio,
    canAfford: ratio <= 40,
    riskLevel: ratio > 60 ? 'High' : ratio > 40 ? 'Medium' : 'Low'
  };
};

