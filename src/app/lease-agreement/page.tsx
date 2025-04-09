"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import LeaseAgreementList from "@/Screens/LeaseAgreement";

function LeaseAgreement() {
  return (
    <Wrapper active={"lease-agreement"}>
      <LeaseAgreementList />
    </Wrapper>
  );
}

export default LeaseAgreement;
