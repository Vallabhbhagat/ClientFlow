import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

export default function AnalyticsChart({ labels, series }) {
  const data = {
    labels,
    datasets: series.map((s) => ({
      label: s.label,
      data: s.data,
      borderColor: s.color,
      backgroundColor: `${s.color}22`,
      fill: true,
      tension: 0.35,
      pointRadius: 0,
      borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: "rgba(234,240,255,0.78)" } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: "rgba(234,240,255,0.55)" }, grid: { color: "rgba(255,255,255,0.06)" } },
      y: { ticks: { color: "rgba(234,240,255,0.55)" }, grid: { color: "rgba(255,255,255,0.06)" } },
    },
  };

  return (
    <div className="chart-wrap">
      <Line data={data} options={options} />
    </div>
  );
}

