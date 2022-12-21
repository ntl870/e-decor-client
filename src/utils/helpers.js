import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const getUploadedUrl = async (file) => {
  //  setUploadCover(true);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/e-decor/image/upload",
      data
    );
    const { url } = uploadRes.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (data) => {
  localStorage.setItem("token", data);
};

export const getPriceText = (products) => {
  const prices = products?.map((product) => product.price);
  if (prices?.length > 0) {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return min;
    else return `${min} - ${max}`;
  } else return "";
};
export const getImagesFromProductVersion = (products) => {
  const images = products?.map((product) => {
    return { id: uuidv4(), image: product.image };
  });
  return images;
};

export const getCategoryName = (id, categories) => {
  const category = categories?.find((item) => +item.id === +id);
  return category?.name;
};
export const getCategoryId = (name, categories) => {
  if (name) {
    const category = categories?.find((item) => item.name === name);
    return category?.id;
  } else return "";
};

export const getPrice = (min, max) => {
  if (min === max) return min;
  else return `${min} - ${max}`;
};

export const getCartItemsShop = (products) => {
  let array = [];
  for (let i = 0; i < products?.length; i++) {
    for (let j = 0; j < products[i]?.productVersions?.length; j++) {
      array.push({
        id: products[i]?.id,
        name: products[i]?.name,
        version: products[i]?.productVersions[j],
        cartItemId: products[i]?.productVersions[j]?.cartItems?.[0]?.id,
      });
    }
  }
  return array;
};

export const getOrderPrice = (data, selectItems) => {
  let price = 0;
  for (let index = 0; index < data?.length; index++) {
    const element = data?.[index]?.version?.id;
    if (selectItems?.includes(element))
      price +=
        data?.[index]?.version?.price *
        data?.[index]?.version?.cartItems?.[0]?.quantity;
  }
  return price;
};

export const getAddressText = (row) => {
  return `${row?.detail ? `${row?.detail}, ` : ""} ${row?.ward?.name}, ${
    row?.district?.name
  }, ${row?.city?.name}`;
};

export const getShopAddressText = (row) => {
  return `${row?.addressDetail ? `${row?.addressDetail}` : ""} ${
    row?.ward?.name
  }, ${row?.district?.name}, ${row?.city?.name}`;
};

export const getPriceTotal = (orderItems) => {
  let priceTotal = 0;
  orderItems.map((item) => (priceTotal += item.price * item.quantity));
  return priceTotal;
};

export const getDiscount = (promotions, id) => {
  return promotions.find((item) => +item.id === +id);
};

export const getPriceTotalFromOrderItems = (orderItems) => {
  let priceTotal = 0;
  orderItems?.map(
    (item) => (priceTotal += item?.productVersion?.price * item?.quantity)
  );
  return priceTotal;
};

export const hasSuitableVoucher = (promotions, amount) => {
  if (!promotions?.length) return false;
  const tmp = promotions?.filter((item, index) => amount >= item.standarFee);
  return tmp?.length > 0;
};

export const getMinFeeShipping = (shipments) => {
  return shipments?.reduce(function (res, obj) {
    return obj?.fee < res?.fee ? obj : res;
  });
};
