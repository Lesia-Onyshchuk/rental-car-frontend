import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import { selectCurrentCar } from "../../redux/cars/selectors";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Field, Form, Formik } from "formik";

export const Car = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const car = useSelector(selectCurrentCar);

  console.log("car", car);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <p>Loading...</p>;

  //   const carArr = car.img.split("/");
  //   const lastElem = carArr.length - 1;
  //   const nameImg = carArr[lastElem];
  //   const carId = parseInt(nameImg);

  //   const elem = parseInt(car.img.split("/")[car.img.split("/").length - 1]);

  return (
    <div>
      <img src={car.img} />
      <div>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <Formik>
          <Form>
            <Field></Field>
            <Field></Field>
            <Field></Field>
            <Field></Field>
            <button type="submit">Send</button>
          </Form>
        </Formik>
      </div>
      <div>
        <h2>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p>id: {parseInt(car.img.split("/")[car.img.split("/").length - 1])}</p>
      </div>
    </div>
  );
};
