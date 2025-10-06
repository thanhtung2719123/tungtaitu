# 🚀 GitHub Setup & Vercel Deployment Guide

## Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd H:\baitap

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Credit Scoring System with Gemini 2.5 Pro"

# Add remote repository
git remote add origin https://github.com/thanhtung2719123/tungtaitu.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Vercel Deployment

### Option A: Automatic Deployment (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `thanhtung2719123/tungtaitu`
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://tungtaitu.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: tungtaitu-credit-scoring
# - Directory: ./
# - Override settings? N
```

## Step 3: Environment Variables (Optional)

If you want to use your own Gemini API key:

1. **In Vercel Dashboard:**
   - Go to Project Settings
   - Navigate to Environment Variables
   - Add: `REACT_APP_GEMINI_API_KEY` = `your_api_key_here`

2. **Update the code:**
   ```javascript
   // In src/utils/geminiAPI.js
   const apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyDpewH4MoD8nBpKkyXEeHiGpYfINvSg-vY';
   ```

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings
   - Navigate to Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 🎯 Deployment Checklist

- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Build settings configured
- [ ] Deployment successful
- [ ] App accessible at Vercel URL
- [ ] All features working correctly

## 🔧 Troubleshooting

### Build Errors
- Check Node.js version (16+ required)
- Verify all dependencies in package.json
- Check for TypeScript errors

### API Issues
- Verify Gemini API key is valid
- Check network connectivity
- Review browser console for errors

### Performance Issues
- Optimize images and assets
- Enable Vercel's edge functions
- Use CDN for static assets

## 📱 Post-Deployment

### Test Your Deployment
1. **Basic Functionality**
   - [ ] App loads correctly
   - [ ] Case study loads
   - [ ] Score calculation works
   - [ ] Dashboard displays properly

2. **AI Features**
   - [ ] Chatbot responds
   - [ ] Gemini analysis works
   - [ ] Improvement guide generates

3. **Responsive Design**
   - [ ] Mobile view works
   - [ ] Tablet view works
   - [ ] Desktop view works

### Monitor Performance
- Use Vercel Analytics
- Check Core Web Vitals
- Monitor API usage

## 🎉 Success!

Your Credit Scoring System is now live at:
**https://tungtaitu.vercel.app**

### Features Available:
- ✅ Credit scoring with Gemini 2.5 Pro
- ✅ Case study analysis
- ✅ Comprehensive improvement guide
- ✅ AI chatbot
- ✅ Beautiful dashboard
- ✅ Vietnamese banking data
- ✅ Responsive design

---

**Ready for production use! 🚀**
