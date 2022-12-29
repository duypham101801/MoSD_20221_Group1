import React from "react";
import { Route, Routes } from "react-router-dom";

const Area = React.lazy(() => import("../view/area/Area"));
const AreaDetails = React.lazy(() => import("../view/area/AreaDetails"));

function AreaRoutes() {
  return (
    <Routes>
      <Route path="/area" element={<Area />} />
      <Route path="/area/:areaId" element={<AreaDetails />} />
    </Routes>
  );
}

export default AreaRoutes;
