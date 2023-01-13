import React from "react";
import { Route, Routes } from "react-router-dom";

const House = React.lazy(() => import("../view/house/House"));

function HouseRoutes() {
  return (
    <Routes>
      <Route path="/area/:areaId/:houseId" element={<House />} />
    </Routes>
  );
}

export default HouseRoutes;
