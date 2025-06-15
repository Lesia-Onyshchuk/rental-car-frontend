import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../../redux/filters/selectors.js";
import { useEffect, useId, useState } from "react";
import { fetchBrands } from "../../redux/filters/operations.js";
import { fetchCars } from "../../redux/cars/operations.js";
import { selectCars } from "../../redux/cars/selectors.js";
import { setFilters } from "../../redux/filters/slice.js";
import { clearCars } from "../../redux/cars/slice.js";
import css from "./Filters.module.css";
import { CustomSelect } from "./CustomSelect/CustomSelect.jsx";

export const Filters = () => {
  const [rentFilters, setRentFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const brands = useSelector(selectBrands);
  const cars = useSelector(selectCars);
  const dispatch = useDispatch();
  const brandId = useId();
  const priceId = useId();
  const mileageId = useId();
  const minId = useId();
  const maxId = useId();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const fromChange = (e) => {
    const raw = parseNumber(e.target.value);
    if (/^\d*$/.test(raw)) {
      setRentFilters((prev) => ({
        ...prev,
        minMileage: raw,
      }));
    }
  };

  const toChange = (e) => {
    const raw = parseNumber(e.target.value);
    if (/^\d*$/.test(raw)) {
      setRentFilters((prev) => ({
        ...prev,
        maxMileage: raw,
      }));
    }
  };

  const price = cars
    .map((car) => {
      return car.rentalPrice;
    })
    .filter((price, index, arr) => {
      return arr.indexOf(price) === index;
    })
    .toSorted((a, b) => a - b);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearCars());
    dispatch(setFilters(rentFilters));
    dispatch(fetchCars({ page: 1, filters: rentFilters }));
    setRentFilters({
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.box}>
        <label htmlFor={brandId} className={css.label}>
          Car brand
        </label>
        <CustomSelect
          options={brands}
          onSelect={(value) =>
            setRentFilters((prev) => ({ ...prev, brand: value }))
          }
          selected={rentFilters.brand}
          placeholder="Choose a brand"
          className={css.select}
          id={brandId}
        />
      </div>
      <div className={css.box}>
        <label htmlFor={priceId} className={css.label}>
          Price/ 1 hour
        </label>
        <CustomSelect
          options={price}
          onSelect={(value) =>
            setRentFilters((prev) => ({ ...prev, rentalPrice: value }))
          }
          selected={
            rentFilters.rentalPrice
              ? `To $${rentFilters.rentalPrice}`
              : rentFilters.rentalPrice
          }
          placeholder="Choose a price"
          className={css.select}
          id={priceId}
        />
      </div>
      <div className={css.box}>
        <label htmlFor={mileageId} className={css.label}>
          Car mileage / km
        </label>
        <div className={css.inputBox}>
          <label htmlFor={minId} className={css.inputLabel}>
            From
          </label>
          <input
            type="text"
            value={formatNumber(rentFilters.minMileage)}
            onChange={fromChange}
            className={css.inputMin}
            id={minId}
          />
          <label htmlFor={maxId} className={css.inputMaxLabel}>
            To
          </label>
          <input
            type="text"
            value={formatNumber(rentFilters.maxMileage)}
            onChange={toChange}
            className={css.inputMax}
            id={maxId}
          />
        </div>
      </div>
      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
};
