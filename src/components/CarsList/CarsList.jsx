import { useSelector } from "react-redux";
import { selectCars } from "../../redux/cars/selectors.js";
import { CarItem } from "../CarItem/CarItem.jsx";

export const CarsList = () => {
  const data = useSelector(selectCars);
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
