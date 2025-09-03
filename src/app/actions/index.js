// src/app/actions/index.js


"use client"; // important

import { signIn } from "next-auth/react";

export async function credentialLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await signIn("credentials", {
    redirect: false,  // prevent NextAuth from auto-redirecting
    email,
    password,
  });

  return response;
}
