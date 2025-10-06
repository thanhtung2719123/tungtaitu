# Credit Scoring System - Deployment Guide

## 🚀 Vercel Deployment

This React application is ready for deployment on Vercel.

### Prerequisites
- GitHub repository: https://github.com/thanhtung2719123/tungtaitu
- Vercel account

### Deployment Steps

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import from GitHub repository: `thanhtung2719123/tungtaitu`

2. **Configure Build Settings:**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables:**
   - No environment variables needed (API key is hardcoded for demo)

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://tungtaitu.vercel.app`

### Features Included
- ✅ Credit scoring system with Gemini 2.5 Pro integration
- ✅ Case study analysis for A Nguyen
- ✅ Comprehensive improvement guide
- ✅ AI chatbot for formula explanations
- ✅ Beautiful dashboard with charts
- ✅ Vietnamese banking data integration
- ✅ Responsive design

### API Configuration
- Gemini 2.5 Pro API key is included
- No additional setup required

### Custom Domain (Optional)
- Add custom domain in Vercel dashboard
- Configure DNS settings as instructed

## 📱 Local Development

```bash
npm install
npm start
```

## 🔧 Build for Production

```bash
npm run build
```

The build folder contains the production-ready files.
