import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import { selectCurrentCar } from "../../redux/cars/selectors";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

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

  if (!car) return <Loader />;

  return (
    <div>
      <img src={car.img} />
      <div>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={BookingSchema}
        >
          <Form>
            <Field type="text" name="name" placeholder="Name*"></Field>
            <ErrorMessage name="name" component="span" />
            <Field type="email" name="email" placeholder="Email*"></Field>
            <ErrorMessage name="email" component="span" />
            <Field type="date" name="date" placeholder="Booking date"></Field>
            <Field as="textarea" name="comment" placeholder="Comment"></Field>
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
      <div>
        <p>
          {car.address.split(",")[1]}, {car.address.split(",")[2]}
        </p>
        <p>Mileage: {Math.round(Number(car.mileage) * 1.60934)} km</p>
      </div>
      <p>${car.rentalPrice}</p>
      <div>
        <h3>Rental Conditions:</h3>
        <ul>
          {car.rentalConditions.map((item) => {
            return <li key={nanoid()}>{item}</li>;
          })}
        </ul>
      </div>
      <div>
        <h3>Car Specifications:</h3>
        <ul>
          <li>Year: {car.year}</li>
          <li>Type: {car.type}</li>
          <li>Fuel Consumption: {car.fuelConsumption}</li>
          <li>Engine Size: {car.engineSize}</li>
        </ul>
      </div>
      <div>
        <h3>Accessories and functionalities:</h3>
        <ul>
          {[...car.accessories, ...car.functionalities].map((item) => {
            return <li key={nanoid()}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
