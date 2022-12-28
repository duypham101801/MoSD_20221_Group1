import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("../view/home/Home"));

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default HomeRoutes;
