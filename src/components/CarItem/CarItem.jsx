import { Link } from "react-router-dom";
import css from "./CarItem.module.css";
import heart from "../../assets/heart.svg";
import heartBlue from "../../assets/heart-blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCars } from "../../redux/selected/selectors.js";
import { removeSelected, setSelected } from "../../redux/selected/slice.js";

export const CarItem = ({ data }) => {
  const dispatch = useDispatch();
  const selectedCars = useSelector(selectSelectedCars) || [];

  const isSelected = selectedCars.some((item) => item.id === data.id);

  const handleSelected = () => {
    if (isSelected) {
      dispatch(removeSelected(data.id));
    } else {
      dispatch(setSelected(data));
    }
  };

  return (
    <div className={css.boxItem}>
      <button type="button" className={css.selected} onClick={handleSelected}>
        {isSelected ? (
          <img src={heartBlue} alt="select" className={css.selectIcon} />
        ) : (
          <img src={heart} alt="select" className={css.selectIcon} />
        )}
      </button>
      <img src={data.img} alt={data.description} className={css.carImg} />
      <div className={css.boxTitle}>
        <h2 className={css.carTitle}>
          {data.brand} <span className={css.titleSpan}>{data.model}</span>,{" "}
          {data.year}
        </h2>
        <p className={css.price}>${data.rentalPrice}</p>
      </div>
      <ul className={css.carDescr}>
        <li className={css.carLi}>{data.address.split(",")[1]}</li>
        <li className={css.carLi}>{data.address.split(",")[2]}</li>
        <li className={css.carLi}>{data.rentalCompany}</li>
      </ul>
      <ul className={css.carDescr}>
        <li className={css.carLiSec}>{data.type}</li>
        <li className={css.carLiSec}>
          {new Intl.NumberFormat("uk-UA").format(data.mileage)} km
        </li>
      </ul>
      <Link to={`/catalog/${data.id}`} className={css.readMore}>
        Read more
      </Link>
    </div>
  );
};
