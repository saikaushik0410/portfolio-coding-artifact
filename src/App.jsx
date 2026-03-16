import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artifact from "./pages/Artifact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artifact" element={<Artifact />} />
      </Routes>
    </BrowserRouter>
  );
}
