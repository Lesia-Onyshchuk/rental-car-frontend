import { useDispatch, useSelector } from "react-redux";
import {
  selectCars,
  selectError,
  selectLoading,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors.js";
import { CarItem } from "../CarItem/CarItem.jsx";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations.js";
import css from "./CarsList.module.css";
import { nanoid } from "nanoid";
import { selectFilters } from "../../redux/filters/selectors.js";
import { resetFilters } from "../../redux/filters/slice.js";
import { clearCars } from "../../redux/cars/slice.js";

export const CarsList = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const data = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const hasNextPage = totalPages > page ? true : false;
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(clearCars());
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = (nextPage) => {
    dispatch(resetFilters());
    dispatch(fetchCars({ page: nextPage, filters }));
  };

  if (error) {
    return (
      <p className={css.errorCars}>Something went wrong. Try again later.</p>
    );
  }

  return (
    <div className={css.listBox}>
      {data.length ? (
        <ul className={css.list}>
          {data.map((item) => {
            return (
              <li key={nanoid()} className={css.liItem}>
                <CarItem data={item} />
              </li>
            );
          })}
        </ul>
      ) : (
        !loading && (
          <p className={css.noCars}>
            No cars are found for your request. Please change the filters and
            try again.
          </p>
        )
      )}
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
