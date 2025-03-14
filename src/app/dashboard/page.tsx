// app/dashboard/page.tsx  (or pages/dashboard.tsx if using the pages directory)
"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Dashboardcards from "@/components/Crads";
import CardComponent from "@/components/CradsList";

function Dashboard() {
  return (
    <Wrapper active={"dashboard"}>
      <CardComponent />
      <Dashboardcards />
    </Wrapper>
  );
}

export default Dashboard;
