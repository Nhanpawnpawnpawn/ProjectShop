import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Revenue = ({ shopName }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("month"); // 'day' or 'month'
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/revenue/${shopName}?filter=${selectedFilter}`
        );

        const data = await response.json();
        setRevenueData(data);
        updateChart(data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenue();
  }, [shopName, selectedFilter]);

  const updateChart = (data) => {
    const labels = data.map((entry) => entry.label);
    const amounts = data.map((entry) => entry.amount);
    setChartData({
      labels: labels,
      datasets: [
        {
          label:
            selectedFilter === "month"
              ? "Doanh thu theo tháng"
              : "Doanh thu theo ngày",
          data: amounts,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 border border-gray-300 rounded-md">
      <h3 className="text-xl font-bold mb-4">Doanh Thu</h3>
      <div className="border border-gray-300 p-4 rounded-md mb-6">
        <label htmlFor="revenueFilter" className="block font-medium mb-2">
          Chọn Bộ Lọc
        </label>
        <select
          id="revenueFilter"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="month">Theo Tháng</option>
          <option value="day">Theo Ngày</option>
        </select>
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b border-gray-300">
                {selectedFilter === "month" ? "Tháng" : "Ngày"}
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Số Tiền</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(revenueData) && revenueData.length > 0 ? (
              revenueData.map((entry) => (
                <tr key={entry.label} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-300">
                    {entry.label}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {entry.amount.toLocaleString()} VND
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-2 text-center border-b border-gray-300"
                >
                  Không có dữ liệu doanh thu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border border-gray-300 p-4 rounded-md">
        {Object.keys(chartData).length > 0 ? (
          <Bar data={chartData} options={{ responsive: true }} />
        ) : (
          <p className="text-center">Đang tải dữ liệu biểu đồ...</p>
        )}
      </div>
    </div>
  );
};

export default Revenue;
