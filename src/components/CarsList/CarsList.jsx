import { useDispatch, useSelector } from "react-redux";
import { selectCars } from "../../redux/cars/selectors.js";
import { CarItem } from "../CarItem/CarItem.jsx";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations.js";

export const CarsList = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  console.log("data", data);

  return (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.id}>
            <CarItem data={item} />
          </li>
        );
      })}
    </ul>
  );
};
