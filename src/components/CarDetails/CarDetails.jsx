import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import { selectCurrentCar, selectError } from "../../redux/cars/selectors.js";
import { useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./CarDetails.module.css";
import { Loader } from "../Loader/Loader.jsx";
import location from "../../assets/location.svg";
import check from "../../assets/check-circle.svg";
import calendar from "../../assets/calendar.svg";
import carIcon from "../../assets/car.svg";
import fuel from "../../assets/fuel-pump.svg";
import engine from "../../assets/gear.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import "./BookingDateCalendar.css";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

registerLocale("enGB", enGB);

export const CarDetails = () => {
  const [startDate, setStartDate] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const handleSubmit = (values, actions) => {
    toast.success("Your booking has been submitted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    const formValuesToSave = { ...values };
    if (startDate) {
      formValuesToSave.date = startDate;
    }
    localStorage.setItem("carBookingForm", JSON.stringify(formValuesToSave));
    actions.resetForm();
    setStartDate(null);
  };

  const car = useSelector(selectCurrentCar);
  const error = useSelector(selectError);

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

  if (error) {
    return (
      <p className={css.errorCars}>Something went wrong. Try again later.</p>
    );
  }

  if (!car) {
    return <Loader />;
  }

  return (
    <div className={css.carBox}>
      <ToastContainer />
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
            <Form className={css.formikBox}>
              <div className={css.form}>
                <div className={css.fieldBox}>
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
                </div>
                <div className={css.fieldBox}>
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
                </div>
                <div className={css.calendarWrapper}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Booking date"
                    className="custom-datepicker"
                    calendarClassName="custom-calendar"
                    minDate={new Date()}
                    showPopperArrow={false}
                    locale="enGB"
                    formatWeekDay={(nameOfDay) =>
                      nameOfDay.toUpperCase().slice(0, 3)
                    }
                  />
                </div>
                <div className={css.fieldBox}>
                  <Field
                    as="textarea"
                    name="comment"
                    placeholder="Comment"
                    className={css.fieldTarea}
                  ></Field>
                  <ErrorMessage
                    name="comment"
                    component="span"
                    className={css.error}
                  />
                </div>
              </div>
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
          <img src={location} alt="" className={css.locationIcon} />
          <p className={css.addressLoc}>
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
              return (
                <li key={nanoid()} className={css.listLi}>
                  <img src={check} alt="" className={css.listIcon} />
                  <p>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={css.carDescrBox}>
          <h3 className={css.carDescrTitle}>Car Specifications:</h3>
          <ul className={css.carDescrList}>
            <li className={css.listLi}>
              <img src={calendar} alt="" className={css.listIcon} />
              <p>Year: {car.year}</p>
            </li>
            <li className={css.listLi}>
              <img src={carIcon} alt="" className={css.listIcon} />
              <p>Type: {car.type}</p>Type: {car.type}
            </li>
            <li className={css.listLi}>
              <img src={fuel} alt="" className={css.listIcon} />
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </li>
            <li className={css.listLi}>
              <img src={engine} alt="" className={css.listIcon} />
              <p>Engine Size: {car.engineSize}</p>
            </li>
          </ul>
        </div>
        <div className={css.carDescrBox}>
          <h3 className={css.carDescrTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={css.carDescrList}>
            {[...car.accessories, ...car.functionalities].map((item) => {
              return (
                <li key={nanoid()} className={css.listLi}>
                  <img src={check} alt="" className={css.listIcon} />
                  <p>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
