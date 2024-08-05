// import { featuredData } from "./featuredData";
import { ProductCard } from "../product-card/productCard";
import "./featured.css";
import { useProducts } from "../../context/productContext";

export const Featured = () => {
  const {productState} = useProducts();
  const {productData} = productState;
  let featuredData = []
  if (productData.length > 0) {
    featuredData = [productData[1], productData[0], productData[2], productData[3], productData[4]]
  }
  console.log('2222222222222',productData)
  
  return (
    <>
      <h2>Products You May Like ✨</h2>
      <div className="featured">
        {featuredData?.map((data) => {
          return (
            <div>
              <ProductCard data={data} />
            </div>
          );
        })}
      </div>
    </>
  );
};
