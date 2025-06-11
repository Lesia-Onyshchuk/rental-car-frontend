import { NavLink, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Header } from "./components/Header/Header.jsx";

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/catalog" element={<Catalog />} /> */}
        {/* <Route path="/catalog/:id" element={<CarItem />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
