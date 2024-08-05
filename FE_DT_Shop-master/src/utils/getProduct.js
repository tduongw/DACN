import axios from "axios";


export const getProduct = async (productId) => {
  try {
    const { data, status } = await axios.get(`http://localhost:8017/v1/product/${productId}`);
    console.log(data, status);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
export const SentComment = async (productId,dataCmt,token) => {

  try {

    const { data, status } = await axios({
      method: "POST",
      url: `http://localhost:8017/v1/comment/${productId}`,
      data:   dataCmt ,
      headers: { authorization: token },
    });


    console.log(data, status);
    if (status === 201) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
