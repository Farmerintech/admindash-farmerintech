// components/UserStatusChart.tsx
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Active Users', value: 400 },
  { name: 'Inactive Users', value: 200 },
];

const COLORS = ['#f97316', '#3b82f6']; // orange-500 and blue-500

const UserStatusChart = () => {
  return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

  );
};

export default UserStatusChart;
