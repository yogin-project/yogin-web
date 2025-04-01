"use client";

import { profileAtom } from "@/app/store/profileAtom";
import { useAtomValue } from "jotai";
import React from "react";

function MemberInfo() {
  const profile = useAtomValue(profileAtom);

  console.log("profile: ", profile);

  return <div>MemberInfo</div>;
}

export default MemberInfo;
