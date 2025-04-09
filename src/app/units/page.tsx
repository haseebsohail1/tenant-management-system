"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import UnitsList from "@/Screens/UnitsList";

function Units() {
  return (
    <Wrapper active={"units"}>
      <UnitsList />
    </Wrapper>
  );
}

export default Units;
