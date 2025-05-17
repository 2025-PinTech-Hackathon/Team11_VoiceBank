import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Money from "./assets/pages/Money";
import Benefit from "./assets/pages/Benefit";
import Pay from "./assets/pages/Pay";
import Charge from "./assets/pages/Charge";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/money" element={<Money />} />
        <Route path="/benefit" element={<Benefit />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/charge" element={<Charge />} />
      </Routes>
    </BrowserRouter>
  );
}
