import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GetCardsList } from "../ApiComponent";
import Usercharts from "../Usercharts";

interface CardProps {}

interface AnalyticsData {
  totalUsers: number;
  landLords: number;
  tenants: number;
  managers: number;
}

const Card: React.FC<CardProps> = ({}) => {
  const { data: session, status } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.token) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await GetCardsList(session.token);
          setAnalyticsData(response.data.result);
        } catch (err: any) {
          console.error("Error fetching analytics data:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [status, session]);

  useEffect(() => {
    const generateBarHeights = () => {
      const heights = Array.from({ length: 30 }, () => Math.random() * 100);
      setBarHeights(heights);
    };

    generateBarHeights();
  }, []);

  const totalusers = analyticsData?.totalUsers || 0;
  const totallandLords = analyticsData?.landLords || 0;
  const totaltenants = analyticsData?.tenants || 0;
  const totalmanagers = analyticsData?.managers || 0;

  interface MetricCardProps {
    title: string;
    value: number;
    percentageChange: number;
  }

  const PercentageChange = ({ value }: { value: number }) => {
    const isPositive = value >= 0;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";
    const arrow = isPositive ? "▲" : "▼";
    const sign = isPositive ? "+" : "";

    return (
      <span className={colorClass}>
        {arrow} {sign}
        {Math.abs(value)}%
      </span>
    );
  };

  const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    percentageChange,
  }) => {
    return (
      <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
        <h3 className="text-sm font-semibold text-gray-400">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs mt-1">
          <PercentageChange value={percentageChange} /> vs last month
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <MetricCard
          title="Total Users"
          value={totalusers}
          percentageChange={5}
        />
        <MetricCard
          title="Total LandLoards"
          value={totallandLords}
          percentageChange={12}
        />
        <MetricCard
          title="Total Tenants"
          value={totaltenants}
          percentageChange={-3}
        />
        <MetricCard
          title="Total Mangers"
          value={totalmanagers}
          percentageChange={7}
        />
      </div>

      <Usercharts
        totallandLords={totallandLords}
        totaltenants={totaltenants}
        totalmanagers={totalmanagers}
        totalusers={totalusers}
        barHeights={barHeights}
      />
    </div>
  );
};

export default Card;
