import { useNavigate, useParams } from "react-router";
import "./productDetails.css";
import { useEffect, useState } from "react";
import { SentComment, getProduct } from "../../utils/getProduct";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import { isItemInCart } from "../../utils/isItemPresentInCart";
import { isItemInWishlist } from "../../utils/isItemPresentInWishlist";
import { useWishlist } from "../../context/wishlistContext";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";
import { useProducts } from "../../context/productContext";

export const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { productID } = useParams();
  const { token } = useAuth();
  const { cart, addCartData, isCartUpdate } = useCart();
  const { wishlist, addWishlistData, isWishlistUpdate } = useWishlist();
  const { productState, productDispatch } = useProducts();
  const navigate = useNavigate();
  const [imageP, setImage] =useState('')
  const [cmt, setcmt]=useState('')

    const [rating, setRating] = useState(0);
  
    const handleStarClick = (selectedRating) => {
      setRating(selectedRating);
    };
    const handleSentCmt = async()=>{
      try {
      productDispatch({ type: "detail_loading", payload: true });
      const product =await SentComment(productID,{cmt: cmt,valueRat:rating},token)
      setSingleProduct(product);
      setImage(product.image[0])
      productDispatch({ type: "detail_loading", payload: false });
    } catch (e) {
      console.log(e);
    }
  }
  const getSingleProduct = async () => {
    try {
      productDispatch({ type: "detail_loading", payload: true });
      const product = await getProduct(productID);
      setSingleProduct(product);
 
      setImage(product.image[0])
      
      productDispatch({ type: "detail_loading", payload: false });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Object.keys(singleProduct).length === 0) {
    return null;
  }

  const {
    _id,
    image,
    title,
    brand,
    ratings,
    price,
    originalPrice,
    outOfStock,
    description,review
  } = singleProduct;

  const changeImg=(img)=>{
    setImage(img)
  }
 
  return (
    <>
      <p className="text details">
        <p onClick={() => navigate("/")}>Home</p>{" "}
        <i class="fa-solid fa-angle-right fa-xs"></i>{" "}
        <p onClick={() => navigate("/products")}>Browse Products</p>
        <i class="fa-solid fa-angle-right fa-xs"></i>
        <span>Product Details</span>
      </p>
      {productState.isDetailLoading ? (
        <BarLoader color={`var(--primary-color)`} size={60} />
      ) : (
        <div className="product-details">
          <div style={{display:'flex', flexDirection:'column'}}>
          <img src={imageP} alt={title} />
          <div style={{maxheight:'90px', minHeight:'90px'}}>
          {image.slice(0, 3).map((img, index) => (
          (img===imageP)?
  <img
    key={index} // Key là quan trọng để React có thể theo dõi các phần tử
    src={img}
    alt={title}
    onClick={() => changeImg(img)}
    style={{ width: '80px', height: '90px', marginTop: '10px', marginRight: '0px',border: '2px solid #480000' }}
  />: <img
  key={index} // Key là quan trọng để React có thể theo dõi các phần tử
  src={img}
  alt={title}
  onClick={() => changeImg(img)}
  style={{ width: '80px', height: '90px', marginTop: '10px', marginRight: '0px' , }}/>
))}
  <hr className="mid-hr" />





    <div style={{marginTop:'80px', fontSize:'30px', color:'#380000'}}>Reviews</div>
    <div style={{ marginTop: '30px',
  border: '2px solid #ccc', // Màu xám mỏng
  borderRadius: '10px', // Bo cong các góc
  padding: '15px',
  width: '210%',}}>
    <label for="yourReview">
Your review </label>
       
<div >
{[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' ,fontSize:'30px'}}
        >
          ★
        </span>
      ))}
      <input
        id="cmt"
        value={cmt}
        onChange={(e) => {
          setcmt(e.target.value);
        }}
        style={{
          width: '100%', // Chiều rộng 100%
          padding: '10px', // Padding để tăng độ rộng và chiều cao
          borderRadius: '8px', // Bo tròn các góc
          fontSize: '16px', // Kích thước font chữ
          marginBottom: '10px', // Khoảng cách dưới
          height:'90px',
          boxSizing: 'border-box', // Đảm bảo tính toán kích thước chính xác
        }}
      />

 
    </div>
    <div className="wishlist-cart" style={{marginTop:'10px' }}>
    <button
                className="cart-btn"
              
              onClick={()=>handleSentCmt()}
              >Sent your comment</button>
    </div>
    </div>
    {review.map(rev=>(
   <div style={{ marginTop: '10px', border: '1px solid #ccc', paddingLeft: '10px',paddingTop:'0px', borderRadius: '8px', width:'210%' , padding:'15px'}}>
   <p style={{marginTop:'5px', marginBottom:'0px',fontSize:'17px'}}><strong>{rev.name}</strong></p>

   {[1, 2, 3, 4, 5].map((star) => (
     <span
       key={star}
 
       style={{ cursor: 'pointer', color: star <= rev.valueRat ? 'gold' : 'gray' ,fontSize:'20px', marginTop:'-20px', paddingTop:'-20px'}}
     >
       ★
     </span>
   ))}

   <p style={{marginTop:'15px'}}>{rev.cmt}</p>
 </div>

    ))}
 



          </div>
          </div>
         <div className="product-detail">
            <h1>{brand}</h1>
            <p className="title-product">{title}</p>
            <hr />
            <p className="rating">
              {ratings.value.toFixed(1)}⭐ ({ratings.count} reviews)
            </p>
            <div className="product-price">
              <h2>đ{price}</h2>
              <p>đ{originalPrice}</p>
            </div>
            <p className="stock">
              <strong>Availability: </strong>
              {outOfStock ? "Not in Stock" : "In Stock"}
            </p>
            <div className="wishlist-cart">
              <button
                className="wishlist-btn"
                disabled={isWishlistUpdate}
                onClick={() => {
                  if (token) {
                    if (isItemInWishlist(wishlist, _id)) {
                      navigate("/wishlist");
                    } else {
                      addWishlistData(singleProduct);
                      toast.success("Added to wishlist!");
                    }
                  } else {
                    toast.warning("Please login to proceed");
                    navigate("/login");
                  }
                }}
              >
                {isItemInWishlist(wishlist, _id)
                  ? "Go to Wishlist"
                  : "Add to Wishlist"}
              </button>

              <button
                className="cart-btn"
                disabled={outOfStock || isCartUpdate}
                onClick={() => {
                  if (token) {
                    if (isItemInCart(cart, _id)) {
                      navigate("/cart");
                    } else {
                      addCartData(singleProduct);
                      toast.success("Added to cart!");
                    }
                  } else {
                    toast.warning("Please login to proceed");
                    navigate("/login");
                  }
                }}
              >
                <i class="fa-solid fa-cart-shopping"></i> {isItemInCart(cart, _id) ? "Go to Cart" : "Add to Cart"}
              </button>
              
            </div>
            <div style={{width:'400px', marginTop:'30px'}}>{description}</div>
      
          </div>
         
        </div>
      )}
   
      <hr className="mid-hr" />
  
    </>
  );
};
