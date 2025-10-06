# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Application
```bash
npm start
```

### Step 3: Connect Gemini API
1. Get your API key from: https://makersuite.google.com/app/apikey
2. Paste it in the "Gemini API Configuration" section
3. Click "Connect"

## 🎯 Quick Start Options

### Option A: Try the Case Study (Fastest)
1. Open the app at `http://localhost:3000`
2. Click **"Case Study"** tab
3. Review A Nguyen's profile
4. Click **"Load Case Study & Calculate Score"**
5. View the results in Dashboard tab
6. (Optional) Click **"AI Analysis"** for AI insights

### Option B: Create Your Own Scoring
1. Click **"Scoring Form"** tab
2. Fill in all 14 criteria fields
3. Click **"Calculate Credit Score"**
4. Navigate to **"Dashboard"** to see visualizations
5. Use **"AI Analysis"** for recommendations

## 📊 What You'll See

### Dashboard Features
- **Total Credit Score** (0-100)
- **Rating** (AAA, AA, A, BBB, BB, B)
- **Approve/Deny Recommendation**
- **Interactive Charts**:
  - Pie chart for score distribution
  - Bar charts for detailed breakdowns
  - Radar chart for personality profile
- **Risk Assessment**

### AI Analysis Features
- **Full Credit Analysis**: Comprehensive evaluation by Gemini AI
- **Improvement Suggestions**: Personalized recommendations
- **Decision Support**: AI-driven approval recommendations
- **Action Plans**: Step-by-step improvement strategies

## 🔑 About A Nguyen's Case

**Question 1: Score and Rating**
- The app will calculate his exact score based on:
  - Personality factors (40%): Age, education, job, residence, etc.
  - Capacity factors (60%): Monthly surplus, debt ratio, payment history

**Question 2: Approval Decision**
- Considers credit score + loan affordability
- Monthly payment vs. monthly surplus ratio
- Risk level assessment

**Question 3: Improvement Recommendations**
- AI generates personalized action plan
- Quick wins (1-3 months)
- Medium-term goals (3-6 months)
- Long-term strategy (6-12 months)

## 💡 Pro Tips

1. **API Key**: Keep your Gemini API key private
2. **All Fields Required**: Fill all form fields for accurate scoring
3. **Explore Charts**: Hover over charts for detailed data
4. **AI Analysis**: Try both "Full Analysis" and "Improvement Plan" buttons
5. **Reset Feature**: Use "Reset All" to start fresh

## 🎨 UI Highlights

- **Beautiful gradients** and modern design
- **Real-time calculations** as you input data
- **Interactive visualizations** with Recharts
- **Responsive layout** for all screen sizes
- **Color-coded ratings** for easy understanding

## 📝 Scoring Breakdown

```
Total Score = (Personality × 40%) + (Capacity × 60%)

Personality = Average of 10 criteria × 10% each
Capacity = Weighted sum of 4 criteria (30%, 30%, 25%, 15%)
```

## 🔧 Troubleshooting

**App won't start?**
- Make sure Node.js is installed
- Delete `node_modules` and run `npm install` again

**API not working?**
- Check your API key is correct
- Ensure you have internet connection
- API key must be from Google AI Studio

**Charts not showing?**
- Make sure all form fields are filled
- Click "Calculate Credit Score" button
- Navigate to "Dashboard" tab

## 📞 Need Help?

Check the main README.md for detailed documentation about:
- Scoring criteria
- Project structure
- Technical details
- Privacy & security

---

**Enjoy analyzing credit scores with AI! 🎉**

