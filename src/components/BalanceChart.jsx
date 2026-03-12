import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const BalanceChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      {data.length > 1 ? (
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="spin" 
              stroke="#666" 
              tick={{ fill: '#888', fontSize: 12 }} 
              axisLine={{ stroke: '#333' }}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#666" 
              tick={{ fill: '#888', fontSize: 12 }}
              axisLine={{ stroke: '#333' }}
              tickLine={false}
              tickFormatter={(value) => `Rp ${value / 1000}k`}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 10, 15, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                backdropFilter: 'blur(10px)'
              }}
              formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)}
              labelFormatter={(label) => `Spin ${label}`}
            />
            {/* Initial balance reference line */}
            <ReferenceLine y={1000000} stroke="#00e5ff" strokeDasharray="3 3" opacity={0.5} />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--accent-color)" 
              strokeWidth={3}
              activeDot={{ r: 6, fill: 'var(--accent-color)', stroke: '#fff', strokeWidth: 2 }}
              dot={false}
              isAnimationActive={true}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666' }}>
          <p>Spin to see your balance history...</p>
        </div>
      )}
    </div>
  );
};

export default BalanceChart;
