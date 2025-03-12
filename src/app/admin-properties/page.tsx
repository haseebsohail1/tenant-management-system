"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import AdminPropertiesList from "@/Screens/AdminPropertiesList";

function Properties() {
  return (
    <Wrapper active={"properties"}>
      <AdminPropertiesList />
    </Wrapper>
  );
}

export default Properties;
