import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

export const SentimentBarChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
        itemStyle={{ fontSize: '12px' }}
      />
      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} fillOpacity={0.8} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const ParticipationAreaChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
      <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
      />
      <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const PersonalityPieChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie 
        data={data} 
        innerRadius={60} 
        outerRadius={100} 
        paddingAngle={5} 
        dataKey="value"
        animationDuration={1500}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'][index % 4]} />
        ))}
      </Pie>
      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
    </PieChart>
  </ResponsiveContainer>
);
