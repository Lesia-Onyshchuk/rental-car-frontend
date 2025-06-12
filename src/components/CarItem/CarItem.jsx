import { Link } from "react-router-dom";
import css from "./CarItem.module.css";
// import { RiHeartLine } from "react-icons/ri";
// import like from "../../assets/like.svg";
import heart from "../../assets/heart.svg";

export const CarItem = ({ data }) => {
  return (
    <div className={css.boxItem}>
      <button type="button" className={css.selected}>
        {/* <svg
          className={css.selectIcon}
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.9999 2.74805L7.2829 2.01105C5.5999 0.281049 2.5139 0.878049 1.39989 3.05305C0.876895 4.07605 0.758895 5.55305 1.71389 7.43805C2.63389 9.25305 4.5479 11.427 7.9999 13.795C11.4519 11.427 13.3649 9.25305 14.2859 7.43805C15.2409 5.55205 15.1239 4.07605 14.5999 3.05305C13.4859 0.878049 10.3999 0.280049 8.7169 2.01005L7.9999 2.74805ZM7.9999 15C-7.33311 4.86805 3.27889 -3.03995 7.82389 1.14305C7.88389 1.19838 7.94256 1.25538 7.9999 1.31405C8.05623 1.25501 8.11494 1.1983 8.17589 1.14405C12.7199 -3.04195 23.3329 4.86705 7.9999 15Z"
            fill="#F2F4F7"
          />
        </svg> */}
        <svg className={css.selectIcon}>
          <use href={heart}></use>
        </svg>
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
        <li className={css.carLi}>{data.type}</li>
        <li className={css.carLi}>
          {Math.round(Number(data.mileage) * 1.60934)} km
        </li>
      </ul>
      <Link to={`/catalog/${data.id}`} className={css.readMore}>
        Read more
      </Link>
    </div>
  );
};
