import React from "react";
import { Route, Routes } from "react-router-dom";

const Chat = React.lazy(() => import("../view/chat/Chat"));
const Loading = React.lazy(() => import("../view/chat/Loading"));
function ChatRoutes() {
  return (
    <Routes>
      <Route path="/chat" element={<Loading />} />
      <Route path="/chat/:roomId/:userId" element={<Chat />} />
    </Routes>
  );
}

export default ChatRoutes;
