"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import SettingsComponent from "@/Screens/Settings";

function Settings() {
  return (
    <Wrapper active={"settings"}>
      <SettingsComponent />
    </Wrapper>
  );
}

export default Settings;
