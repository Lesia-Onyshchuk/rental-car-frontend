import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import "./App.css";
import { lazy, Suspense } from "react";
import Layout from "./Layout.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog.jsx"));
const Car = lazy(() => import("./pages/Car/Car.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

const App = () => {
  return (
    <div className="appBox">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<Car />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
