import { CarsList } from "../../components/CarsList/CarsList.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";
import css from "./Catalog.module.css";

export const Catalog = () => {
  return (
    <div className={css.container}>
      <Filters />
      <CarsList />
    </div>
  );
};
