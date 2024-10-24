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
        setUser({ username: data.username, firstName: data.firstName, lastName: data.lastName });
      } else {
        setUser({ username: "", firstName: "", lastName: "" });
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
  } catch (error: unknown) {
    console.error("Error during login:", (error as Error).message);
    return { username: "", firstName: "", lastName: "" };
  }
};

export async function logoutUser() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Logout failed!");
      return false;
    }

    return true;
  } catch (error: unknown) {
    console.error("Error during logout:", (error as Error).message);
    return false;
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
  } catch (error: unknown) {
    console.error("Error during signup:", (error as Error).message);
    return { username: "", firstName: "", lastName: "" };
  }
};
