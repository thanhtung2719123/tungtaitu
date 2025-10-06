import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

export const initializeGemini = (apiKey) => {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    // Store API key for chatbot use
    localStorage.setItem('gemini_api_key', apiKey);
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    return false;
  }
};

export const analyzeCreditProfile = async (scoreData, caseDetails) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please provide an API key.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

  const prompt = `
You are a senior credit analyst at a commercial bank. Analyze the following credit application:

**Applicant Profile:**
- Name: ${caseDetails.name || 'N/A'}
- Age: ${caseDetails.age}
- Academic Level: ${caseDetails.academicLevel}
- Occupation: ${caseDetails.occupation}
- Duration at current job: ${caseDetails.durationOfOccupation}
- Monthly Surplus: ${caseDetails.monthlySurplus || 'N/A'}

**Loan Request:**
- Amount: ${caseDetails.loanAmount || 'N/A'}
- Interest Rate: ${caseDetails.interestRate || 'N/A'}
- Duration: ${caseDetails.duration || 'N/A'}
- Purpose: ${caseDetails.purpose || 'N/A'}

**Credit Scores:**
- Personality Score: ${scoreData.personalityScore.toFixed(2)}/100
- Capacity Score: ${scoreData.capacityScore.toFixed(2)}/100
- Total Score: ${scoreData.totalScore.toFixed(2)}/100
- Rating: ${scoreData.rating.grade} (${scoreData.rating.status})

**Score Breakdown:**
Personality Factors:
${Object.keys(scoreData.breakdown.personality).map(key => 
  `- ${key}: ${scoreData.breakdown.personality[key].score}/100 (weighted: ${scoreData.breakdown.personality[key].weightedScore.toFixed(2)})`
).join('\n')}

Capacity Factors:
${Object.keys(scoreData.breakdown.capacity).map(key => 
  `- ${key}: ${scoreData.breakdown.capacity[key].score}/100 (weighted: ${scoreData.breakdown.capacity[key].weightedScore.toFixed(2)})`
).join('\n')}

Please provide:
1. **Decision**: Should the bank APPROVE or DENY this loan application?
2. **Risk Assessment**: Detailed analysis of the risks involved
3. **Strengths**: What are the applicant's strong points?
4. **Weaknesses**: What are the concerning factors?
5. **Recommendations**: 
   - For the bank: What terms or conditions should be applied?
   - For the applicant: How can they improve their credit profile?
6. **Action Plan**: Specific steps the applicant should take to improve their creditworthiness

Format your response in a clear, professional manner with sections.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze credit profile: ' + error.message);
  }
};

export const getImprovementSuggestions = async (scoreData, weakestAreas) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please provide an API key.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

  const prompt = `
As a financial advisor, provide specific, actionable advice for improving a credit score.

**Current Score:** ${scoreData.totalScore.toFixed(2)}/100
**Rating:** ${scoreData.rating.grade}

**Weakest Areas:**
${weakestAreas.map(area => `- ${area.criterion}: ${area.score}/100`).join('\n')}

Provide:
1. **Quick Wins**: Immediate actions that can be taken (within 1-3 months)
2. **Medium-term Goals**: Actions to take in 3-6 months
3. **Long-term Strategy**: 6-12 month plan for improvement
4. **Financial Tips**: General financial health recommendations
5. **Priority Order**: Which areas to focus on first and why

Be specific and practical with your recommendations.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get improvement suggestions: ' + error.message);
  }
};

export const compareLoanScenarios = async (baseCase, scenarios) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please provide an API key.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

  const prompt = `
Compare different loan scenarios for a borrower and provide recommendations.

**Base Case:**
${JSON.stringify(baseCase, null, 2)}

**Alternative Scenarios:**
${JSON.stringify(scenarios, null, 2)}

Analyze:
1. Which scenario is most favorable for the borrower?
2. Which scenario minimizes risk for the bank?
3. What is the best balanced option?
4. Trade-offs between different scenarios

Provide a clear recommendation with justification.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to compare scenarios: ' + error.message);
  }
};

