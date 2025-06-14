import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../../redux/filters/selectors.js";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { fetchBrands } from "../../redux/filters/operations.js";
import { fetchCars } from "../../redux/cars/operations.js";
import { selectCars } from "../../redux/cars/selectors.js";
import { setFilters } from "../../redux/filters/slice.js";
import { clearCars } from "../../redux/cars/slice.js";
import css from "./Filters.module.css";

export const Filters = () => {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [rentFilters, setRentFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const brands = useSelector(selectBrands);
  const cars = useSelector(selectCars);
  // const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCars());
  // }, [dispatch]);

  // const handleSelectedPrice = (event) => {
  //   dispatch(setPrice(event.target.value));
  //   setSelectedPrice(event.target.value);
  // };

  const brandChange = (event) => {
    setRentFilters((prev) => ({ ...prev, brand: event.target?.value }));
  };

  const priceChange = (event) => {
    setRentFilters((prev) => ({ ...prev, rentalPrice: event.target?.value }));
    setSelectedPrice(event.target.value);
  };

  const fromChange = (event) => {
    setRentFilters((prev) => ({ ...prev, minMileage: event.target?.value }));
  };

  const toChange = (event) => {
    setRentFilters((prev) => ({ ...prev, maxMileage: event.target?.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearCars());
    dispatch(setFilters(rentFilters));
    dispatch(fetchCars({ page: 1, filters: rentFilters }));
    // setRentFilters({
    //   brand: "",
    //   rentalPrice: "",
    //   minMileage: "",
    //   maxMileage: "",
    // });
    // setSelectedPrice(0);
  };

  const price = cars
    .map((car) => {
      return car.rentalPrice;
    })
    .filter((price, index, arr) => {
      return arr.indexOf(price) === index;
    })
    .toSorted((a, b) => a - b);

  console.log("price", price);
  console.log("brands", brands);

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <select
        value={rentFilters.brand}
        onChange={brandChange}
        className={css.select}
      >
        <option value="" disabled hidden>
          Choose a brand
        </option>
        {brands.map((brand) => {
          return (
            <option key={nanoid()} value={brand}>
              {brand}
            </option>
          );
        })}
      </select>

      <select
        value={selectedPrice}
        onChange={priceChange}
        className={css.select}
      >
        {selectedPrice ? (
          <option value={selectedPrice}>To ${selectedPrice}</option>
        ) : (
          <option value="" hidden>
            Choose a price
          </option>
        )}
        {price.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      <input
        type="string"
        placeholder="From"
        value={rentFilters.minMileage}
        onChange={fromChange}
        className={css.inputMin}
      />
      <input
        type="string"
        placeholder="To"
        value={rentFilters.maxMileage}
        onChange={toChange}
        className={css.inputMax}
      />

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
};
