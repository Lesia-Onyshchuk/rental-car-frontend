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
import { selectFilters } from "../../redux/filters/selectors.js";
// import { Loader } from "../Loader/Loader.jsx";
// import { selectFilteredCars } from "../../redux/filters/selectors.js";

export const CarsList = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  // const loading = useSelector(selectLoading);
  const hasNextPage = totalPages > page ? true : false;
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = (nextPage) => {
    dispatch(fetchCars({ page: nextPage, filters }));
  };

  return (
    <div className={css.listBox}>
      {/* {loading && <Loader />} */}
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
        <p>
          No cars are found for your request. Please change the filters and try
          again.
        </p>
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
