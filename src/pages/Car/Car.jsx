import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import { selectCurrentCar } from "../../redux/cars/selectors";
import { useParams } from "react-router-dom";
// import { Loader } from "../../components/Loader/Loader.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./Car.module.css";

export const Car = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const initialValues = { name: "", email: "", date: "", comment: "" };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  const car = useSelector(selectCurrentCar);

  console.log("car", car);

  const BookingSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    date: Yup.date(),
    comment: Yup.string().min(3, "Too short").max(256, "Too long"),
  });

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  return (
    <div className={css.carBox}>
      <div className={css.firstBox}>
        <img src={car.img} alt={car.description} className={css.img} />
        <div className={css.formBox}>
          <h3 className={css.formTitle}>Book your car now</h3>
          <p className={css.formText}>
            Stay connected! We are always ready to help you.
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={BookingSchema}
          >
            <Form className={css.form}>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={css.field}
              ></Field>
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={css.field}
              ></Field>
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
              <Field
                type="date"
                name="date"
                placeholder="Booking date"
                className={css.field}
              ></Field>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={css.field}
              ></Field>
              <button type="submit" className={css.save}>
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className={css.secondBox}>
        <div className={css.titleBox}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <p className={css.carId}>
            id: {parseInt(car.img.split("/")[car.img.split("/").length - 1])}
          </p>
        </div>
        <div className={css.address}>
          <p>
            {car.address.split(",")[1]}, {car.address.split(",")[2]}
          </p>
          <p>Mileage: {Math.round(Number(car.mileage) * 1.60934)} km</p>
        </div>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.info}>
          The Buick Enclave is a stylish and spacious SUV known for its
          comfortable ride and luxurious features.
        </p>
        <div className={css.carDescrBox}>
          <h3 className={css.carDescrTitle}>Rental Conditions:</h3>
          <ul className={css.carDescrList}>
            {car.rentalConditions.map((item) => {
              return <li key={nanoid()}>{item}</li>;
            })}
          </ul>
        </div>
        <div className={css.carDescrBox}>
          <h3 className={css.carDescrTitle}>Car Specifications:</h3>
          <ul className={css.carDescrList}>
            <li>Year: {car.year}</li>
            <li>Type: {car.type}</li>
            <li>Fuel Consumption: {car.fuelConsumption}</li>
            <li>Engine Size: {car.engineSize}</li>
          </ul>
        </div>
        <div className={css.carDescrBox}>
          <h3 className={css.carDescrTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={css.carDescrList}>
            {[...car.accessories, ...car.functionalities].map((item) => {
              return <li key={nanoid()}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
