"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import TenantList from "@/Screens/TenantList";

function Tenants() {
  return (
    <Wrapper active={"tenants"}>
      <TenantList />
    </Wrapper>
  );
}

export default Tenants;
