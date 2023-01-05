import React from "react";
import { Route, Routes } from "react-router-dom";

const Area = React.lazy(() => import("../view/area/Area"));


function AreaRoutes() {
  return (
    <Routes>
      <Route path="/area" element={<Area />} />
     
    </Routes>
  );
}

export default AreaRoutes;
