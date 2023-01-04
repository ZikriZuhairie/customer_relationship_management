import OverviewChart from "components/OverviewChart";
import { Card } from "primereact/card";
import { useGetDashboardQuery } from "state/api";
import "./dashboard.css";

const Dashboard = () => {
  const { data } = useGetDashboardQuery();
  return (
    <div className="box_dashboard">
      <div className="card_container">
        <Card title={data && data.totalCustomers} subTitle="Total Customer"/>
        <Card title={data && data.dailySales} subTitle="Today Sales"/>
        <Card title={data && data.monthlySales} subTitle="Monthly Sales"/>
        <Card title={data && data.yearlySalesTotal} subTitle="Yearly Sales"/>
      </div>
      <div className="chart_container">
          <OverviewChart view="sales"/>
      </div>
    </div>
  );
};

export default Dashboard;
