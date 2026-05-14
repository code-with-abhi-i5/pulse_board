import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function SparklineChart({ data, color = '#6366f1', height = 40 }) {
  if (!data || data.length === 0) return null
  const chartData = data.map((price, i) => ({ i, price }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="price" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
