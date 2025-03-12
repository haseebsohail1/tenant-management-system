// app/dashboard/page.tsx  (or pages/dashboard.tsx if using the pages directory)
"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";

function Dashboard() {
  return (
    <Wrapper active={"dashboard"}>
      <h1>Dashboard Content</h1>
    </Wrapper>
  );
}

export default Dashboard;
