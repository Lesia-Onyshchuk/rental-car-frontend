import { CarsList } from "../../components/CarsList/CarsList.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";
import css from "./Catalog.module.css";

const Catalog = () => {
  return (
    <div className={css.container}>
      <Filters />
      <CarsList />
    </div>
  );
};

export default Catalog;
