// import { createSelector } from "@reduxjs/toolkit";
// import { selectCars } from "../cars/selectors.js";

export const selectFilters = (state) => state.filters.filters;
export const selectBrands = (state) => state.filters.brands;

// export const selectFilteredCars = createSelector(
//   [selectCars, selectFilters],
//   (cars, filters) => {
//     return cars.filter((car) => {
//       const selectedBrand = filters.brand ? car.brand === filters.brand : true;
//       const selectedPrice = filters.price
//         ? car.price <= parseInt(filters.price)
//         : true;
//       const selectedFromMileage = filters.fromMileage
//         ? car.mileage >= parseInt(filters.fromMileage)
//         : true;
//       const selectedToMileage = filters.toMileage
//         ? car.mileage <= parseInt(filters.toMileage)
//         : true;
//       return (
//         selectedBrand &&
//         selectedPrice &&
//         selectedFromMileage &&
//         selectedToMileage
//       );
//     });
//   }
// );
