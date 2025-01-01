import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
        //console.log(data);
        updateChart(data); // Cập nhật biểu đồ sau khi lấy dữ liệu
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenue();
  }, [shopName, selectedFilter]);

  useEffect(() => {
    //console.log("Revenue data updated:", revenueData);
  }, [revenueData]);

  // Cập nhật biểu đồ cột
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

  // Xử lý khi thay đổi bộ lọc
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div>
      <h3>Doanh Thu</h3>
      Chọn bộ lọc
      <Form.Group controlId="revenueFilter" className="mb-3">
        <Form.Label>Lọc theo</Form.Label>
        <Form.Control
          as="select"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="month">Theo Tháng</option>
          <option value="day">Theo Ngày</option>
        </Form.Control>
      </Form.Group>
      {/* Bảng hiển thị doanh thu */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{selectedFilter === "month" ? "Tháng" : "Ngày"}</th>
            <th>Số Tiền</th>
          </tr>
        </thead>
        <tbody>
          {/* Kiểm tra revenueData có phải là mảng trước khi sử dụng .map() */}
          {Array.isArray(revenueData) && revenueData.length > 0 ? (
            revenueData.map((entry) => (
              <tr key={entry.label}>
                <td>{entry.label}</td>
                <td>{entry.amount.toLocaleString()} VND</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Không có dữ liệu doanh thu</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Biểu đồ */}
      <div className="my-4">
        {Object.keys(chartData).length > 0 ? (
          <Bar data={chartData} options={{ responsive: true }} />
        ) : (
          <p>Đang tải dữ liệu biểu đồ...</p>
        )}
      </div>
    </div>
  );
};

export default Revenue;
