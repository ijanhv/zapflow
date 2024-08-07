"use client";
import React, { useState } from "react";
import { PrimaryButton } from "../buttons/primary-button";

import { Input } from "../common/input";

import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password).then(res => {
      if(res.success) router.push("/dashboard")
    })
  };
  return (
    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        label={"Email"}
        type="text"
        placeholder="Your Email"
      ></Input>
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label={"Password"}
        type="password"
        placeholder="Password"
      ></Input>
      <div className="pt-4">
        <PrimaryButton onClick={handleLogin} size="big">
          Login
        </PrimaryButton>
      </div>
    </div>
  );
};

export default LoginForm;
