// eslint-disable-next-line import/namespace
import { Outlet } from "react-router-dom";
import { JSX } from "react";
import UserContextProvider from "../UserContextProvider.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function RootLayout(): JSX.Element {
  return (
    <UserContextProvider>
      <div className="flex flex-col justify-between h-screen bg-slate-150">
        <Header />
        <main className="h-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default RootLayout;
