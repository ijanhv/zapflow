"use client"
import React, { useState } from 'react'
import { Input } from '../common/input';
import { PrimaryButton } from '../buttons/primary-button';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/config';
import axios from "axios"

const SignUpForm = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
            <Input
              label={"Name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            ></Input>
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
              <PrimaryButton
                onClick={async () => {
                   await axios.post(
                    `${BACKEND_URL}/api/v1/user/signup`,
                    {
                      username: email,
                      password,
                      name,
                    }
                  );
                  router.push("/login");
                }}
                size="big"
              >
                Get started free
              </PrimaryButton>
            </div>
          </div>
  )
}

export default SignUpForm