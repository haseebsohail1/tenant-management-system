"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import PropertyList from "@/Screens/PropertyList";

function Properties() {
  return (
    <Wrapper active={"properties"}>
      <PropertyList />
    </Wrapper>
  );
}

export default Properties;
