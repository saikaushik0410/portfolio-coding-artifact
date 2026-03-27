import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artifact from "./pages/Artifact";
import Artifact2 from "./pages/Artifact2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artifact" element={<Artifact />} />
        <Route path="/artifact2" element={<Artifact2 />} />
      </Routes>
    </BrowserRouter>
  );
}
