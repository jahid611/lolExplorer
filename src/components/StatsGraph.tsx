import React from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StatsGraphProps {
  data: Array<{
    game: number;
    kda: number;
    cs: number;
    gold: number;
  }>;
}

const StatsGraph: React.FC<StatsGraphProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line 
            type="monotone" 
            dataKey="kda" 
            stroke="#EAB308" 
            strokeWidth={2}
            dot={{ fill: '#EAB308' }}
          />
          <Line 
            type="monotone" 
            dataKey="cs" 
            stroke="#6366F1" 
            strokeWidth={2}
            dot={{ fill: '#6366F1' }}
          />
          <XAxis dataKey="game" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              borderRadius: '0.5rem'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsGraph;