import formatNumberVN from "@/utils/formatNumberVN";
import './Overview.scss';
import webColors from "@/constants/webColors";
import { Bar, BarChart, CartesianGrid, Cell, Label, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { getOrderQuantityByMonth, getOrderQuantityByStatus, getOrderQuantityWaitingProcess, getProductAlmostOutOfStock, getProductHasExpired, getProductIsAboutToExpire, getProductOutOfStock, getProfit, getRevenueByMonth } from "@/api/statisticApi";

const data1 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

const COLORS = ['#FF3F33', '#0088FE'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  index?: number;
}) => {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    percent === undefined ||
    index === undefined
  ) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Overview = () => {
  const [profit, setProfit] = useState<number>();
  const [productIsAboutToExpire, setProductIsAboutToExpire] = useState<{ products: { maLoHang: string, maThucPham: string, tenThucPham: string, soLuong: number, hanSuDung: string; }[], quantity: number; }>();
  const [productHasExpired, setProductHasExpired] = useState<{ products: { maLoHang: string, maThucPham: string, tenThucPham: string, soLuong: number, hanSuDung: string; }[], quantity: number; }>();
  const [productAlmostOutOfStock, setProductAlmostOutOfStock] = useState<{ products: { maThucPham: string, tenThucPham: string, soLuongTonKho: number, donViTinh: string; }[], quantity: number; }>();
  const [productOutOfStock, setProductOutOfStock] = useState<{ products: { maThucPham: string, tenThucPham: string, donViTinh: string; }[], quantity: number; }>();
  const [orderQuantityWaitingProcess, setOrderQuantityWaitingProcess] = useState<number>();
  const [revenueByMonth, setRevenueByMonth] = useState<{ doanhThu: number, thang: string; }[]>();
  const [orderQuantityByMonth, setOrderQuantityByMonth] = useState<{ soLuong: number, thang: string; }[]>();
  const [orderQuantityByStatus, setOrderQuantityByStatus] = useState<{ name: string, value: number; }[]>();

  useEffect(() => {
    fetchProfit();
    fetchProductIsAboutToExpire();
    fetchProductHasExpired();
    fetchProductAlmostOutOfStock();
    fetchProductOutOfStock();
    fetchOrderQuantityWaitingProcess();
    fetchRevenueByMonth();
    fetchOrderQuantityByMonth();
    fetchOrderQuantityByStatus();
  }, []);

  const fetchProfit = async () => {
    try {
      const response = await getProfit();
      setProfit(+response.doanhThu);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchProductIsAboutToExpire = async () => {
    try {
      const response = await getProductIsAboutToExpire();
      setProductIsAboutToExpire(response);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchProductHasExpired = async () => {
    try {
      const response = await getProductHasExpired();
      setProductHasExpired(response);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchProductAlmostOutOfStock = async () => {
    try {
      const response = await getProductAlmostOutOfStock();
      setProductAlmostOutOfStock(response);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchProductOutOfStock = async () => {
    try {
      const response = await getProductOutOfStock();
      setProductOutOfStock(response);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchOrderQuantityWaitingProcess = async () => {
    try {
      const response = await getOrderQuantityWaitingProcess();
      setOrderQuantityWaitingProcess(response.soLuong);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchRevenueByMonth = async () => {
    try {
      const response = await getRevenueByMonth();
      const data = Array.from({ length: 12 }).map((_, idx) => ({
        doanhThu: +(response.find((item: { doanhThu: string, thang: number; }) => item.thang === idx + 1)?.doanhThu as string ?? 0),
        thang: `Tháng ${idx + 1}`
      }));
      setRevenueByMonth(data);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchOrderQuantityByMonth = async () => {
    try {
      const response = await getOrderQuantityByMonth();
      const data = Array.from({ length: 12 }).map((_, idx) => ({
        soLuong: +(response.find((item: { soLuong: string, thang: number; }) => item.thang === idx + 1)?.soLuong as string ?? 0),
        thang: `Tháng ${idx + 1}`
      }));
      setOrderQuantityByMonth(data);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };

  const fetchOrderQuantityByStatus = async () => {
    try {
      const response = await getOrderQuantityByStatus();
      setOrderQuantityByStatus(response);
    } catch (error) {
      console.error('Error when fetch:', error);
    }
  };
  return (
    <div className="overview-component">
      <div className="statistic-row">
        <div className="statistic-item">
          <span className="title">Tổng lợi nhuận (năm {new Date().getFullYear()})</span>
          <span className="value" style={{ fontSize: '28px', color: profit! > 0 ? webColors.adminPrimary : 'red' }}>{`${profit && formatNumberVN(+profit)} VND`}</span>
        </div>
        <div className="statistic-item">
          <span className="title">Sắp hết hạn</span>
          <span className="value" style={{ fontSize: '48px', color: '#f76f00' }}>{productIsAboutToExpire?.quantity}</span>
          <span className="unit">thực phẩm</span>
        </div>
        <div className="statistic-item">
          <span className="title">Đã hết hạn</span>
          <span className="value" style={{ fontSize: '48px', color: 'red' }}>{productHasExpired?.quantity}</span>
          <span className="unit">thực phẩm</span>
        </div>
        <div className="statistic-item">
          <span className="title">Sắp hết hàng</span>
          <span className="value" style={{ fontSize: '48px', color: '#ffc100' }}>{productAlmostOutOfStock?.quantity}</span>
          <span className="unit">thực phẩm</span>
        </div>
        <div className="statistic-item">
          <span className="title">Đã hết hàng</span>
          <span className="value" style={{ fontSize: '48px', color: 'red' }}>{productOutOfStock?.quantity}</span>
          <span className="unit">thực phẩm</span>
        </div>
        <div className="statistic-item">
          <span className="title">Đang chờ xử lý</span>
          <span className="value" style={{ fontSize: '48px', color: '#00C49F' }}>{orderQuantityWaitingProcess}</span>
          <span className="unit">đơn hàng</span>
        </div>
      </div>
      <div className="chart-row">
        <div className="col col-4">
          <span className="chart-title">Biểu đồ doanh thu theo tháng trong năm {new Date().getFullYear()}</span>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={revenueByMonth}
              margin={{
                top: 70,
                right: 50,
                left: 50,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="thang" fontSize={13} padding={{ left: 50 }} />
              <YAxis
                tickFormatter={(value) => `${formatNumberVN(value)} VND`}
                fontSize={13}
              >
                <Label
                  value="Doanh thu (triệu VND)"
                  angle={-90}
                  position="insideLeft"
                  dx={-10}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip formatter={(value) => [`${formatNumberVN(+value)} VND`, 'Doanh thu']} />
              <Line type="monotone" dataKey="doanhThu" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col col-2">
          <span className="chart-title">Biểu đồ tỉ lệ hủy đơn trong năm {new Date().getFullYear()}</span>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400} margin={{ bottom: 30 }}>
              <Pie
                data={orderQuantityByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {orderQuantityByStatus?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Legend />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart-row">
        <div className="col col-6">
          <span className="chart-title">Biểu đồ số lượng đơn hàng theo tháng trong năm {new Date().getFullYear()}</span>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={orderQuantityByMonth}
              margin={{
                top: 70,
                right: 50,
                left: 50,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="thang" />
              <YAxis>
                <Label
                  value="Số lượng (đơn hàng)"
                  angle={-90}
                  position="insideLeft"
                  dx={-10}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip formatter={(value) => [`${value} đơn hàng`, 'Số lượng']} />
              <Bar dataKey="soLuong" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
