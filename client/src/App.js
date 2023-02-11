import React, { useEffect,Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { Header } from "./container";
import { HomeRoutes, AreaRoutes, ChatRoutes, HouseRoutes } from "./routes";




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading ...</div>}>
        <HomeRoutes />
        <AreaRoutes />
        <HouseRoutes />
        <ChatRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
