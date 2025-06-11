import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";
import logo from "../../assets/logo.png";

const activeClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export const Header = () => {
  return (
    <div className={css.header}>
      <NavLink to="/">
        <img src={logo} alt="Logo RentalCar" className={css.logo} />
      </NavLink>
      <nav className={css.nav}>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={activeClass}>
          Catalog
        </NavLink>
      </nav>
    </div>
  );
};
