import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Award, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const ScoreDashboard = ({ scoreData }) => {
  if (!scoreData) return null;

  const { personalityScore, capacityScore, totalScore, rating, recommendation, breakdown } = scoreData;

  // Data for pie chart
  const pieData = [
    { name: 'Personality', value: personalityScore * 0.4, color: '#667eea' },
    { name: 'Capacity', value: capacityScore * 0.6, color: '#764ba2' }
  ];

  // Data for bar chart - Personality breakdown
  const personalityData = Object.keys(breakdown.personality).map(key => ({
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    score: breakdown.personality[key].score,
    weighted: breakdown.personality[key].weightedScore
  }));

  // Data for bar chart - Capacity breakdown
  const capacityData = Object.keys(breakdown.capacity).map(key => ({
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    score: breakdown.capacity[key].score,
    weighted: breakdown.capacity[key].weightedScore
  }));

  // Data for bar chart - Collateral breakdown
  const collateralData = Object.keys(breakdown.collateral || {}).map(key => ({
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    score: breakdown.collateral[key].score,
    weighted: breakdown.collateral[key].weightedScore
  }));

  // Radar chart data
  const radarData = [
    ...Object.keys(breakdown.personality).slice(0, 5).map(key => ({
      subject: key.substring(0, 10),
      score: breakdown.personality[key].score,
      fullMark: 100
    }))
  ];

  return (
    <div className="fade-in">
      {/* Main Score Cards */}
      <div className="grid grid-3" style={{ marginBottom: '20px' }}>
        <div className="card stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <div style={{ fontSize: '48px', fontWeight: 700 }}>{totalScore.toFixed(1)}</div>
          <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.9 }}>Total Score</div>
          <div style={{ marginTop: '10px', fontSize: '14px' }}>out of 100</div>
        </div>

        <div className="card stat-card">
          <div className="stat-value">{personalityScore.toFixed(1)}</div>
          <div className="stat-label">Personality Score</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${personalityScore}%` }}></div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-value">{capacityScore.toFixed(1)}</div>
          <div className="stat-label">Capacity Score</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${capacityScore}%` }}></div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-value">{scoreData.collateralScore?.toFixed(1) || '0.0'}</div>
          <div className="stat-label">Collateral Score</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${scoreData.collateralScore || 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Rating and Recommendation */}
      <div className="grid grid-2" style={{ marginBottom: '20px' }}>
        <div className="card">
          <div className="section-title">
            <Award size={24} />
            Credit Rating
          </div>
          <div className="flex-center" style={{ padding: '30px', flexDirection: 'column', gap: '15px' }}>
            <div style={{ 
              fontSize: '64px', 
              fontWeight: 700, 
              color: rating.color 
            }}>
              {rating.grade}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#6b7280' }}>
              {rating.status}
            </div>
            <div className={`badge ${totalScore >= 70 ? 'badge-success' : totalScore >= 50 ? 'badge-warning' : 'badge-danger'}`}>
              Risk Level: {totalScore >= 70 ? 'Low' : totalScore >= 50 ? 'Medium' : 'High'}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-title">
            {recommendation.approve ? <CheckCircle size={24} color="#10b981" /> : <AlertTriangle size={24} color="#ef4444" />}
            Recommendation
          </div>
          <div style={{ padding: '20px' }}>
            <div className={`badge ${recommendation.approve ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '16px', padding: '10px 20px', marginBottom: '15px' }}>
              {recommendation.approve ? 'APPROVE' : 'DENY'}
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '10px' }}>
              {recommendation.message}
            </p>
            <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
              {recommendation.terms}
            </p>
          </div>
        </div>

      </div>

      {/* Collateral Rating - Separate Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="section-title">
          <Shield size={24} />
          Collateral Rating (Separate Evaluation)
        </div>
        <div className="flex-center" style={{ padding: '30px', flexDirection: 'column', gap: '15px' }}>
          <div style={{ 
            fontSize: '64px', 
            fontWeight: 700, 
            color: scoreData.collateralRating?.color || '#6b7280'
          }}>
            {scoreData.collateralRating?.grade || 'N/A'}
          </div>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            color: scoreData.collateralRating?.color || '#6b7280'
          }}>
            {scoreData.collateralRating?.status || 'No Data'}
          </div>
          <div style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            textAlign: 'center'
          }}>
            {scoreData.collateralRating?.evaluation || 'No evaluation available'}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            textAlign: 'center',
            marginTop: '10px'
          }}>
            Collateral Score: {scoreData.collateralScore?.toFixed(1) || '0.0'}/100
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-2" style={{ marginBottom: '20px' }}>
        {/* Pie Chart */}
        <div className="card">
          <div className="section-title">
            <TrendingUp size={24} />
            Score Distribution
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="card">
          <div className="section-title">
            <Award size={24} />
            Personality Profile
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#667eea" fill="#667eea" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Personality Breakdown */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="section-title">
          Personality Criteria Breakdown
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={personalityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#667eea" name="Raw Score" />
            <Bar dataKey="weighted" fill="#764ba2" name="Weighted Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Capacity Breakdown */}
      <div className="card">
        <div className="section-title">
          Capacity Criteria Breakdown
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={capacityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#10b981" name="Raw Score" />
            <Bar dataKey="weighted" fill="#f59e0b" name="Weighted Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Collateral Breakdown */}
      <div className="card">
        <div className="section-title">
          Collateral Criteria Breakdown
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={collateralData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8b5cf6" name="Raw Score" />
            <Bar dataKey="weighted" fill="#f59e0b" name="Weighted Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreDashboard;

