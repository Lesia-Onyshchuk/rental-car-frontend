import { CarsList } from "../../components/CarsList/CarsList.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";

export const Catalog = () => {
  return (
    <div>
      <Filters />
      <CarsList />
    </div>
  );
};
