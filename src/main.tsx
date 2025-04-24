import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import TestPage from "./features/Test/Page.tsx";
import RegisterPage from "./features/auth/pages/RegisterPage.tsx";
import ProductPage from "./features/product/pages/ProductPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
