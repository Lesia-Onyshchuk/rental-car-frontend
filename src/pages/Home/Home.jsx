import { Link } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.home}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link to="/catalog" className={css.link}>
        View Catalog
      </Link>
    </div>
  );
};

export default Home;
