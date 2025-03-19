"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import PropertiesList from "@/Screens/PropertiesList";

function Properties() {
  return (
    <Wrapper active={"properties"}>
      <PropertiesList />
    </Wrapper>
  );
}

export default Properties;
