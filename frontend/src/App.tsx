// eslint-disable-next-line import/namespace
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { JSX } from "react";
import RootLayout from "./pages/Root.tsx";
import LoginPage from "./pages/Login.tsx";
import HomePage from "./pages/Home.tsx";
import RegisterPage from "./pages/Register.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProfilePage from "./pages/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
    errorElement: <ErrorPage />
  }
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
