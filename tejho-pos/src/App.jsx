import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import POS from "./pages/POS";
import Transactions from "./pages/Transactions";
import Products from "./pages/Products";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<POS />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;