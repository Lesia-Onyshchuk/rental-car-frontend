export const CarItem = ({ data }) => {
  return (
    <div>
      <img src={data.img} alt={data.description} />
      <h2>
        {data.brand} {data.model}, {data.year}
      </h2>
      <p>{data.rentalPrice}</p>
      <ul>
        <li>{data.address.split(",")[1]}</li>
        <li>{data.address.split(",")[2]}</li>
        <li>{data.rentalCompany}</li>
        <li>{data.type}</li>
        <li>{Math.round(Number(data.mileage) * 1.60934)} km</li>
      </ul>
      <button type="button">Read more</button>
    </div>
  );
};
