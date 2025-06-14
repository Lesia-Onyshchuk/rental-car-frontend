import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Catalog } from "./pages/Catalog/Catalog.jsx";
import { Loader } from "./components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import { selectLoading } from "./redux/cars/selectors.js";
import { Car } from "./pages/Car/Car.jsx";

export const App = () => {
  const loading = useSelector(selectLoading);
  return (
    <div>
      {loading && <Loader />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Car />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
