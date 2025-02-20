"use client";

import { useState } from "react";
import { useSignUpMutation } from "../hooks/useSignUp";

export default function SignUpForm() {
  const { mutate, isPending } = useSignUpMutation();
  const [formData, setFormData] = useState({
    type: "MANAGER",
    email: "",
    password: "",
    phoneNumber: "",
    isAllowedST: "1",
    isAllowedPT: "1",
    name: "",
    branchName: "",
    region: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ body: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="전화번호"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="branchName"
        placeholder="지점명"
        value={formData.branchName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="region"
        placeholder="지역"
        value={formData.region}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
