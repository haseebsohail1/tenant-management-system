"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProfileComponent from "@/Screens/Profile";

function Profile() {
  return (
    <Wrapper active={"profile"}>
      <ProfileComponent />
    </Wrapper>
  );
}

export default Profile;
