import { useSelector } from "react-redux";
import { selectBrands } from "../../redux/filters/selectors.js";
import { nanoid } from "nanoid";

export const Filters = () => {
  const brands = useSelector(selectBrands);
  console.log("brands", brands);
  return (
    <form>
      <select placeholder="Choose a brand">
        {brands.map((brand) => {
          return (
            <option key={nanoid()} value={brand}>
              {brand}
            </option>
          );
        })}
      </select>

      <select>
        <option value="">Choose a price</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
      </select>

      <input type="number" placeholder="From" />
      <input type="number" placeholder="To" />

      <button type="button">Search</button>
    </form>
  );
};
