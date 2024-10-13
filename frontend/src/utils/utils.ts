import { Dispatch, SetStateAction } from "react";
import { ErrorsI, UserI } from "../intefaces/interfaces.ts";

export async function getCookies(setUser: Dispatch<SetStateAction<UserI>>): Promise<void> {
  fetch("/api/auth/check-auth", {
    method: "GET",
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      if (data.isAuthenticated) {
        console.log("cookies are valid");
        setUser({ username: data.username });
      } else {
        console.log("cookies are invalid");
      }
    });
}

export async function loginUser(login: { [key: string]: FormDataEntryValue }, setErrors: Dispatch<SetStateAction<ErrorsI>>): Promise<UserI> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
      credentials: "include"
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors);
      throw new Error("Login failed!");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error during login:", error.message);
    return { username: "" };
  }
};

export async function signupUser(signup: { [key: string]: FormDataEntryValue }, setErrors: Dispatch<SetStateAction<ErrorsI>>): Promise<UserI> {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup),
      credentials: "include"
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors);
      throw new Error("Signup failed!");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    return { username: "" };
  }
};
