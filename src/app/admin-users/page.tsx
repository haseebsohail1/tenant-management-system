"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import AdminUsersList from "@/Screens/AdminUsersList";

function Properties() {
  return (
    <Wrapper active={"users"}>
      <AdminUsersList />
    </Wrapper>
  );
}

export default Properties;
