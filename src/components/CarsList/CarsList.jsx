import { useDispatch, useSelector } from "react-redux";
import {
  selectCars,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors.js";
import { CarItem } from "../CarItem/CarItem.jsx";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations.js";
import css from "./CarsList.module.css";
import { nanoid } from "nanoid";
// import { selectFilteredCars } from "../../redux/filters/selectors.js";

export const CarsList = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const hasNextPage = totalPages > page ? true : false;

  useEffect(() => {
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = (nextPage) => {
    dispatch(fetchCars({ page: nextPage }));
  };

  return (
    <div className={css.listBox}>
      <ul className={css.list}>
        {data.map((item) => {
          return (
            <li key={nanoid()} className={css.liItem}>
              <CarItem data={item} />
            </li>
          );
        })}
      </ul>
      {hasNextPage && (
        <button
          type="button"
          onClick={() => handleLoadMore(page + 1)}
          className={css.loadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
};
