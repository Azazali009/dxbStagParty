"use client";
import Image from "next/image";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ReportsPage({ results, trend }) {
  // Split results
  const mostPopular = results.slice(0, 3); // top 3
  const leastPopular = results.slice(-3).reverse(); // bottom 3

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-matalicGold sm:text-4xl">
        Voting Reports
      </h1>

      {/* Most Popular Activities */}
      <h2 className="mb-4 text-xl font-semibold">Most Popular Activities</h2>
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mostPopular.map((r) => (
          <div
            key={r.id}
            className="flex items-center space-x-3 rounded-lg border border-gray-700 bg-gray-900 p-4"
          >
            {r.image && (
              <Image
                src={r.image}
                alt={r.name}
                width={500}
                height={500}
                className="w-[100px] rounded object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-gray-400">{r.votes} votes</p>
            </div>
          </div>
        ))}
      </div>

      {/* Least Popular Activities */}
      <h2 className="mb-4 text-xl font-semibold text-yellow-400">
        Least Popular Activities
      </h2>
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leastPopular.map((r) => (
          <div
            key={r.id}
            className="flex items-center space-x-3 rounded-lg border border-gray-700 bg-gray-900 p-4"
          >
            {r.image && (
              <Image
                src={r.image}
                alt={r.name}
                width={500}
                height={500}
                className="w-[100px] rounded object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-gray-400">{r.votes} votes</p>
            </div>
          </div>
        ))}
      </div>

      {/* Votes Trend */}
      <h2 className="mb-4 text-xl font-semibold">Voting Trend (Over Time)</h2>
      <div className="h-72 w-full rounded-lg border border-gray-700 bg-gray-900 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="votes"
              stroke="#e0b15e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
