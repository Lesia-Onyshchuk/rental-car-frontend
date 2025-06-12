import { useDispatch, useSelector } from "react-redux";
import { selectCars } from "../../redux/cars/selectors.js";
import { CarItem } from "../CarItem/CarItem.jsx";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations.js";
import css from "./CarsList.module.css";

export const CarsList = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  console.log("data", data);

  return (
    <div className={css.listBox}>
      <ul className={css.list}>
        {data.map((item) => {
          return (
            <li key={item.id} className={css.liItem}>
              <CarItem data={item} />
            </li>
          );
        })}
      </ul>
      <button type="button" className={css.loadMore}>
        Load more
      </button>
    </div>
  );
};
