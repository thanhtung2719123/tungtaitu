# 🏦 Group 3 - Credit Scoring System - AI Powered

A comprehensive React-based credit scoring system with Gemini 2.5 Pro integration, designed for Vietnamese banking scenarios.

## ✨ Features

### 🎯 Core Functionality
- **Credit Scoring Engine**: Personality (40%) + Capacity (60%) calculation
- **Case Study Analysis**: Detailed analysis for A Nguyen scenario
- **AI-Powered Insights**: Gemini 2.5 Pro integration for personalized recommendations
- **Comprehensive Dashboard**: Beautiful charts and visualizations

### 📊 Scoring System
- **10-Group Rating Scale**: AAA, AA, A, BBB, BB, B, CCC, CC, C, D
- **Personality Factors**: Age, Education, Criminal Record, Residence, Family, Insurance, Occupation, Duration, Workplace
- **Capacity Factors**: Monthly Surplus, Debt Ratio, Payment History, Banking Services

### 🤖 AI Features
- **Smart Chatbot**: Explains formulas and calculations
- **Improvement Roadmap**: 12-month development plan with 20+ strategies
- **Vietnamese Banking Data**: Real bank requirements and interest rates
- **Projected Dashboard**: Timeline-based score improvements

### 🎨 User Experience
- **Modern UI**: Beautiful, responsive design
- **Interactive Charts**: Radar charts, bar charts, pie charts
- **Real-time Calculations**: Instant score updates
- **Vietnamese Localization**: User-friendly Vietnamese interface

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/thanhtung2719123/tungtaitu.git
cd group-3

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
npm run build
```

## 📱 Live Demo

**Deployed on Vercel**: [https://group-3.vercel.app](https://group-3.vercel.app)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js              # App header
│   ├── CaseStudy.js           # Case study analysis
│   ├── ScoreDashboard.js      # Main dashboard
│   ├── CaseStudyAnswers.js    # Detailed Q&A
│   ├── ComprehensiveImprovementGuide.js  # AI-powered guide
│   └── AIChatbot.js           # AI assistant
├── utils/
│   ├── scoringEngine.js       # Core scoring logic
│   └── geminiAPI.js          # AI integration
└── App.js                     # Main application
```

## 🧮 Scoring Formula

### Personality (40% weight)
- Age: 10%
- Academic Level: 10%
- Criminal Record: 10%
- Residence Status: 10%
- Number of Residents: 10%
- Family Structure: 10%
- Life Insurance: 10%
- Occupation: 10%
- Duration of Occupation: 10%
- Place of Occupation: 10%

### Capacity (60% weight)
- Stable Monthly Money: 30%
- Debt Payments Ratio: 30%
- Debt Payment Situation: 25%
- Other Banking Services: 15%

**Total Score = Personality × 40% + Capacity × 60%**

## 🎯 Case Study: A Nguyen

**Profile**: Fresh graduate seeking car loan
- **Current Score**: 43.5/100 (CC Rating)
- **Target Score**: 84/100 (BBB Rating)
- **Timeline**: 12 months improvement plan
- **Strategies**: 20+ detailed improvement tactics

## 🤖 AI Integration

- **Model**: Gemini 2.5 Pro
- **Features**: 
  - Formula explanations
  - Personalized improvement plans
  - Vietnamese banking insights
  - Real-time analysis

## 🏦 Vietnamese Banking Integration

Real data from major Vietnamese banks:
- Vietcombank, BIDV, Agribank
- VietinBank, Techcombank, ACB
- Interest rates and approval criteria
- Credit score requirements

## 🛠️ Technologies Used

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: CSS3, Responsive Design
- **Charts**: Custom SVG visualizations
- **AI**: Google Gemini 2.5 Pro API
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📈 Performance

- **Build Size**: Optimized for production
- **Load Time**: < 2 seconds
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG compliant

## 🔧 Configuration

### API Key
The Gemini API key is included for demo purposes. For production:
1. Create your own API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Replace the key in `src/utils/geminiAPI.js`

### Customization
- Modify scoring criteria in `src/utils/scoringEngine.js`
- Update case studies in the same file
- Customize UI in component files

## 📝 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Vietnamese Banking Education**