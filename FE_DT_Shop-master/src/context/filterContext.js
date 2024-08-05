import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";
import { useProducts } from "./productContext";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { productState } = useProducts();

  const initialFilter = {
    category: [],
    brands: [],
    rating: 5,
    sort: "featured",
    search: "",
    includeOutOfStock: false
  };

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilter
  );
  console.log('prooooooooo',productState)
  let filteredData = productState?.productData.filter(data => !data.outOfStock);
   console.log(filteredData,'00000000')
  if (filterState.includeOutOfStock) {
    filteredData = productState?.productData;
  }

  if (filterState.category.length > 0) {
    filteredData = filteredData.filter((data) =>
      filterState.category.includes(data.categoryName)
    );
  }
  console.log(filteredData,'000000001')
  if (filterState.brands.length > 0) {
    filteredData = filteredData.filter((data) =>
      filterState.brands.includes(data.brand)
    );
  }
  console.log(filteredData,'000000002')
  if (filterState.rating >= 0) {
    filteredData = filteredData.filter(
      (data) => data.ratings.value <= filterState.rating
    );
  }
  console.log(filteredData,'000000003')
  if (filterState.search.length > 0) {
    filteredData = filteredData.filter(
      (data) =>
        data.title.toLowerCase().includes(filterState.search.toLowerCase()) ||
        data.brand.toLowerCase().includes(filterState.search.toLowerCase())
    );
  }
  console.log(filteredData,'000000004')
  if (filterState.sort === "high-to-low") {
    filteredData = [...filteredData].sort((a, b) => b.price - a.price);
  } else if (filterState.sort === "low-to-high") {
    filteredData = [...filteredData].sort((a, b) => a.price - b.price);
  } else if (filterState.sort === "featured") {
    filteredData = [...filteredData];
  }
   console.log(filteredData,'1111111111')
  return (
    <>
      <FilterContext.Provider
        value={{ filterState, filterDispatch, filteredData }}
      >
        {children}
      </FilterContext.Provider>
    </>
  );
};

export const useFilters = () => useContext(FilterContext);
