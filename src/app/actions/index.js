"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false // or any page after login
    });

    return response;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
}
