import React, { useEffect,Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { Header } from "./container";
import { HomeRoutes } from "./routes";
const Home = React.lazy(() => import("./view/home/Home"));
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading ...</div>}>
        <HomeRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
