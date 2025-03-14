import React from "react";

interface ActiveUsersCardProps {
  totalusers: number;
  totalmanagers: number;
  totaltenants: number;
  totallandLords: number;
  barHeights: any;
}

const ActiveUsersCard: React.FC<ActiveUsersCardProps> = ({
  totalmanagers,
  totaltenants,
  totallandLords,
  totalusers,
  barHeights,
}) => {
  const userRoles = [
    {
      label: "Landlords",
      count: totallandLords,
      color: "white",
    },
    {
      label: "Tenants",
      count: totaltenants,
      color: "#4457E8",
    },
    {
      label: "Managers",
      count: totalmanagers,
      color: "#6676f6",
    },
  ];

  const totalRoles = userRoles.reduce((acc, role) => acc + role.count, 0);

  const calculatePercentage = (count: number): number => {
    return totalRoles === 0 ? 0 : (count / totalRoles) * 100;
  };

  const calculateBarHeight = (count: number): number => {
    if (totalusers === 0) return 0;
    const percentage = (count / totalusers) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* All Users Card */}
      <div className="bg-gray-800 flex flex-col justify-between rounded-md shadow-md p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            All Users
          </h2>
          <div className="flex items-center mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-2xl font-bold text-white">{totalusers}</span>
            <span className="text-sm text-gray-400 ml-2">Total Users</span>
          </div>
        </div>
        <div className="rounded-lg p-4 bg-gray-800">
          <div className="relative h-64 flex justify-center gap-10 items-end">
            <div className="absolute inset-0 flex justify-center items-end">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="mx-[5px] rounded-md bg-yellow-600"
                  style={{
                    width: "calc(100% / 20 - 5px)",
                    height: `${barHeights[i] || 0}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Users By Role Card */}
      <div className="bg-gray-800 rounded-md shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Users By Role
        </h2>

        {/* Donut Chart */}
        <div className="relative w-full h-[250px] flex items-center justify-center">
          {totalRoles === 0 ? (
            <span className="text-gray-400 text-sm">Loading</span>
          ) : (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 42 42"
              className="mx-auto"
            >
              <circle
                className="ring-base"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#1E293B"
                strokeWidth="4"
              />

              {userRoles.map((role, index) => {
                const previousPercentages = userRoles
                  .slice(0, index)
                  .reduce(
                    (acc, prevRole) =>
                      acc + calculatePercentage(prevRole.count),
                    0
                  );

                return (
                  <circle
                    key={role.label}
                    className="ring"
                    cx="21"
                    cy="21"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke={role.color}
                    strokeWidth="4"
                    strokeDasharray={`${calculatePercentage(role.count)} ${
                      100 - calculatePercentage(role.count)
                    }`}
                    strokeDashoffset={`${0 - previousPercentages}`}
                    transform="rotate(-90) translate(-42,0)"
                  />
                );
              })}
            </svg>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-4 mt-4">
          {userRoles.map((role) => (
            <div className="flex items-center" key={role.label}>
              <div
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: role.color }}
              ></div>
              <span className="text-xs text-gray-400">{role.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersCard;
